import React, { useState } from 'react';
import { FaPlane, FaGlobe, FaAward, FaBuilding, FaCheckCircle, FaThLarge, FaExpand, FaCompress } from 'react-icons/fa';

export default function SrilankanHub() {
  // 🔄 ගුවන් යානා කාණ්ඩ (Filter States) - All, Wide-body, Narrow-body
  const [filterType, setFilterType] = useState('ALL');

  const fleet = [
    { 
      model: "Airbus A330-300", 
      count: "7 Aircraft Active", 
      type: "Wide-body Long Haul",
      category: "WIDE",
      desc: "Equipped with latest inflight innovations, Wi-Fi connectivity, and a luxurious two-class cabin layout designed for long range travel.",
      config: "28 Business / 269 Economy",
      seats: "297 Seats",
      engines: "Rolls-Royce Trent 700",
      wingspan: "60.30 m",
      // 🖼️ [Cloudinary CDN HD]: Standard Livery Airbus A330-300
      image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781503314/A330-300_bdw430.jpg"
    },
    { 
      model: "Airbus A330-200", 
      count: "2 Aircraft Active", 
      type: "Wide-body Long Haul",
      category: "WIDE",
      desc: "An efficient twin-engine widebody built with a comfortable two-class configuration, tailored for high density long range trunk routes.",
      config: "18 Business / 251 Economy",
      seats: "269 Seats",
      engines: "Rolls-Royce Trent 700",
      wingspan: "60.30 m",
      // 🖼️ [Cloudinary CDN HD]: oneworld Alliance Livery Airbus A330-200
      image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781503314/Airbus_A330-200_px70ct.jpg"
    },
    { 
      model: "Airbus A321 Neo", 
      count: "4 Aircraft Active", 
      type: "Narrow-body Medium Haul",
      category: "NARROW",
      desc: "Features structural eco-efficiency, innovative sharklets, and ultra-quiet operation optimized for regional medium-haul flight sectors.",
      config: "12 Business / 176 Economy",
      seats: "188 Seats",
      engines: "CFM LEAP-1A / P&W",
      wingspan: "35.80 m",
      // 🖼️ [Cloudinary CDN HD]: Airbus A321 Neo
      image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781503321/Airbus_A321_Neo_okijf2.png"
    },
    { 
      model: "Airbus A320 Neo", 
      count: "2 Aircraft Active", 
      type: "Narrow-body Short-to-Medium",
      category: "NARROW",
      desc: "Delivers double-digit fuel burn reduction incorporating state-of-the-art powerplants and modern cabin airflow setups.",
      config: "12 Business / 138 Economy",
      seats: "150 Seats",
      engines: "CFM LEAP-1A26",
      wingspan: "35.80 m",
      // 🖼️ [Cloudinary CDN HD]: Airbus A320 Neo (4R-ANB)
      image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781503313/Airbus_A320_Neo_n74seb.jpg"
    },
    { 
      model: "Airbus A321-200", 
      count: "1 Aircraft Active", 
      type: "Narrow-body Medium Haul",
      category: "NARROW",
      desc: "The stretched version of the single-aisle workhorse, maximizing seat capacity and efficiency on high-demand regional destinations.",
      config: "16 Business / 153 Economy",
      seats: "169 Seats",
      engines: "CFM56-5B3/P",
      wingspan: "34.10 m",
      // 🖼️ [Cloudinary CDN HD]: Airbus A321-200
      image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781503322/Airbus_A321-200_mmnbkg.png"
    },
    { 
      model: "Airbus A320-200", 
      count: "1 Aircraft Active", 
      type: "Narrow-body Short Haul",
      category: "NARROW",
      desc: "Highly versatile single-aisle regional jetliner with optimized low-altitude performance across South Asian hubs.",
      config: "12 Business / 138 Economy",
      seats: "150 Seats",
      engines: "CFM56-5B4/P",
      wingspan: "34.10 m",
      // 🖼️ [Cloudinary CDN HD]: "Visit SriLankan" විශේෂ ලිවරි සහිත Airbus A320-200
      image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781503314/Airbus_A320-200_ygrha2.jpg"
    }
  ];

  // 📝 ෆිල්ටර් එක අනුව යානා වෙන් කරගැනීම
  const filteredFleet = fleet.filter(aircraft => {
    if (filterType === 'ALL') return true;
    return aircraft.category === filterType;
  });

  return (
    <div className="bg-[#f8fafc] min-h-screen py-16 font-sans selection:bg-blue-600 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ✈️ TOP HERO BANNER HEADER */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 text-slate-200/40 text-7xl md:text-9xl font-black select-none tracking-widest uppercase hidden md:block">
            FLEET HUB
          </div>
          <span className="text-[11px] bg-blue-50 text-blue-600 font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-blue-200/60 shadow-sm inline-flex items-center space-x-1">
            <span className="h-1.5 w-1.5 bg-blue-600 rounded-full animate-pulse"></span>
            <span>SriLankan Airlines Operational Center</span>
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mt-4 mb-4 tracking-tight uppercase">
            Wings of <span className="text-blue-600">SriLankan</span>
          </h1>
          <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full mb-6 shadow-sm"></div>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-medium">
            Explore the advanced technical specifications, cabin blueprints, and real-time fleet configuration metrics of Sri Lanka's premium national carrier network.
          </p>
        </div>

        {/* 📊 2. METRIC HUB STATISTICS BAR */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { label: "Main Hub Base", val: "BIA Airport (VCBI)", icon: <FaBuilding />, desc: "Katunayake, SL" },
            { label: "Total Fleet Assets", val: "17 Active Aircraft", icon: <FaPlane className="transform -rotate-45" />, desc: "100% Airworthy" },
            { label: "Global Network", val: "110+ Destinations", icon: <FaGlobe />, desc: "Across 56 Countries" },
            { label: "Global Alliance", val: "oneworld Member", icon: <FaAward />, desc: "Elite Airline Matrix" }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 hover:border-blue-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center space-x-5 group relative overflow-hidden">
              <div className="absolute right-[-10px] bottom-[-10px] text-slate-50 text-6xl font-bold opacity-30 group-hover:scale-110 transition-transform duration-300 select-none">
                {idx + 1}
              </div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 text-blue-600 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white flex items-center justify-center text-xl shadow-inner transition-all duration-300 shrink-0">
                {stat.icon}
              </div>
              <div>
                <p className="text-[10px] uppercase font-black text-slate-400 tracking-wider">{stat.label}</p>
                <p className="text-base font-black text-slate-800 mt-0.5 tracking-tight">{stat.val}</p>
                <p className="text-[11px] font-bold text-slate-400/90">{stat.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 📚 3. HISTORY & OPERATIONAL INTEL CARD */}
        <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 mb-16 relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl"></div>
          <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight flex items-center space-x-3 uppercase">
            <span className="h-6 w-1.5 bg-blue-600 rounded-full"></span>
            <span>Corporate Legacy & Global Flight Operations</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-slate-600 text-xs md:text-sm leading-relaxed font-semibold text-justify">
            <p className="bg-slate-50/40 p-4 rounded-2xl border border-slate-50/60">
              Founded in <strong>1979 as Air Lanka</strong> following the operational closure of Air Ceylon, Sri Lanka's premier state-owned carrier has built an unblemished legacy over four decades. Strategic re-branding as <strong>SriLankan Airlines</strong> in 1998 catalyzed a modern tech transformation. Today, as an integral player in the elite <strong>oneworld alliance</strong>, it joins forces with global aviation giants to share vast air codeshares seamlessly.
            </p>
            <p className="bg-slate-50/40 p-4 rounded-2xl border border-slate-50/60">
              Operating centrally from its key South Asian strategic gateway at Bandaranaike International Airport, the airline thrives on ultra-strict air safety matrix configurations. The engineering division boasts independent hangar operations carrying world-recognized certifications under strict <strong>European Aviation Safety Agency (EASA Part 145)</strong> guidelines, maintaining high fleet efficiency.
            </p>
          </div>
        </div>

        {/* 🛩️ 4. INTERACTIVE FLEET FILTER SECTION BAR */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 border-b border-slate-200/60 pb-6">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center space-x-3 uppercase">
            <FaPlane className="text-blue-600 text-sm transform -rotate-45" />
            <span>Active Fleet Specifications Profile</span>
          </h2>
          
          {/* FILTER BUTTONS ROW */}
          <div className="bg-slate-200/60 p-1 rounded-2xl flex space-x-1 border border-slate-200">
            {[
              { id: 'ALL', label: 'All Fleet', icon: <FaThLarge className="text-xs" /> },
              { id: 'WIDE', label: 'Wide-Body', icon: <FaExpand className="text-xs" /> },
              { id: 'NARROW', label: 'Narrow-Body', icon: <FaCompress className="text-xs" /> }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFilterType(btn.id)}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 flex items-center space-x-2 ${filterType === btn.id ? 'bg-blue-600 text-white shadow-md scale-105' : 'text-slate-600 hover:bg-white/50'}`}
              >
                {btn.icon}
                <span>{btn.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* 🛩️ 5. DYNAMIC GRID LIST GENERATOR */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFleet.map((p, i) => (
            <div 
              key={i} 
              className="bg-white rounded-3xl shadow-sm border border-slate-100 hover:border-blue-200 flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden group"
            >
              {/* IMAGE WINDOW WITH DYNAMIC COVER EFFECT */}
              <div className="relative overflow-hidden h-52 shrink-0">
                <img 
                  src={p.image} 
                  alt={p.model} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
                <span className="absolute bottom-4 left-4 text-[10px] font-black tracking-widest bg-blue-600 text-white px-3 py-1 rounded-lg uppercase shadow-md">
                  {p.type}
                </span>
              </div>
              
              {/* SPEC DATA CONTENT BOX */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-black text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors duration-200">
                      {p.model}
                    </h3>
                  </div>

                  {/* ACTIVE INDICATOR GLOW */}
                  <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-1">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[11px] font-extrabold text-emerald-600 tracking-wide uppercase">
                      {p.count}
                    </span>
                  </div>

                  <p className="text-slate-500 text-xs leading-relaxed font-medium text-justify">
                    {p.desc}
                  </p>

                  {/* TECHNICAL GRID DATA TABLE */}
                  <div className="pt-4 space-y-2.5 border-t border-slate-100 text-[11px] font-semibold text-slate-600">
                    <div className="flex justify-between items-center bg-slate-50/60 p-2 rounded-xl border border-slate-50">
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Engine Specification:</span>
                      <span className="text-slate-800 font-extrabold">{p.engines}</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-50/60 p-2 rounded-xl border border-slate-50">
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Wingspan Dimension:</span>
                      <span className="text-slate-800 font-extrabold">{p.wingspan}</span>
                    </div>
                  </div>
                </div>
                
                {/* CONFIG SEATING BLUEPRINT FOOTER */}
                <div className="mt-6 bg-gradient-to-r from-slate-900 to-slate-800 p-3.5 rounded-2xl border border-slate-900 flex justify-between items-center text-[11px] font-bold shadow-md">
                  <span className="text-slate-400 uppercase tracking-wider text-[9px]">Cabin Setup:</span>
                  <span className="text-white font-black tracking-wide">{p.config} <span className="text-blue-400 font-black ml-1">({p.seats})</span></span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}