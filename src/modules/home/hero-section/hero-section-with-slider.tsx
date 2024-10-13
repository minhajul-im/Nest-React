"use client";

import React, { useCallback } from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/common/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const HeroSectionWithSlider = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 8000 }),
  ]);

  const handlePrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const handleNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const sliders = [
    "Slider 1",
    "Slider 2",
    "Slider 3",
    "Slider 4",
    "Slider 5",
    "Slider 6",
  ];

  return (
    <section className="embla mx-auto w-full relative">
      <div className="embla__viewport h-[800px] border" ref={emblaRef}>
        <div className="embla__container h-full">
          {sliders.map((item: string, idx: number) => (
            <div
              key={idx}
              className={`embla__slide flex items-center justify-center ${
                idx % 2 === 0 ? "bg-red-500" : "bg-green-500"
              }`}>
              {item}
            </div>
          ))}
        </div>
      </div>

      <Button
        className="absolute left-4 bottom-4"
        size="icon"
        variant="outline"
        onClick={handlePrev}>
        <ChevronLeft />
      </Button>

      <Button
        size="icon"
        className="absolute right-4 bottom-4"
        variant="outline"
        onClick={handleNext}>
        <ChevronRight />
      </Button>
    </section>
  );
};
