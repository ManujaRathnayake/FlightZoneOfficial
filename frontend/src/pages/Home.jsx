import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaFacebook, FaInstagram, FaCamera, FaMapMarkerAlt, FaPlane, FaClock, FaExclamationTriangle } from 'react-icons/fa';

// 👑 1. Image Slider එක සහ Card එක වෙනම Component එකකට (Hooks ලෙඩේ සුව කළ කොටස)
function SpotterCard({ img }) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const postImages = img.images && img.images.length > 0 ? img.images : [img.image];

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
      
      {/* Image Slider Component */}
      <div className="relative w-full h-56 bg-gray-900 group">
        <img src={postImages[currentImgIndex]} alt={img.title} className="w-full h-full object-cover select-none transition-all duration-300" />
        
        {postImages.length > 1 && (
          <>
            <button type="button" onClick={() => setCurrentImgIndex(prev => (prev === 0 ? postImages.length - 1 : prev - 1))} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition duration-200 z-10">❮</button>
            <button type="button" onClick={() => setCurrentImgIndex(prev => (prev === postImages.length - 1 ? 0 : prev + 1))} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition duration-200 z-10">❯</button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5 bg-black/40 px-2.5 py-1 rounded-full z-10">
              {postImages.map((_, idx) => (
                <button key={idx} type="button" onClick={() => setCurrentImgIndex(idx)} className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentImgIndex ? 'bg-white scale-125' : 'bg-white/40'}`} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Card Details */}
      <div className="p-5">
        <h3 className="font-bold text-gray-800 text-lg mb-1 truncate">{img.title}</h3>
        <div className="flex items-center text-xs text-gray-400 space-x-1 mb-4">
          <FaMapMarkerAlt /> <span className="truncate">{img.location}</span>
        </div>
        <div className="flex justify-between items-center border-t border-gray-50 pt-3">
          <span className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md font-bold truncate max-w-[180px]">👤 {img.userName}</span>
          {img.instagram && (
            <a href={img.instagram} target="_blank" rel="noreferrer" className="text-pink-600 hover:text-pink-800 text-lg transition"><FaInstagram /></a>
          )}
        </div>
      </div>

    </div>
  );
}

// 🌐 ─── MAIN HOME COMPONENT ───
export default function Home() {
  const [spotterImages, setSpotterImages] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  // 👑 ─── FLIGHT BOARD STATES ───
  const [activeAirport, setActiveAirport] = useState('CMB'); 
  const [activeTab, setActiveTab] = useState('arrivals'); 
  const [flights, setFlights] = useState([]);
  const [loadingFlights, setLoadingFlights] = useState(true);

  // 1. ඩේටාබේස් එකෙන් Approved Spotter Packages ලයිව් ලබාගැනීම
  useEffect(() => {
    fetch('http://localhost:5000/api/spotters/approved')
      .then(res => res.json())
      .then(data => setSpotterImages(data))
      .catch(err => console.error("Error fetching spotter images:", err));
  }, []);

  // 2. Live Flight Data Logic
  useEffect(() => {
    setLoadingFlights(true);
    fetch(`http://localhost:5000/api/flights/${activeAirport}`)
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(f => f.type === activeTab);
        setFlights(filtered);
        setLoadingFlights(false);
      })
      .catch(err => {
        console.error("Error fetching flights:", err);
        setLoadingFlights(false);
      });
  }, [activeAirport, activeTab]);

  // 3. Crew Data
  const admins = [
    { 
      name: "Manuja Rathnayake", 
      role: "Founder & Developer", 
      image: "/admins/manuja.jpg", 
      bio: "Visionary behind Flight Zone. Overseeing overall community operations, media curation, and driving strategic growth for the 88K+ global aviation family.", 
      fb: "#", 
      ig: "#" 
    },
    { 
      name: "Imasha Welivita", 
      role: "Co-Founder", 
      image: "/admins/imasha.jpg", 
      bio: "Managing the platform architecture, core features, and community moderation. Ensuring a seamless, secure, and world-class digital experience for all users.", 
      fb: "#", 
      ig: "#" 
    },
    { 
      name: "Tinal Dilanka", 
      role: "Official Planespotter", 
      image: "/admins/tinal.jpg", 
      bio: "Capturing the skies with precision. Lead aircraft photographer specializing in premium aviation wallpapers, live runway actions, and spotting hub curation.", 
      fb: "#", 
      ig: "#" 
    },
    { 
      name: "Chamodya Gunawardhana", 
      role: "Community Administrator", 
      image: "/admins/chamodya.jpg", 
      bio: "Driving audience interaction, managing public inquiries, and keeping the enthusiast workspace secure, professional, and actively engaged 24/7.", 
      fb: "#", 
      ig: "#" 
    },
    { 
      name: "Ishan Menuka", 
      role: "Platform Administrator", 
      image: "/admins/ishan.jpg", 
      bio: "Handling content moderation, policy enforcement, and screening community submissions to maintain the high standards of aviation excellence.", 
      fb: "#", 
      ig: "#" 
    }
  ];

  // 4. Inquiry Submit Logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert('Thank you! Your inquiry has been saved to MongoDB Atlas.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (err) { 
      console.error(err); 
      alert('Failed to connect to server.');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* Hero Section with Aircraft Background */}
      <div 
        className="relative bg-cover bg-center py-36 text-white overflow-hidden"
        style={{ backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.55)), url('https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=1920')` }}
      >
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -right-24 w-[28rem] h-[28rem] bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <FaPlane className="hidden md:block absolute top-24 left-[8%] text-blue-400/30 text-6xl transform rotate-45 animate-float pointer-events-none" />
        <FaPlane className="hidden md:block absolute bottom-16 right-[10%] text-indigo-400/20 text-7xl transform -rotate-12 animate-float pointer-events-none" style={{ animationDelay: '1.5s' }} />

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 glass text-blue-200 px-4 py-2 rounded-full font-semibold text-sm mb-6 border border-blue-400/30 shadow-glow animate-fade-in">
            <FaUsers size={16} />
            <span>Flight Zone — Proud Community of 88K+ Followers on Facebook</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 text-white drop-shadow-md animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Your Ultimate Gateway to <span className="text-gradient">Aviation Excellence</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Welcome to Flight Zone. Our page is a passionate community dedicated to bringing you the most reliable aviation guides, career roadmaps, and industry news.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Link to="/live-tracker" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-7 py-3.5 rounded-xl transition shadow-lg shadow-blue-900/40 flex items-center space-x-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Live Flight Radar</span>
            </Link>
            
            {/* 👑 [BUTTON MODIFIED]: Explore Gallery වෙනුවට SriLankan Hub බටන් එක ලස්සනට සෙට් කලා මචං */}
            <Link to="/srilankan-hub" className="glass hover:bg-white/15 text-white font-bold px-7 py-3.5 rounded-xl transition border border-white/20 flex items-center space-x-2 shadow-md">
              <FaPlane className="transform -rotate-45 text-blue-400" />
              <span>SriLankan Hub</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 👑 🇱🇰 ශ්‍රී ලන්කන් එයාර්ලයින්ස් SECTION */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div 
            className="relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-cover bg-center text-white p-8 md:p-16 border border-gray-800"
            style={{ backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.4)), url('https://images.unsplash.com/photo-1544016718-2c261787c82a?q=80&w=1920')` }}
          >
            <div className="relative z-10 max-w-2xl space-y-5">
              <span className="text-xs bg-emerald-500 text-white font-extrabold px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-400/30 shadow-sm">
                National Carrier of Sri Lanka
              </span>
              
              <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-none text-white">
                SriLankan Airlines <br />
                <span className="text-blue-400 font-medium text-2xl md:text-3xl">You're Our World</span>
              </h2>
              
              <p className="text-gray-300 text-sm md:text-base leading-relaxed font-medium">
                Established in 1979 as Air Lanka, SriLankan Airlines operates from its main hub at Bandaranaike International Airport (BIA) in Colombo. As a proud member of the <strong>oneworld</strong> alliance, it connects our tropical island to a global network covering Europe, the Middle East, Australia, and Asia.
              </p>
              
              <p className="text-gray-300 text-sm md:text-base leading-relaxed font-medium">
                The airline currently commands a modern, state-of-the-art 100% Airbus fleet, featuring the highly efficient wide-body <strong>Airbus A330-300</strong> for long-haul comfort, and advanced, eco-friendly <strong>A320neo and A321neo</strong> aircraft for regional routes.
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link to="/srilankan-hub" className="bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm font-bold px-6 py-3 rounded-xl transition shadow-md flex items-center space-x-2">
                  <FaPlane className="transform -rotate-45" />
                  <span>Explore SriLankan Hub</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- PLANE SPOTTERS GALLERY SECTION --- */}
      <div className="py-20 max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-1">Plane Spotters Gallery</h2>
            <p className="text-gray-500">Stunning aircraft captures submitted directly by our talented community.</p>
          </div>
          <Link to="/submit-capture" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-3 rounded-xl flex items-center space-x-2 mt-4 md:mt-0 shadow-md transition">
            <FaCamera /> <span>Submit Your Capture</span>
          </Link>
        </div>

        {spotterImages.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 text-gray-400 font-medium shadow-sm">
            No captures approved in the gallery yet. Be the first to submit up to 6 photos!
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {spotterImages.map((img) => (
              <SpotterCard key={img._id} img={img} />
            ))}
          </div>
        )}
      </div>

      {/* 👑 ─── LIVE AIRPORT FLIGHT BOARD SECTION ─── */}
      <div className="bg-slate-900 text-white py-20 border-t border-b border-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white flex items-center justify-center space-x-3">
              <span className="inline-block w-3 h-3 rounded-full bg-emerald-500 animate-pulse mr-1"></span>
              <span>Live Airport Flight Board</span>
            </h2>
            <p className="text-slate-400 text-sm mt-2">Hourly automated real-time schedules</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-800 p-4 rounded-2xl border border-slate-700/60 mb-6 gap-4">
            <div className="flex space-x-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button onClick={() => setActiveAirport('CMB')} className={`px-5 py-2 text-xs md:text-sm font-bold rounded-lg transition ${activeAirport === 'CMB' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>Katunayake (CMB)</button>
              <button onClick={() => setActiveAirport('HRI')} className={`px-5 py-2 text-xs md:text-sm font-bold rounded-lg transition ${activeAirport === 'HRI' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>Mattala (HRI)</button>
            </div>

            <div className="flex space-x-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button onClick={() => setActiveTab('arrivals')} className={`px-5 py-2 text-xs md:text-sm font-bold rounded-lg transition ${activeTab === 'arrivals' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}>🛬 Arrivals</button>
              <button onClick={() => setActiveTab('departures')} className={`px-5 py-2 text-xs md:text-sm font-bold rounded-lg transition ${activeTab === 'departures' ? 'bg-amber-500 text-white' : 'text-slate-400 hover:text-white'}`}>🛫 Departures</button>
            </div>
          </div>

          <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
            {loadingFlights ? (
              <div className="text-center py-20 text-slate-500 font-medium animate-pulse">Loading active airport schedules...</div>
            ) : flights.length === 0 ? (
              <div className="text-center py-20 text-slate-500 font-medium flex flex-col items-center justify-center space-y-2">
                <FaExclamationTriangle className="text-amber-500 text-2xl" />
                <span>No active flights scheduled in this 12-hour window.</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-bold">
                      <th className="p-4">Time</th>
                      <th className="p-4">Flight</th>
                      <th className="p-4">Airline</th>
                      <th className="p-4">Aircraft Model</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900 font-mono">
                    {flights.map((flight, index) => (
                      <tr key={index} className="hover:bg-slate-900/60 transition duration-150">
                        <td className="p-4 text-blue-400 font-bold flex items-center space-x-2">
                          <FaClock className="text-xs text-slate-500" />
                          <span>{new Date(flight.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </td>
                        <td className="p-4 text-white font-extrabold tracking-wider">{flight.flightNumber}</td>
                        <td className="p-4 text-slate-300 font-sans font-semibold">{flight.airline}</td>
                        <td className="p-4 text-slate-400 font-sans text-xs">{flight.aircraft}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-md text-xs font-bold font-sans ${
                            flight.status.toLowerCase().includes('expected') || flight.status.toLowerCase().includes('active') || flight.status.toLowerCase().includes('enroute')
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          }`}>
                            {flight.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Flight Zone Admins Section */}
      <div className="bg-white py-20 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">Meet the Flight Zone Crew</h2>
          <p className="text-gray-500 text-center mb-12">The dedicated team working behind the scenes.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {admins.map((admin, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-100 transition-all duration-300">
                <div>
                  <img 
                    src={admin.image} 
                    alt={admin.name} 
                    className="w-24 h-24 mx-auto rounded-full object-cover shadow-md border-4 border-white mb-4 ring-2 ring-blue-50"
                  />
                  <h3 className="font-bold text-gray-900 text-lg">{admin.name}</h3>
                  <p className="text-xs text-blue-600 font-semibold mb-3">{admin.role}</p>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{admin.bio}</p>
                </div>
                <div className="flex justify-center space-x-4 border-t border-gray-200/60 pt-4">
                  <a href={admin.fb} className="text-blue-600 hover:text-blue-800 text-xl transition"><FaFacebook /></a>
                  <a href={admin.ig} className="text-pink-600 hover:text-pink-800 text-xl transition"><FaInstagram /></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inquiry Form */}
      <div className="max-w-3xl mx-auto px-4 py-20">
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">Aviation Inquiry Desk</h2>
          <p className="text-gray-500 text-center text-sm mb-2">Have a question or partnership idea? Drop us a message below.</p>
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input type="text" placeholder="Your Name" className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-sm transition" required value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} />
              <input type="email" placeholder="Email Address" className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-sm transition" required value={formData.email} onChange={(e)=>setFormData({...formData, email: e.target.value})} />
            </div>
            <input type="text" placeholder="Subject" className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-sm transition" required value={formData.subject} onChange={(e)=>setFormData({...formData, subject: e.target.value})} />
            <textarea rows="4" placeholder="Your Message" className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-sm transition" required value={formData.message} onChange={(e)=>setFormData({...formData, message: e.target.value})}></textarea>
            <button type="submit" className="w-full bg-blue-600 text-white font-semibold p-4 rounded-xl hover:bg-blue-700 transition shadow-md hover:shadow-lg">Submit Inquiry</button>
          </form>
        </div>
      </div>

    </div>
  );
}