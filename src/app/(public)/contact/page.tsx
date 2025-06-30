"use client";

import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
  };

  return (
    <div className="bg-gradient-blue-primary-120 min-h-screen">
      <div className='mt-[5%] min-h-[40vh] p-12 flex space-x-8 items-center justify-center'>
        {/* Contact Cards (Address / Phone / Email) */}
        {[{
          icon: <FaMapMarkerAlt className="text-white text-2xl" />,
          title: 'Address',
          lines: ['No. 555/5D,', 'Narahenpita,', 'Colombo 05.']
        }, {
          icon: <FaPhone className="text-white text-2xl" />,
          title: 'Phone',
          lines: ['011-485-2847', '011-485-2848']
        }, {
          icon: <FaEnvelope className="text-white text-2xl" />,
          title: 'Email',
          lines: ['info@nbts.health.gov.lk', 'info@doh.health.lk']
        }].map((item, index) => (
          <div key={index} className="bg-blue-50 border border-blue-100 rounded-lg shadow-md w-54 p-6 h-54">
            <div className="w-full flex flex-col items-center justify-center text-blue-400 text-sm">
              <div className="w-16 h-16 bg-[#F8314C] rounded-full flex items-center justify-center">
                {item.icon}
              </div>
              <div className="text-gray-700 text-lg font-semibold mt-4">{item.title}</div>
              <div className="text-gray-500 text-sm text-center">{item.lines.map((line, i) => <div key={i}>{line}</div>)}</div>
            </div>
          </div>
        ))}
      </div>

      <div className='bg-white min-h-[60vh] flex'>
        <div className='min-h-[60vh] w-1/2 flex flex-col justify-center items-center p-12'>
          <h2 className="text-4xl font-bold text-gray-700 mb-4">Contact Us</h2>
          <p className="text-md text-gray-500 text-center leading-relaxed">
            We wouldd love to hear from you.<br />
            Whether you have a question about our features, need assistance, or just want to share feedback, we are here to help.
          </p>
        </div>

        <div className='min-h-[60vh] w-1/2 flex items-center justify-center p-8'>
          <form
            className='w-full max-w-md bg-blue-50 border border-blue-100 rounded-lg p-8 shadow-md'
            onSubmit={handleSubmit}
          >
            <div className='mb-4'>
              <label className='block text-gray-700 font-semibold mb-2' htmlFor='name'>Name</label>
              <input
                type='text'
                id='name'
                name='name'
                placeholder='Your name'
                autoComplete='off'
                value={formData.name}
                onChange={handleChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
                required
              />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 font-semibold mb-2' htmlFor='email'>Email</label>
              <input
                type='email'
                id='email'
                name='email'
                placeholder='you@example.com'
                autoComplete='off'
                value={formData.email}
                onChange={handleChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
                required
              />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 font-semibold mb-2' htmlFor='subject'>Subject</label>
              <input
                type='text'
                id='subject'
                name='subject'
                placeholder='Subject'
                autoComplete='off'
                value={formData.subject}
                onChange={handleChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
              />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 font-semibold mb-2' htmlFor='message'>Message</label>
              <textarea
                id='message'
                name='message'
                rows={4}
                placeholder='Your message'
                autoComplete='off'
                value={formData.message}
                onChange={handleChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
                required
              ></textarea>
            </div>

            <button
              type='submit'
              className='w-full bg-white text-gray-700 border border-gray-200 font-semibold py-2 px-4 rounded-md hover:bg-gray-200 cursor-pointer transition-colors duration-300'
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}