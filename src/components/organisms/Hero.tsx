"use client";

import React from 'react';
import Image from 'next/image';
import { Button } from "@/components";
import { FaArrowDown } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Hero() {

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('section-1');
    if (nextSection) {
      nextSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="relative h-screen w-full bg-gradient-blue-primary overflow-hidden">
      <motion.div
        initial={{ opacity: 0.1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute top-[28%] md:top-[43%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 w-[1000px] h-auto"
      >
        <Image
          src="/assets/blood.png"
          alt="Blood"
          width={1000}
          height={1000}
          className="w-[1000px] h-auto"
        />
      </motion.div>
      <div className="absolute bottom-0 w-full h-[50%] z-1 pointer-events-none">
        <div className="absolute bottom-0 w-full h-full bg-gradient-blue-primary-120" />
      </div>

      <div className='h-[50%]'>
        <div className='h-[20%]'>
          {/* space left for the nav bar */}
        </div>
        <div className='h-[80%] flex flex-col items-center overflow-hidden font-landing-heading'>

          <div className='h-[20%] w-full flex flex-col items-center justify-center'>
            <div className='text-lg xs:text-xl sm:text-2xl md:text-3xl px-0 py-0 text-white-primary'>DROPS OF</div>
          </div>

          <div className='h-[25%] md:h-[80%] w-full flex flex-col items-center justify-center overflow-hidden'>
            <div className="text-[5rem] md:text-[16rem] px-0 py-0 tracking-[2rem] md:tracking-[5rem] bg-gradient-hope">
              HOPE
            </div>
          </div>
          
        </div>
      </div>

      <div className='h-[50%] flex p-4 md:p-0'>

            <div className='h-full w-[40%] flex items-center justify-center'>
              <div className='relative bg-gradient-to-br from-white/40 via-slate-100/35 to-white/20 backdrop-blur-xl border border-white/30 shadow-2xl shadow-black/10 z-2 px-0 pb-4 md:pb-10 flex flex-col items-center rounded-tr-[5rem]'>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none rounded-tr-[5rem]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-pulse opacity-30 pointer-events-none"></div>
                <div className="absolute inset-0.5 bg-gradient-to-br from-white/10 to-transparent rounded-tr-[5rem] pointer-events-none"></div>
                <Image
                  src="/assets/red-blood.png"
                  alt="Red Blood"
                  width={250}
                  height={250}
                  className="mb-0 -mt-10 md:-mt-20 z-2"
                />
                <div className="text-center leading-snug font-body text-red-500 drop-shadow-sm">
                  MAKING <span className='font-bold'>BLOOD </span><br />
                  DONATION <br />
                  <span className='font-bold'>SIMPLE, SAFE</span> <br />
                  AND <span className='font-bold'>IMPACTFUL!</span>
                </div>
              </div>
            </div>

            <div className='h-full w-[20%] flex justify-center p-4'>
              <div className="flex items-center gap-2 z-1 mt-auto">
                <Button 
                    title="EXPLORE" 
                    rightIcon={<FaArrowDown size={16} className="text-white-primary" />}
                    containerStyles="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-3xl text-white-primary font-medium text-sm tracking-wider transition-all duration-300 ease-in-out hover:scale-101 shadow-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                    handleClick={scrollToNextSection}
                />
              </div>
            </div>

            <div className='h-full w-[40%]  md:flex md:flex-row  items-center justify-center -space-x-10'>
              <Image
                  src="/assets/seth.png"
                  alt="Red Blood"
                  width={220}
                  height={220}
                  className="mb-0 -mt-20 z-2"
                />
                <div className='text-white-primary text-lg md:text-2xl z-1 font-medium text-right'>A SIMPLE ACT,<br/> A POWERFUL <br/>IMPACT!</div>
            </div>
            
      </div>
    </div>
  );
}