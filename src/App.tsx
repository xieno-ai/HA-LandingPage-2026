import { lazy, Suspense } from 'react'
import './App.css'
import Header from './components/Header'
import Banner from './components/Banner'
import Hero from './components/Hero'

const FallRisk = lazy(() => import('./components/FallRisk'))
const LifestyleCards = lazy(() => import('./components/LifestyleCards'))
const HowItWorks = lazy(() => import('./components/HowItWorks'))
const DarkCards = lazy(() => import('./components/DarkCards'))
const Pricing = lazy(() => import('./components/Pricing'))
const Testimonial = lazy(() => import('./components/Testimonial'))
const VideoLoop = lazy(() => import('./components/VideoLoop'))
const CompareTable = lazy(() => import('./components/CompareTable'))
const FAQ = lazy(() => import('./components/FAQ'))
const Footer = lazy(() => import('./components/Footer'))

export default function App() {
  return (
    <>
      <Header />
      <Banner />
      <main>
        <Hero />
        <Suspense>
          <FallRisk />
          <LifestyleCards />
          <HowItWorks />
          <DarkCards />
          <Pricing />
          <Testimonial />
          <VideoLoop />
          <CompareTable />
          <FAQ />
        </Suspense>
      </main>
      <Suspense>
        <Footer />
      </Suspense>
    </>
  )
}
