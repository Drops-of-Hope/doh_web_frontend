"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaCalendarAlt, FaHeartbeat, FaChartLine } from 'react-icons/fa';

const steps = [
  {
    number: "01",
    icon: <FaMapMarkerAlt size={32} />,
    title: "Find a Drive",
    description: "Search by location and discover nearby blood donation events on our interactive map",
    color: "from-red-500 to-red-600"
  },
  {
    number: "02",
    icon: <FaCalendarAlt size={32} />,
    title: "Book Your Slot",
    description: "Choose your preferred time and date with our simple scheduling system",
    color: "from-blue-500 to-blue-600"
  },
  {
    number: "03",
    icon: <FaHeartbeat size={32} />,
    title: "Donate Safely",
    description: "Professional medical staff ensure a safe, comfortable donation experience",
    color: "from-green-500 to-green-600"
  },
  {
    number: "04",
    icon: <FaChartLine size={32} />,
    title: "Track Your Impact",
    description: "See lives affected, view donation history, and track your next eligibility date",
    color: "from-purple-500 to-purple-600"
  }
];

export default function HowItWorks() {
  return (
    <section className="bg-white relative overflow-hidden">

      {/* Background Elements */}
      <div className='p-16'>
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-red-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
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
              {/* Step Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-white/90 relative overflow-hidden">
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}></div>
                
                {/* Step Number */}
                <div className="absolute top-4 right-4 text-6xl font-bold text-gray-100 group-hover:text-gray-50 transition-colors duration-300">
                  {step.number}
                </div>
                
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${step.color} text-white mb-4 shadow-lg relative z-10`}>
                  {step.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-800 mb-3 relative z-10">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed relative z-10">
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

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-red-600/20 backdrop-blur-sm"></div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                It is That Simple to Save Lives
              </h3>
              <p className="text-red-100 mb-6 max-w-2xl mx-auto">
                Every donation can save up to three lives. Start your journey today and become a hero.
              </p>
              <button className="bg-white text-red-600 px-8 py-3 rounded-full font-semibold hover:bg-red-50 transition-all duration-300 hover:scale-105 shadow-lg">
                Get Started Now
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  );
}