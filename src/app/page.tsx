// src/app/page.tsx
"use client";

import Header from "@/components/marketing/Header";
import Hero from "@/components/marketing/Hero";
import IntroSection from "@/components/marketing/IntroSection";
import WhySection from "@/components/marketing/WhySection";
import FeaturesSection from "@/components/marketing/FeaturesSection";
import Stats from "@/components/marketing/Stats";
import DetailsSection from "@/components/marketing/DetailsSection";
import PrincingSection from "@/components/marketing/PricingSection";
import FaqSection from "@/components/marketing/FaqSection";
import CtaSection from "@/components/marketing/CtaSection";
import Contact from "@/components/marketing/Contact";
import Footer from "@/components/marketing/Footer";
import { success } from "zod";


export default function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <IntroSection />
      <WhySection />
      <FeaturesSection />
      <Stats />
      <DetailsSection />
      <PrincingSection />
      <FaqSection />
      <CtaSection />
      <Contact />
      <Footer />
    </>
  );
}
