import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlane, FaFacebook, FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 border-t border-gray-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Column 1: Brand Info */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center space-x-2 text-white font-bold text-xl tracking-wider">
            <FaPlane className="h-6 w-6 text-blue-500 transform -rotate-45" />
            <span>FLIGHT ZONE</span>
          </Link>
          <p className="text-sm text-gray-500 leading-relaxed">
            The ultimate aviation hub in Sri Lanka. Bringing you the most reliable career roadmaps, aircraft directories, and community showcases.
          </p>
        </div>

        {/* Column 2: Quick Navigation */}
        <div>
          <h3 className="text-white text-sm font-bold tracking-wider uppercase mb-4">Quick Links</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <Link to="/" className="hover:text-blue-400 transition">Home</Link>
            <Link to="/aircrafts" className="hover:text-blue-400 transition">Aircrafts</Link>
            <Link to="/srilankan-hub" className="hover:text-blue-400 transition">SriLankan Hub</Link>
            <Link to="/careers" className="hover:text-blue-400 transition">Career Guides</Link>
            <Link to="/news" className="hover:text-blue-400 transition">News & Blog</Link>
            
          </div>
        </div>

        {/* Column 3: Community Connect */}
        <div>
          <h3 className="text-white text-sm font-bold tracking-wider uppercase mb-4">Our Community</h3>
          <p className="text-sm text-gray-500 mb-4">Join 88K+ aviation enthusiasts on our social platforms.</p>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-blue-500 transition"><FaFacebook /></a>
            <a href="#" className="hover:text-pink-500 transition"><FaInstagram /></a>
            <a href="mailto:info@flightzone.lk" className="hover:text-red-400 transition"><FaEnvelope /></a>
          </div>
        </div>

      </div>

      {/* --- 👑 BOTTOM BAR: COPYRIGHT & DEVELOPER CREDITS --- */}
      <div className="border-t border-gray-800 py-6 bg-gray-950/50">
        {/* 💡 මෙතන ඔක්කොම මැදට (Center) ඇලයිමන්ට් කලා චැට් බොට් එකට අහුවෙන්නෙ නැති වෙන්න */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center space-y-2 text-xs font-semibold tracking-wide text-center">
          <p className="text-gray-600">&copy; {new Date().getFullYear()} Flight Zone Sri Lanka. All Rights Reserved.</p>
          
          <p className="text-gray-500 flex items-center justify-center space-x-1">
            <span>Developed By</span>
            <a 
              href="https://www.linkedin.com/in/manuja-rathnayake-563212251" 
              target="_blank" 
              rel="noreferrer" 
              className="text-blue-400 hover:text-blue-300 transition-all font-bold underline flex items-center space-x-1 cursor-pointer"
            >
              <span>Manuja Rathnayake</span>
              <FaLinkedin className="inline text-[10px] ml-0.5 text-blue-400" />
            </a>
          </p>
        </div>
      </div>

    </footer>
  );
}