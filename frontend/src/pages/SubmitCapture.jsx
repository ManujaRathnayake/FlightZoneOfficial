import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUpload, FaInstagram, FaMapMarkerAlt, FaPlane, FaTrash, FaTimes } from 'react-icons/fa';

// 👑 [YOUR API KEY]: උඹට ලැබුණු API Key එක මෙතනට දාපන් මචං (ImgBB හෝ FreeImage එකෙන් ලැබුණු එක)
const IMGBB_API_KEY = 'fb453e029a2ba2cb40622430b1d5a5a7'; 

export default function SubmitCapture() {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [instagram, setInstagram] = useState('');
  const [images, setImages] = useState([]); // තෝරන පින්තූර ෆයිල්ස් ලිස්ට් එක
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [aircraftSearch, setAircraftSearch] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  const [showAircraftDropdown, setShowAircraftDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const aircraftModels = [
    "Airbus A320neo", "Airbus A321neo", "Airbus A330-250", "Airbus A330-300", "Airbus A330-900neo", "Airbus A350-900", "Airbus A380-800", 
    "Boeing 737 MAX 8", "Boeing 747-400", "Boeing 777-300ER", "Boeing 787-9 Dreamliner", "Antonov An-32B",
    "IAI Kfir C2/C7 (SLAF)", "Chengdu F-7 Skybolt (SLAF)", "Mi-17 Hip (SLAF)", "Bell 212 Twin Huey (SLAF)", "Bell 412 (SLAF)", "Y-12 Turbo Panda"
  ];
  
  const worldAirports = [
    "Bandaranaike International Airport (CMB) - Sri Lanka", "Mattala Rajapaksa International Airport (HRI) - Sri Lanka", 
    "Changi Airport (SIN) - Singapore", "Heathrow Airport (LHR) - UK", "Dubai International Airport (DXB) - UAE", "Hamad International Airport (DOH) - Qatar"
  ];

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) { 
      alert('Please Login first!'); navigate('/login'); 
    } else { 
      setUser(JSON.parse(storedUser)); 
    }
  }, [navigate]);

  const handleMultipleImages = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 6) {
      alert("⚠️ You can only upload a maximum of 6 images!");
      return;
    }
    setImages(prev => [...prev, ...files]);
  };

  const removeImage = (indexToRemove) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  // 👑 API MULTI-IMAGE UPLOAD & BACKEND SAVE LOGIC
  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalTitle = title || aircraftSearch;

    if (!finalTitle || !location) return alert('Please fill all fields!');
    if (images.length === 0) return alert('Please upload at least 1 image!');
    
    setLoading(true);
    let uploadedImageUrls = [];

    try {
      // 🚀 1. හැම පින්තූරයක්ම එකින් එක Cloud සර්වර් එකට Upload කරන ලූප් එක
      for (let i = 0; i < images.length; i++) {
        const bodyFormData = new FormData();
        bodyFormData.append('image', images[i]);

        // ImgBB / FreeImage API එකට කෙලින්ම ෆ්‍රොන්ටෙන්ඩ් එකෙන් පින්තූරය යවනවා මචං
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
          method: 'POST',
          body: bodyFormData
        });

        const resData = await response.json();
        
        if (resData.success) {
          uploadedImageUrls.push(resData.data.url); // සර්වර් එකෙන් ලැබුණු නියම Live Image URL ලින්ක් එක 🔥
        } else {
          throw new Error("Image upload failed at index: " + (i + 1));
        }
      }

      // 📡 2. ලැබුණු ලින්ක්ස් ටික අපේ බැක්එන්ඩ් එකට (server.js) යවනවා ඩේටාබේස් සේව් කරන්න
      const backendRes = await fetch('https://flight-zone-official.vercel.app/api/spotters/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: user.name,
          title: finalTitle,
          location,
          instagram,
          images: uploadedImageUrls // ලයිව් CDN ලින්ක්ස් ටික යනවා 📸
        })
      });

      if (backendRes.ok) {
        alert('🎉 Successfully uploaded captures live! Waiting for HQ approval.');
        navigate('/');
      } else {
        alert('❌ Backend failed to save data.');
      }

    } catch (err) {
      console.error(err);
      alert('⚠️ Cloud Upload Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 flex items-center justify-center font-sans">
      <div className="bg-white p-8 rounded-3xl shadow-md border max-w-lg w-full">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-1">Submit Your Plane Spotting</h2>
        <p className="text-gray-400 text-xs text-center mb-6">Safe, secure, and 100% automated aircraft capture upload.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Spotter Name</label>
            <input type="text" className="w-full bg-gray-100 border p-3 rounded-xl text-sm font-semibold text-gray-600 outline-none" disabled value={user ? user.name : ''} />
          </div>

          <div className="relative">
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Aircraft Model (Select or Type Custom Name)</label>
            <div className="flex items-center relative">
              <FaPlane className="absolute left-4 text-gray-400 text-sm" />
              <input type="text" placeholder="Search or type custom aircraft name..." className="w-full border p-3 pl-11 rounded-xl text-sm outline-none focus:border-blue-500 font-medium text-gray-800" value={aircraftSearch} onChange={(e) => { setAircraftSearch(e.target.value); setTitle(e.target.value); setShowAircraftDropdown(true); }} onFocus={() => setShowAircraftDropdown(true)} />
            </div>
            {showAircraftDropdown && aircraftSearch && (
              <div className="absolute z-50 w-full bg-white border mt-1 rounded-xl shadow-lg max-h-40 overflow-y-auto">
                {aircraftModels.filter(m => m.toLowerCase().includes(aircraftSearch.toLowerCase())).map((m, i) => (
                  <div key={i} className="p-3 text-sm hover:bg-blue-50 cursor-pointer font-medium text-gray-700" onClick={() => { setTitle(m); setAircraftSearch(m); setShowAircraftDropdown(false); }}>{m}</div>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Airport / Location</label>
            <div className="flex items-center relative">
              <FaMapMarkerAlt className="absolute left-4 text-gray-400 text-sm" />
              <input type="text" placeholder="Search airport..." className="w-full border p-3 pl-11 rounded-xl text-sm outline-none focus:border-blue-500 font-medium text-gray-800" value={locationSearch} onChange={(e) => { setLocationSearch(e.target.value); setLocation(e.target.value); setShowLocationDropdown(true); }} onFocus={() => setShowLocationDropdown(true)} />
            </div>
            {showLocationDropdown && locationSearch && (
              <div className="absolute z-50 w-full bg-white border mt-1 rounded-xl shadow-lg max-h-40 overflow-y-auto">
                {worldAirports.filter(a => a.toLowerCase().includes(locationSearch.toLowerCase())).map((a, i) => (
                  <div key={i} className="p-3 text-sm hover:bg-blue-50 cursor-pointer font-medium text-gray-700" onClick={() => { setLocation(a); setLocationSearch(a); setShowLocationDropdown(false); }}>{a}</div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Instagram Link</label>
            <div className="flex items-center relative">
              <FaInstagram className="absolute left-4 text-gray-400 text-sm" />
              <input type="text" placeholder="https://instagram.com/handle" className="w-full border p-3 pl-11 rounded-xl text-sm outline-none font-medium text-gray-800" value={instagram} onChange={(e)=>setInstagram(e.target.value)} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Upload Captures ({images.length}/6)</label>
            <div className="border-2 border-dashed border-gray-200 p-4 rounded-xl text-center cursor-pointer hover:bg-gray-50 relative">
              <div className="flex flex-col items-center py-2 text-gray-400">
                <FaUpload size={24} className="mb-1 text-blue-500" />
                <span className="text-xs font-semibold">Click to select multiple photos (Max 6)</span>
              </div>
              <input type="file" accept="image/*" multiple className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleMultipleImages} />
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-3">
                {images.map((img, index) => (
                  <div key={index} className="relative group rounded-lg overflow-hidden border h-20 bg-gray-100">
                    <img src={URL.createObjectURL(img)} alt="Preview" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full text-xs opacity-90 hover:bg-red-700 transition">
                      <FaTimes size={10} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button type="submit" disabled={loading} className={`w-full text-white font-bold p-4 rounded-xl transition shadow-md ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}>
            {loading ? "Processing and Syncing Images..." : "Submit Gallery Package"}
          </button>
        </form>
      </div>
    </div>
  );
}