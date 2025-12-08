// src/app/page.tsx
"use client";

import Header from "@/components/marketing/Header";
import Hero from "@/components/marketing/Hero";
import LogoCloud from "@/components/marketing/LogoCloud";
import IntroSection from "@/components/marketing/IntroSection";
import WebSection from "@/components/marketing/WebSection";
import WhySection from "@/components/marketing/WhySection";
import FeaturesSection from "@/components/marketing/FeaturesSection";
import StatsSection from "@/components/marketing/StatsSection";
import DetailsSection from "@/components/marketing/DetailsSection";
import PrincingSection from "@/components/marketing/PricingSection";
import FaqSection from "@/components/marketing/FaqSection";
import CtaSection from "@/components/marketing/CtaSection";
import Contact from "@/components/marketing/Contact";
import Footer from "@/components/marketing/Footer";
import { success } from "zod";
import { WaitlistForm } from "@/components/marketing/WaitListForm";
import BetaBanner from "@/components/marketing/BetaBanner";


export default function HomePage() {
  return (
    <>
      <BetaBanner />
      <Header />
      <Hero />
      <LogoCloud />
      <IntroSection />
      <WebSection />
      <WhySection />
      <FeaturesSection />
      <StatsSection />
      <DetailsSection />
      <PrincingSection />
      <FaqSection />
      <CtaSection />
      <WaitlistForm />
      {/* <Contact /> */}
      <Footer />
    </>
  );
}
