import { useState } from 'react';
import './App.scss';
import Header from "./components/header/Header";
import Hero from './components/hero/Hero';
import ServicesSection from './components/sections/servicesSection/ServicesSection';
import PortfolioSection from './components/sections/portfolioSection/PortfolioSectioin';
import ProcessSection from './components/sections/processSection/ProcessSection';
import AboutSection from './components/sections/aboutSection/AboutSection';
import ContactSection from './components/sections/contactSection/ContactSection';
import Footer from './components/footer/Footer';
import SiteBackdrop from './components/siteBackdrop/SiteBackdrop';

function App() {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  function toggleBurger() {
    setIsBurgerOpen(prevState => !prevState);
  }

  return (
    <div className="App">
      <SiteBackdrop />
      <Header isBurgerOpen={isBurgerOpen} toggleBurger={toggleBurger} />
      <Hero />
      <ServicesSection />
      <PortfolioSection />
      <ProcessSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
