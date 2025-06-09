"use client"

import React from 'react'
import { Button } from "@/components";

const Hero = () => {

  const handleScroll = () => {

  }

  return (
    <div className=''>
      Hero section

        {/* just testing out reusable buttons usage */}
        
      <Button 
      title="Join Us Today"
      containerStyles="bg-red-900
      text-white rounded-full mt-2"
      handleClick={handleScroll}/>

      <Button 
      title="Download App"
      containerStyles="bg-blue-900
      text-white rounded-xl mt-2"
      handleClick={handleScroll}/>

    </div>
  )
}

export default Hero
