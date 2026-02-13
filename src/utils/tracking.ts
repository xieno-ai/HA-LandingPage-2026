declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

/* ── Attribution params to capture ── */

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const
const CLICK_ID_KEYS = ['gclid', 'fbclid', 'msclkid', 'dclid', 'wbraid', 'gbraid'] as const
const ALL_PARAM_KEYS = [...UTM_KEYS, ...CLICK_ID_KEYS]

const STORAGE_KEY = 'ha_attribution'
const STORAGE_KEY_FIRST = 'ha_attribution_first'

type Attribution = Record<string, string>

/* ── Capture & persist attribution ── */

function captureAttribution(): Attribution {
  const params = new URLSearchParams(window.location.search)
  const current: Attribution = {}

  for (const key of ALL_PARAM_KEYS) {
    const val = params.get(key)
    if (val) current[key] = val
  }

  // Always store landing page and referrer
  current.landing_page = window.location.pathname + window.location.search
  if (document.referrer) {
    try {
      current.referrer = new URL(document.referrer).hostname
    } catch {
      current.referrer = document.referrer
    }
  }

  // Session attribution (last-touch) — overwrite every visit with params
  if (Object.keys(current).length > 0) {
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(current)) } catch { /* private browsing */ }
  }

  // First-touch attribution — only store once, never overwrite
  try {
    if (!localStorage.getItem(STORAGE_KEY_FIRST)) {
      localStorage.setItem(STORAGE_KEY_FIRST, JSON.stringify(current))
    }
  } catch { /* private browsing */ }

  return current
}

function getAttribution(): Attribution {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function getFirstTouchAttribution(): Attribution {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_FIRST)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

/* ── dataLayer push ── */

function push(data: Record<string, unknown>) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(data)
  if (import.meta.env.DEV) {
    console.log('[dataLayer]', data.event, data)
  }
}

/** Push with session attribution merged into every conversion event */
function pushWithAttribution(data: Record<string, unknown>) {
  const attr = getAttribution()
  push({ ...data, ...attr })
}

/* ── Outbound URL helper ── */

/** Appends stored UTM + click ID params to an external URL */
export function buildOutboundUrl(baseUrl: string): string {
  const attr = getAttribution()
  const url = new URL(baseUrl)

  for (const key of ALL_PARAM_KEYS) {
    if (attr[key]) url.searchParams.set(key, attr[key])
  }

  return url.toString()
}

/* ── Initialization — call once on page load ── */

export function initTracking() {
  const attr = captureAttribution()
  const firstTouch = getFirstTouchAttribution()

  push({
    event: 'page_attribution',
    ...attr,
    first_touch_source: firstTouch.utm_source || '(direct)',
    first_touch_medium: firstTouch.utm_medium || '(none)',
    first_touch_campaign: firstTouch.utm_campaign || '(not set)',
  })
}

/* ── Event trackers ── */

/** Primary CTA clicks — "Get Protected Today", "Find the Right Device" */
export function trackCtaClick(label: string, location: string) {
  pushWithAttribution({
    event: 'cta_click',
    cta_text: label,
    cta_location: location,
  })
}

/** "Shop Now" — outbound click to product page */
export function trackShopNow(deviceName: string, price: string) {
  pushWithAttribution({
    event: 'shop_now',
    device_name: deviceName,
    device_price: price,
    currency: 'CAD',
  })
}

/** "Get FREE Quote" clicks */
export function trackGetQuote(deviceName: string) {
  pushWithAttribution({
    event: 'get_quote',
    device_name: deviceName,
  })
}

/** Phone number clicks */
export function trackPhoneClick(location: string) {
  pushWithAttribution({
    event: 'phone_click',
    click_location: location,
  })
}

/** FAQ accordion open */
export function trackFaqOpen(question: string) {
  push({
    event: 'faq_open',
    faq_question: question,
  })
}

/** Key section enters viewport */
export function trackSectionView(sectionName: string) {
  push({
    event: 'section_view',
    section_name: sectionName,
  })
}
