import React from "react";
import Navbar from "../components/sinuca/Navbar";
import HeroSection from "../components/sinuca/HeroSection";
import FeaturesBar from "../components/sinuca/FeaturesBar";
import LatestNews from "../components/sinuca/LatestNews";
import UpcomingTournaments from "../components/sinuca/UpcomingTournaments";
import Footer from "../components/sinuca/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesBar />

      {/* News + Tournaments Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="flex flex-col lg:flex-row gap-10">
          <LatestNews />
          <UpcomingTournaments />
        </div>
      </section>

      <Footer />
    </div>
  );
}
