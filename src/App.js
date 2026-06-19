import { lazy, Suspense, useEffect, useState } from 'react';
import './App.scss';
import Header from "./components/header/Header";
import Hero from './components/hero/Hero';
import SiteBackdrop from './components/siteBackdrop/SiteBackdrop';

const ServicesSection = lazy(() => import('./components/sections/servicesSection/ServicesSection'));
const PortfolioSection = lazy(() => import('./components/sections/portfolioSection/PortfolioSectioin'));
const ProcessSection = lazy(() => import('./components/sections/processSection/ProcessSection'));
const AboutSection = lazy(() => import('./components/sections/aboutSection/AboutSection'));
const ContactSection = lazy(() => import('./components/sections/contactSection/ContactSection'));
const Footer = lazy(() => import('./components/footer/Footer'));

function App() {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [showMenuOverlay, setShowMenuOverlay] = useState(false);

  useEffect(() => {
    if (isBurgerOpen) {
      setShowMenuOverlay(true);
      return undefined;
    }

    if (!showMenuOverlay) return undefined;

    const timer = window.setTimeout(() => {
      setShowMenuOverlay(false);
    }, 450);

    return () => window.clearTimeout(timer);
  }, [isBurgerOpen, showMenuOverlay]);

  function toggleBurger() {
    setIsBurgerOpen((prevState) => !prevState);
  }

  return (
    <div className="App">
      <SiteBackdrop />
      <Header isBurgerOpen={isBurgerOpen} toggleBurger={toggleBurger} />
      {showMenuOverlay && (
        <div
          className={`app-menu-overlay${isBurgerOpen ? '' : ' app-menu-overlay--closing'}`}
          aria-hidden="true"
        />
      )}
      <Hero />
      <Suspense fallback={null}>
        <ServicesSection />
        <PortfolioSection />
        <ProcessSection />
        <AboutSection />
        <ContactSection />
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
