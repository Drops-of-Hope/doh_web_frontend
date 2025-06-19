import React from 'react';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="relative h-screen w-full bg-gradient-blue-primary overflow-hidden">
      <Image
        src="/assets/blood.png"
        alt="Blood"
        width={1000}
        height={1000}
        className="absolute top-[43%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"
      />

      <div className="absolute bottom-0 w-full h-[50%] z-1 pointer-events-none">
        <div className="absolute bottom-0 w-full h-full bg-gradient-blue-primary-90" />
        <div className="absolute bottom-0 w-full h-full bg-gradient-blue-primary-70" />
      </div>

      <div className='h-[50%]'>
        <div className='h-[20%]'>
          
        </div>
        <div className='h-[80%] flex flex-col items-center overflow-hidden font-landing-heading'>

          <div className='h-[20%] w-full flex flex-col items-center justify-center'>
            <div className='text-3xl px-0 py-0 text-white-primary'>DROPS OF</div>
          </div>

          <div className='h-[80%] w-full flex flex-col items-center justify-center overflow-hidden'>
            <div className="text-14xl px-0 py-0 tracking-[5rem] bg-gradient-hope">
              HOPE
            </div>
          </div>
          
        </div>
      </div>

      <div className='h-[50%] flex'>

            <div className='h-full w-[40%] flex items-center justify-center'>
              <div className='relative bg-gradient-to-br from-white/40 via-slate-100/35 to-white/20 backdrop-blur-xl border border-white/30 shadow-2xl shadow-black/10 z-2 px-0 pb-10 flex flex-col items-center rounded-tr-[5rem]'>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none rounded-tr-[5rem]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-pulse opacity-30 pointer-events-none"></div>
                <div className="absolute inset-0.5 bg-gradient-to-br from-white/10 to-transparent rounded-tr-[5rem] pointer-events-none"></div>
                <Image
                  src="/assets/red-blood.png"
                  alt="Red Blood"
                  width={250}
                  height={250}
                  className="mb-0 -mt-20 z-2"
                />
                <div className="text-center leading-snug font-body text-red-500 drop-shadow-sm">
                  MAKING <span className='font-bold'>BLOOD </span><br />
                  DONATION <br />
                  <span className='font-bold'>SIMPLE, SAFE</span> <br />
                  AND <span className='font-bold'>IMPACTFUL!</span>
                </div>
              </div>
            </div>

            <div className='h-full w-[20%] flex items-center justify-center'>
              middle part where button goes
            </div>

            <div className='h-full w-[40%] flex items-center justify-center -space-x-10'>
              <Image
                  src="/assets/doctor.png"
                  alt="Red Blood"
                  width={220}
                  height={220}
                  className="mb-0 -mt-20 z-2"
                />
                <div className='text-white-primary text-2xl z-1 font-medium text-right'>A SIMPLE ACT,<br/> A POWERFUL <br/>IMPACT!</div>
            </div>
            
      </div>
    </div>
  );
}