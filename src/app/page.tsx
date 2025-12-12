// src/app/page.tsx
"use client";

import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import LogoCloud from "@/components/landing/LogoCloud";
import IntroSection from "@/components/landing/IntroSection";
import WebSection from "@/components/landing/WebSection";
import WhySection from "@/components/landing/WhySection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import StatsSection from "@/components/landing/StatsSection";
import DetailsSection from "@/components/landing/DetailsSection";
import PrincingSection from "@/components/landing/PricingSection";
import FaqSection from "@/components/landing/FaqSection";
import CtaSection from "@/components/landing/CtaSection";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";
import { success } from "zod";
import { WaitlistForm } from "@/components/landing/WaitListForm";
import BetaBanner from "@/components/landing/BetaBanner";


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
