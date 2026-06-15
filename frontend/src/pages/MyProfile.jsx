import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserEdit, FaLock, FaClock, FaMapMarkerAlt, FaPlane, FaSignOutAlt, FaCamera } from 'react-icons/fa';

export default function MyProfile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState(''); // အලුတ် Profile Pic එක තියාගන්න State එක
  const [pendingCaptures, setPendingCaptures] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    const userObj = JSON.parse(storedUser);
    setUser(userObj);
    setName(userObj.name);
    setProfilePic(userObj.profilePic || ''); // දැනට තියෙන පින්තූරය ලෝඩ් කළා

    // යූසර්ගේ Pending Captures ටික ලෝඩ් කිරීම
    fetch(`http://localhost:5000/api/spotters/my-pending/${userObj.name}`)
      .then(res => res.json())
      .then(data => {
        setPendingCaptures(data);
        setLoading(false);
      })
      .catch(err => { console.error(err); setLoading(false); });
  }, [navigate]);

  // 📷 පින්තූරය කුඩා කරලා Base64 බවට හරවන ඔයාගේ සුපිරි කෝඩ් එක
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const MAX_WIDTH = 150; // රවුමට පේන්න 150px ඇති
          const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7); // 70% Quality
          setProfilePic(compressedBase64); // Instant Preview එක පෙනෙයි
        };
      };
      reader.readAsDataURL(file);
    }
  };

  // Profile (Name & Image) Update කිරීමේ Function එක
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/auth/update-profile/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, profilePic }) 
      });
      const data = await res.json();
      
      if (res.ok) {
        // 💡 ලෙඩේ සුව කළ තැන: පරණ Object එකට අලුත් නම සහ ඉමේජ් එක එකතු කර අලුත් එකක් හදනවා
        const updatedUserObj = {
          id: user.id,
          email: user.email,
          role: user.role,
          name: name,         // 👈 අලුත් නම
          profilePic: profilePic // 👈 අලුත්ම Base64 පින්තූරය
        };

        // 💡 ඒක LocalStorage එකට දාලා පරණ කුණු සේරම ක්ලීන් කරනවා
        localStorage.setItem('user', JSON.stringify(updatedUserObj)); 
        
        alert('Profile updated successfully!');
        window.location.reload(); // 🚀 දැන් රිෆ්‍රෙෂ් වුණු ගමන් ක්ෂණිකව අලුත් එක වදීවි!
      } else {
        alert(data.message || "Failed to update profile.");
      }
    } catch (err) { 
      console.error(err); 
    }
  };

  // 🚨 ─── LOG OUT FUNCTION ───
  const handleLogout = () => {
    localStorage.removeItem('user'); 
    navigate('/'); 
    window.location.reload(); 
  };

  if (!user) return <div className="text-center py-20 font-medium">Loading Pilot Lounge...</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
        
        {/* 🛠️ වම් පැත්ත: Profile Info & Update Form */}
        <div className="md:col-span-1 bg-white p-6 rounded-3xl border shadow-sm h-fit">
          <div className="text-center mb-6">
            
            {/* 👑 පින්තූරය උඩින් කුඩා කැමරා බටන් එක */}
            <div className="relative w-24 h-24 mx-auto mb-3 group">
              <img 
                src={profilePic || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150"} 
                alt="Avatar" 
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 shadow-sm"
              />
              <label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer shadow border border-white transition flex items-center justify-center">
                <FaCamera size={12} />
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageUpload} 
                />
              </label>
            </div>

            <h2 className="font-bold text-gray-900 text-xl">{user.name}</h2>
            <span className="text-[10px] font-extrabold bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full uppercase tracking-wider">{user.role}</span>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-4 border-t pt-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Edit Full Name</label>
              <div className="relative flex items-center">
                <FaUserEdit className="absolute left-3 text-gray-400 text-sm" />
                <input type="text" className="w-full border p-2.5 pl-10 rounded-xl text-sm outline-none focus:border-blue-500 font-semibold text-gray-700" required value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Email Address (Locked)</label>
              <div className="relative flex items-center">
                <FaLock className="absolute left-3 text-gray-300 text-xs" />
                <input type="text" className="w-full bg-gray-50 border p-2.5 pl-10 rounded-xl text-sm text-gray-400 outline-none cursor-not-allowed font-medium" disabled value={user.email} />
              </div>
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition text-sm shadow-sm cursor-pointer">
              Save Changes
            </button>
          </form>

          {/* 🚨 LOG OUT බටන් එක */}
          <button 
            onClick={handleLogout}
            className="w-full mt-4 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 py-3 rounded-xl font-bold text-sm transition duration-200 flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
          >
            <FaSignOutAlt />
            <span>Sign Out</span>
          </button>

        </div>

        {/* 📸 දකුණු පැත්ත: Pending Captures Review List (එහෙමම තැබුවා) */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center space-x-2">
            <FaClock className="text-amber-500 animate-pulse text-sm" /> 
            <span>My Pending Submissions ({pendingCaptures.length})</span>
          </h2>
          <p className="text-gray-400 text-xs mb-6">These photographs are currently under verification by the Flight Zone Admin Panel.</p>

          {loading ? (
            <div className="py-10 text-gray-500 font-medium">Checking hangar...</div>
          ) : pendingCaptures.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border text-center text-gray-400 font-medium shadow-sm">
              You have no pending submissions right now. Everything is cleared! ✈️✨
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {pendingCaptures.map((post) => (
                <div key={post._id} className="bg-white rounded-2xl overflow-hidden border shadow-sm flex flex-col justify-between opacity-85">
                  <div className="relative h-40 bg-gray-100">
                    <img src={post.images ? post.images[0] : post.image} alt="Capture" className="w-full h-full object-cover" />
                    <span className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1 shadow">
                      <FaClock /> <span>Pending Approval</span>
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 text-base truncate flex items-center space-x-1.5">
                      <FaPlane className="text-blue-500 transform -rotate-45 text-xs" />
                      <span>{post.title}</span>
                    </h3>
                    <div className="flex items-center text-xs text-gray-400 space-x-1 mt-1">
                      <FaMapMarkerAlt size={10} /> <span>{post.location}</span>
                    </div>
                    <div className="mt-3 border-t pt-2 text-[11px] text-gray-400 italic">
                      ℹ️ Submissions cannot be edited while pending review.
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}