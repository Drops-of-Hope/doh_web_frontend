"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaCalendarAlt, FaHeartbeat, FaChartLine } from 'react-icons/fa';

const steps = [
  {
    number: "01",
    icon: <FaMapMarkerAlt size={32} />,
    title: "Find a Drive",
    description: "Search by location and discover nearby blood donation events",
    color: "from-red-300 to-red-600"
  },
  {
    number: "02",
    icon: <FaCalendarAlt size={32} />,
    title: "Book Your Slot",
    description: "Choose your preferred time and date with our simple scheduling system",
    color: "from-blue-300 to-blue-600"
  },
  {
    number: "03",
    icon: <FaHeartbeat size={32} />,
    title: "Donate Safely",
    description: "Professional medical staff ensure a safe, comfortable donation experience",
    color: "from-green-300 to-green-600"
  },
  {
    number: "04",
    icon: <FaChartLine size={32} />,
    title: "Track Your Impact",
    description: "See lives affected, view donation history, and track your next eligibility date",
    color: "from-purple-300 to-purple-600"
  }
];

export default function HowItWorks() {
  return (
    <section className="bg-white relative overflow-hidden border-t-30 border-gray-200">

    <div className='border-t-16 border-gray-100'>
      {/* Background Elements */}
      <div className='p-14'>

              <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            How It <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your journey to saving lives is just four simple steps away
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Step Card with Glassy Effect */}
              <div className="relative bg-gradient-blue-primary-2 backdrop-blur-xl border-2 border-gray-100 shadow-2xl shadow-black/10 rounded-2xl p-6 transition-all duration-300">
                {/* Multiple layered glass effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none rounded-2xl"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-pulse opacity-30 pointer-events-none"></div>
                <div className="absolute inset-0.5 bg-gradient-to-br from-white/10 to-transparent rounded-2xl pointer-events-none"></div>
                
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-blue-primary -top-14 shadow-xl relative z-100`}>
                  <div className='text-gray-100'>
                    {step.icon}
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-semibold text-gray-700 mb-3 relative z-10 drop-shadow-sm -top-8">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed relative z-10 drop-shadow-sm -top-6">
                  {step.description}
                </p>
              </div>

              {/* Connection Line (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-gray-300 to-gray-400 transform -translate-y-1/2 z-0">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-400 rounded-full"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      </div>
      </div>
    </section>
  );
}