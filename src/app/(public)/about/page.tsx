import React from 'react';
import { LpSection, MissionSection } from '@/components';

export default function About() {

  return (
    <div className="bg-gradient-blue-primary-120 min-h-screen">
        <div className='mt-[5%]'>
          <LpSection />
          <MissionSection />
        </div>
        
    </div>
  );
}