import React from 'react';
import { LpSection, MissionSection } from '@/components';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

export default function Contact() {

  return (
    <div className="bg-gradient-blue-primary-120 min-h-screen">
        <div className='mt-[5%] min-h-[40vh] p-12 flex space-x-8 items-center justify-center'>
          <div className="bg-blue-50 border border-blue-100 rounded-lg shadow-md w-54 p-6 h-54">
            <div className="w-full flex flex-col items-center justify-center text-blue-400 text-sm">
              <div className="w-16 h-16 bg-[#F8314C] rounded-full flex items-center justify-center">
                <FaMapMarkerAlt className="text-white text-2xl" />
              </div>
              <div className="text-gray-700 text-lg font-semibold mt-4">
                Address
              </div>
              <div className="text-gray-500 text-sm text-center">
                No. 555/5D,<br />
                Narahenpita, <br />
                Colombo 05.
              </div>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-lg shadow-md w-54 p-6 h-54">
            <div className="w-full flex flex-col items-center justify-center text-blue-400 text-sm">
              <div className="w-16 h-16 bg-[#F8314C] rounded-full flex items-center justify-center">
                <FaPhone className="text-white text-2xl" />
              </div>
              <div className="text-gray-700 text-lg font-semibold mt-4">
                Phone
              </div>
              <div className="text-gray-500 text-sm text-center">
                011-485-2847 <br/>
                011-485-2848
              </div>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-lg shadow-md w-54 p-6 h-54">
            <div className="w-full flex flex-col items-center justify-center text-blue-400 text-sm">
              <div className="w-16 h-16 bg-[#F8314C] rounded-full flex items-center justify-center">
                <FaEnvelope className="text-white text-2xl" />
              </div>
              <div className="text-gray-700 text-lg font-semibold mt-4">
                Email
              </div>
              <div className="text-gray-500 text-sm text-center">
                info@nbts.health.gov.lk <br />
                info@doh.health.lk
              </div>
            </div>
          </div>
        </div>
        <div className='bg-white min-h-[60vh]'>
            this is where the contact us form will come
        </div>
    </div>
  );
}