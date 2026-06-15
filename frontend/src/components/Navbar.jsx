import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlane, FaUserCircle, FaShieldAlt, FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 1. 🔄 Page Scroll එක හරියටම මැනීම
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. 👤 LocalStorage එකෙන් යූසර් කියවා ගැනීම
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("User reading error:", err);
      }
    }
  }, []);

  // 👑 ඇඩ්මින් කෙනෙක්ද කියලා ෂුවර් එකටම චෙක් කරන ලොජික් එක
  const isAdminUser = () => {
    if (!user) return false;
    const role = user.role ? String(user.role).toLowerCase() : '';
    const email = user.email ? String(user.email).toLowerCase() : '';
    
    return (
      role === 'admin' || 
      user.isAdmin === true || 
      email.includes('admin') ||
      email === 'blueskynetworksh@gmail.com'
    );
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-40 font-sans border-b border-gray-800 overflow-visible select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center space-x-2 font-bold text-xl tracking-wider hover:opacity-90 transition z-50">
            <FaPlane className="h-6 w-6 text-blue-500 transform -rotate-45" />
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">FLIGHT ZONE</span>
          </Link>

          {/* 💻 DESKTOP MENU LINKS */}
          <div className="hidden md:flex space-x-6 text-sm font-semibold items-center">
            <Link to="/" className="hover:text-blue-400 transition duration-200">Home</Link>
            <Link to="/aircrafts" className="hover:text-blue-400 transition duration-200">Aircrafts</Link>
            <Link to="/srilankan-hub" className="hover:text-blue-400 transition duration-200">SriLankan Hub</Link>
            <Link to="/careers" className="hover:text-blue-400 transition duration-200">Career Guides</Link>
            <Link to="/news" className="hover:text-blue-400 transition duration-200">News</Link>
            
            {/* 👑 1. Desktop මෙනු එකට Live Radar එකතු කළා */}
            <Link to="/live-tracker" className="text-blue-400 hover:text-blue-300 font-bold transition duration-200 flex items-center space-x-1">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping mr-1"></span>
              <span>Live Radar</span>
            </Link>
          </div>

          {/* RIGHT SIDE: USER PROFILE / LOGIN / HAMBURGER BUTTON */}
          <div className="flex items-center space-x-3 z-50">
            
            {/* 👑 DESKTOP ADMIN DASHBOARD BUTTON */}
            {isAdminUser() && (
              <Link 
                to="/admin-hq" 
                className="hidden sm:flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-full text-xs font-bold transition duration-200 shadow-md animate-pulse border border-red-500/40"
              >
                <FaShieldAlt className="text-[11px]" />
                <span>Admin HQ</span>
              </Link>
            )}

            {/* PROFILE / LOGIN BUTTON */}
            {user ? (
              <Link to="/my-profile" className="flex items-center space-x-2.5 bg-gray-800/60 hover:bg-gray-800 px-3 py-1.5 rounded-full border border-gray-700/50 transition">
                {user.profilePic ? (
                  <img 
                    src={user.profilePic} 
                    alt="Profile" 
                    className="w-7 h-7 rounded-full object-cover border border-blue-500/50 shadow-sm"
                  />
                ) : (
                  <FaUserCircle className="w-7 h-7 text-gray-400" />
                )}
                <span className="text-xs font-bold hidden sm:inline max-w-[120px] truncate">
                  {user.name || "My Profile"}
                </span>
              </Link>
            ) : (
              <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-xs px-5 py-2 rounded-full font-bold shadow-md transition duration-200">
                Login
              </Link>
            )}

            {/* 📱 MOBILE HAMBURGER BUTTON */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white text-xl p-2 focus:outline-none transition duration-200 cursor-pointer"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

        </div>
      </div>

      {/* 📱 ─── MOBILE DROP-DOWN MENU DRAWER ─── */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-b border-gray-800 animate-fade-in">
          <div className="px-4 pt-2 pb-6 space-y-3 font-semibold text-sm flex flex-col border-t border-gray-800/60">
            
            {/* 👑 මොබයිල් එකේදී ඇඩ්මින් බටන් එක */}
            {isAdminUser() && (
              <Link 
                to="/admin-hq" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center space-x-1 bg-red-600 text-white py-2.5 rounded-xl text-xs font-bold shadow-md animate-pulse"
              >
                <FaShieldAlt className="text-[11px]" />
                <span>Admin HQ Dashboard</span>
              </Link>
            )}

            {/* 👑 2. Mobile මෙනු එකටත් Live Radar එකතු කළා (යූසර්ට ලේසියෙන්ම ඇහැට කනට පේන්න උඩින්ම දැම්මා) */}
            <Link 
              to="/live-tracker" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="bg-blue-950/40 text-blue-400 border border-blue-900/40 px-3 py-2.5 rounded-xl transition font-bold flex items-center space-x-2"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Live Radar Tracking</span>
            </Link>

            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:bg-gray-800 px-3 py-2.5 rounded-xl transition">Home</Link>
            <Link to="/aircrafts" onClick={() => setIsMobileMenuOpen(false)} className="hover:bg-gray-800 px-3 py-2.5 rounded-xl transition">Aircrafts</Link>
            <Link to="/srilankan-hub" onClick={() => setIsMobileMenuOpen(false)} className="hover:bg-gray-800 px-3 py-2.5 rounded-xl transition">SriLankan Hub</Link>
            <Link to="/careers" onClick={() => setIsMobileMenuOpen(false)} className="hover:bg-gray-800 px-3 py-2.5 rounded-xl transition">Career Guides</Link>
            <Link to="/news" onClick={() => setIsMobileMenuOpen(false)} className="hover:bg-gray-800 px-3 py-2.5 rounded-xl transition">News</Link>
            
          </div>
        </div>
      )}

      {/* ✈️ ─── SCROLLING PLANE TRACKER ─── */}
      <div className="absolute bottom-[-2px] left-0 w-full h-[3px] bg-gray-950/40 pointer-events-none z-50">
        <div 
          className="h-full bg-blue-500 transition-all duration-75 ease-out shadow-[0_0_10px_#3b82f6]"
          style={{ width: `${scrollProgress}%` }}
        />
        <div 
          className="absolute top-1/2 -translate-y-1/2 -ml-2 transition-all duration-75 ease-out text-blue-400 drop-shadow-[0_0_6px_#3b82f6]"
          style={{ left: `${scrollProgress}%` }}
        >
          <FaPlane className="text-base transform rotate-90" />
        </div>
      </div>

    </nav>
  );
}