import React from 'react';
import { FaPlaneDeparture, FaInfoCircle } from 'react-icons/fa';

export default function LiveTracker() {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 flex items-center space-x-3">
            <FaPlaneDeparture className="text-blue-600 transform -rotate-45" />
            <span>Flight Zone - Live Air Radar</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Unfiltered real-time flight tracking powered by Flighzone Official
          </p>
        </div>

        {/* Radar Card */}
        <div className="bg-gray-900 p-2 md:p-4 rounded-3xl border border-gray-800 shadow-xl overflow-hidden">
          {/* 👑 ADS-B Exchange 100% Free Open Source Radar එක */}
          <iframe 
            src="https://globe.adsbexchange.com/?lat=7.8731&lon=80.7718&zoom=7.0" 
            width="100%" 
            height="650" 
            className="rounded-xl border-0"
            allowFullScreen
            title="Live Flight Tracker"
          ></iframe>
        </div>

        {/* Pro Tip Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-100 p-4 rounded-2xl flex items-start space-x-3 text-sm text-blue-700">
          <FaInfoCircle className="mt-0.5 flex-shrink-0" />
          <span>
            <strong>Pro Tip:</strong> Zoom in or out using your mouse wheel. Click on any active aircraft to view detailed flight paths, live metrics, speed, altitude, and registration numbers completely free!
          </span>
        </div>

      </div>
    </div>
  );
}