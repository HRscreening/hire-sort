import React, { useEffect } from 'react';
import "@/styles/style.css";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Testimonials from '@/components/home/Testimonials';
import HowItWorks from '@/components/home/HowItWorks';
import Features from '@/components/home/Features';
import Stats from '@/components/home/Stats';
import Pricing from '@/components/home/Pricing';
import ContactSection from '@/components/home/ContactSection';
import CTA from '@/components/home/CTA';

const Index = () => {
  useEffect(() => {
    // Re-implementing the Intersection Observer for fade-in animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('.step-card, .feature-row, .pricing-card, .stat-item').forEach((el) => {
      (el as HTMLElement).style.opacity = '0';
      (el as HTMLElement).style.transform = 'translateY(24px)';
      (el as HTMLElement).style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-page">
      <Navbar />
      <main>
        <Hero />

        {/* removed for now, can be added back later
         <Testimonials /> 
        */}
        <HowItWorks />
        <Features />
        <Stats />
        <Pricing />
        <ContactSection />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
