import React from 'react';
import Image from 'next/image';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from 'react-icons/fa';

export default function Footer() {
  return (
    <div className="w-full">
      <section className="bg-gradient-to-r from-[#B3D0E9] to-[#DDE3E9] text-center py-16 px-4">
        <h2 className="text-[52px] font-bold mb-4">
        <span className="bg-gradient-to-r from-[#FFFFFF] to-[#55A2E0] bg-clip-text text-transparent font-Roboto">
            Subscribe
        </span>
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-8 text-[18px] font-Roboto">
          Join our mission to save lives. Get updates, stories, and <br/> opportunities to make a difference.
        </p>

        <div className="flex justify-center">
          <div className="flex w-full max-w-xl overflow-hidden shadow">
            <input
              type="email"
              placeholder="Enter your email Address"
              className="w-full px-4 py-3 outline-none bg-amber-50 placeholder-[#7B7E86] font-Roboto text-[16px]"
            />
            <button className="bg-gradient-to-r from-[#CE121A] to-[#FB7373] text-white px-6 text-[16px] font-Roboto">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-white border-t border-gray-200 text-center">
        <div className="py-8 px-4">
          {/* Top Nav Links */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-4 text-black text-[16px] font-Roboto font-weight-400">
            <a href="#">About</a>
            <a href="#">Features</a>
            <a href="#">Contact</a>
            <a href="#">Campaigns</a>
            <span className="text-gray-400">|</span>
            <div className="flex gap-4 text-gray-600">
              <FaFacebookF />
              <FaTwitter />
              <FaInstagram />
              <FaYoutube />
              <FaLinkedinIn />
            </div>
          </div>

          {/* Logo */}
          <div className="flex justify-center items-center gap-2 mb-4 objectFit-contain">
            <Image
                src="/assets/logo.png"
                alt="Drops of Hope"
                width={100}
                height={120}
                 
            />
            <span className="font-medium text-[#CE121A] text-[20px]">DROPS OF</span>
            <span className="font-bold text-[#CE121A] text-[25px]">HOPE</span>
          </div>

          {/* Bottom Links */}
          <div className="text-black flex flex-wrap justify-center gap-6 text-[14px] font-Roboto font-weight-200">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Report an Issue</a>
            <a href="#">Disclaimer</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
