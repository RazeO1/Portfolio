"use client";

import { useState } from "react";
import Loader from "@/components/Loader";
import Hero from "@/components/Hero";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  return (
    <main className="relative w-full min-h-screen overflow-x-hidden bg-[#fcf7f3]">
      {showLoader && (
        <Loader
          onComplete={() => {
            setIsLoaded(true);
            // Allow the exit scatter animation to finish playing before removing from DOM
            setTimeout(() => {
              setShowLoader(false);
            }, 300);
          }}
        />
      )}
      <Hero active={isLoaded} />
    </main>
  );
}
