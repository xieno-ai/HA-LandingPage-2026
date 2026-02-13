# Holo Alert Landing Page

## Project
Canadian medical alert device landing page. React + TypeScript + Vite. Framer Motion for animations. Custom CSS with BEM naming.

## Design System
- **Fonts:** IBM Plex Sans (primary), IBM Plex Mono (labels), DM Serif Display (accents)
- **Primary color:** `--blue: #4294d8` | **Success:** `--green: #00b22d`
- **Background:** `--bg: #fafafa` | **Cards:** `--bg-white: #ffffff` | **Dark:** `--bg-dark: #171717`
- **Radii:** 24px cards, 16px inner, 12px small, 999px pills
- **Animations:** Framer Motion `fadeUp` with staggered delays

## Key Files
- `src/App.tsx` — Section ordering
- `src/index.css` — Design tokens
- `src/App.css` — All component styles
- `src/components/*.tsx` — One file per section

## Rules
- Use CSS variables, never hardcode values
- BEM naming: `.block__element--modifier`
- SVG icons, never emojis
- Responsive: desktop default, 810px tablet, 480px mobile
- Run `npx tsc --noEmit` to verify after changes

## Custom Commands
- `/design <request>` — UI/UX design agent with full project context, CRO expertise, and Anthropic's frontend aesthetics guidelines baked in
