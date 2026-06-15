import React, { useState } from 'react';
import { FaSearch, FaPlane, FaShieldAlt } from 'react-icons/fa';
import { aircraftData } from '../components/aircraftData.js'; // 👈 අපේ අලුත් යානා 50ක ඩේටා ෆයිල් එක මෙතනින් ඉම්පෝට් කලා

export default function Aircrafts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // all, commercial, military

  // Filtering Logic
  const filteredAircraft = aircraftData.filter(plane => {
    const matchesSearch = plane.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          plane.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || plane.type === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Global Aircraft Directory</h1>
          <p className="text-gray-500 max-w-xl mx-auto">Browse through complete data specs of modern Airbus, Boeing fleets, and tactical military aviation assets.</p>
        </div>

        {/* Search & Tabs Controls */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Tabs */}
          <div className="flex bg-gray-100 p-1.5 rounded-xl w-full md:w-auto">
            <button 
              onClick={() => setActiveTab('all')}
              className={`flex items-center space-x-2 px-5 py-2.5 text-sm font-semibold rounded-lg transition w-full justify-center md:w-auto ${activeTab === 'all' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <span>All Aircrafts</span>
            </button>
            <button 
              onClick={() => setActiveTab('commercial')}
              className={`flex items-center space-x-2 px-5 py-2.5 text-sm font-semibold rounded-lg transition w-full justify-center md:w-auto ${activeTab === 'commercial' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <FaPlane />
              <span>Commercial</span>
            </button>
            <button 
              onClick={() => setActiveTab('military')}
              className={`flex items-center space-x-2 px-5 py-2.5 text-sm font-semibold rounded-lg transition w-full justify-center md:w-auto ${activeTab === 'military' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <FaShieldAlt />
              <span>Military</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
              <FaSearch />
            </span>
            <input 
              type="text" 
              placeholder="Search plane (e.g. A380, Boeing)..." 
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-blue-500 transition text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

        </div>

        {/* Results Grid */}
        {filteredAircraft.length === 0 ? (
          <div className="text-center py-20 text-gray-400 font-medium">No aircraft matching your query found. Try another term.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAircraft.map((plane, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col justify-between">
                <div>
                  {/* Image Header */}
                  <img src={plane.image} alt={plane.name} className="w-full h-52 object-cover bg-slate-100" />
                  
                  {/* Info Details */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900 tracking-tight">{plane.name}</h3>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase ${plane.type === 'commercial' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'}`}>
                        {plane.type}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-3">Mfg: {plane.manufacturer}</span>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">{plane.description}</p>
                    
                    {/* Technical Specifications */}
                    <div className="border-t border-gray-100 pt-4 space-y-2">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Technical Specifications</h4>
                      {Object.entries(plane.specs).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-xs py-1 border-b border-gray-50/60 last:border-0">
                          <span className="text-gray-400 capitalize font-medium">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="text-gray-800 font-bold">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}