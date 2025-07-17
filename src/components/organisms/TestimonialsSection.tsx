"use client";

import React, { useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import Image from 'next/image';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Nadhiya Nashath",
      role: "Registered Nurse",
      image: "/assets/nadhiya.jpeg",
      rating: 5,
      message:
        "Donating through Drops of Hope was seamless. The reminders and follow-up messages made me feel valued and supported throughout the entire process.",
    },
    {
      name: "Thirani Athukorala",
      role: "Software Engineer",
      image: "/assets/raani.png",
      rating: 4,
      message:
        "Finding nearby donation drives used to be hard. Now it takes seconds! The app's interface is clean and user-friendly too.",
    }

  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="bg-gradient-blue-primary py-10 px-4 text-center text-gray-600">
      <div className="relative max-w-6xl mx-auto">
        {/* Navigation buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/60 hover:bg-white/90 rounded-full p-2 transition"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/60 hover:bg-white/90 rounded-full p-2 transition"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Testimonial cards */}
        <div className="overflow-hidden mx-16 flex justify-center">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(calc(-${currentIndex * 100}% + ${currentIndex * 20}px))` }}
          >
            {testimonials.map((t, i) => (
              <div key={i} className="w-full flex-shrink-0 px-4">
                <div
                  className={`rounded-2xl bg-white text-gray-800 p-6 shadow-md max-w-[400px] min-h-[400px] mx-auto transition-all duration-700 ease-out flex flex-col justify-between ${
                    i === currentIndex ? "scale-100 opacity-100" : "scale-90 opacity-60"
                  }`}
                >
                  <div className="flex-1 mt-4">
                    <Quote className="text-blue-500 w-10 h-10 mb-3 mx-auto" />
                    <Image
                      src={t.image}
                      alt={t.name}
                      width={80}
                      height={80}
                      className="rounded-full object-cover mx-auto mb-4"
                    />
                    <h3 className="font-semibold text-lg truncate">{t.name}</h3>
                    <p className="text-sm text-gray-500 mb-2 truncate">{t.role}</p>
                    <div className="flex justify-center">
                      {[...Array(5)].map((_, idx) => (
                        <span
                          key={idx}
                          className={`text-sm ${idx < t.rating ? "text-yellow-400" : "text-gray-300"}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <p className="text-sm text-gray-600 line-clamp-4 overflow-hidden">
                      {t.message.length > 150 ? `${t.message.substring(0, 150)}...` : t.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                idx === currentIndex ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
