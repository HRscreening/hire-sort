import "@/styles/style.css";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import HowItWorks from '@/components/home/HowItWorks';
import Features from '@/components/home/Features';
import Stats from '@/components/home/Stats';
import Pricing from '@/components/home/Pricing';
import ContactSection from '@/components/home/ContactSection';
import CTA from '@/components/home/CTA';

const Index = () => {
  return (

    <main>
      <Hero />
      <HowItWorks />
      <Features />
      <Stats />
      <Pricing />
      <ContactSection />
      <CTA />
    </main>
  );
};

export default Index;
