import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheck, FaTrash, FaClock, FaUsers, FaInbox, FaUserShield, FaCamera, FaEye, FaTimes, FaMapMarkerAlt, FaInstagram, FaSearch, FaPlane, FaPlus, FaEdit } from 'react-icons/fa';

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState([]);
  const [users, setUsers] = useState([]);
  const [spotters, setSpotters] = useState([]);
  const [aircrafts, setAircrafts] = useState([]); // 👑 Global Aircraft Directory Data State
  const [activeTab, setActiveTab] = useState('inquiries');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Preview Modal States
  const [selectedPost, setSelectedPost] = useState(null);
  const [previewImgIndex, setPreviewImgIndex] = useState(0);

  // CUSTOM TOAST STATES
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // GLOBAL SEARCH STATE
  const [searchTerm, setSearchTerm] = useState('');

  // 👑 AIRCRAFT CRUD & FORM STATES (ඩිරෙක්ටරි එක පාලනය කරන ස්ටේට්ස්)
  const [isEditing, setIsEditing] = useState(false);
  const [currentPlaneId, setCurrentPlaneId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    name: '', type: 'commercial', manufacturer: '', description: '',
    range: '', capacity: '', engines: '', wingspan: '', topSpeed: '', payload: ''
  });

  const showCustomToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3500);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser || JSON.parse(storedUser).role !== 'Admin') {
      alert("Access Denied!"); navigate('/'); return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const resInq = await fetch('https://flight-zone-official.vercel.app/api/inquiries');
      setInquiries(await resInq.json());

      const resUsers = await fetch('https://flight-zone-official.vercel.app/api/auth/users');
      setUsers(await resUsers.json());

      const resSpot = await fetch('https://flight-zone-official.vercel.app/api/spotters/all');
      setSpotters(await resSpot.json());

      // 👑 ඩිරෙක්ටරි එකේ ලයිව් යානා ටික බැක්එන්ඩ් එකෙන් ඇදලා ගන්නවා මචං
      const resAir = await fetch('https://flight-zone-official.vercel.app/api/aircrafts');
      setAircrafts(await resAir.json());

      setLoading(false);
    } catch (err) { console.error(err); setLoading(false); }
  };

  const handleApproveInquiry = async (id) => {
    await fetch(`https://flight-zone-official.vercel.app/api/inquiries/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'Approved' }) });
    showCustomToast("📝 Inquiry Approved Successfully!", "success");
    fetchData();
  };

  const handleDeleteInquiry = async (id) => {
    if (window.confirm('Delete?')) { 
      await fetch(`https://flight-zone-official.vercel.app/api/inquiries/${id}`, { method: 'DELETE' }); 
      showCustomToast("🗑️ Inquiry Deleted Successfully!", "warn");
      fetchData(); 
    }
  };

  // ROLE MANAGEMENT: MAKE ADMIN FUNCTION
  const handleMakeAdmin = async (userId, userName) => {
    const confirmAction = window.confirm(`Are you absolutely sure you want to promote "${userName}" to an Administrator?`);
    if (!confirmAction) return;

    const secretPassword = prompt(`Security Check: Enter Password to promote ${userName}:`);
    if (secretPassword === null) return;

    if (secretPassword === 'Harrypottersrilankanandemirates#1233') {
      try {
        const res = await fetch(`https://flight-zone-official.vercel.app/api/auth/users/${userId}/make-admin`, { method: 'PUT' });
        if (res.ok) {
          showCustomToast(`🎉 Success! ${userName} is now an Official Admin!`, "success");
          fetchData();
        } else {
          showCustomToast('Failed to update user role on server.', "error");
        }
      } catch (err) {
        console.error(err);
        showCustomToast('🌐 Server connection error.', "error");
      }
    } else {
      showCustomToast('🔒 Wrong Password! Access Denied.', "error");
    }
  };

  const handleApproveSpotter = async (id) => {
    await fetch(`https://flight-zone-official.vercel.app/api/spotters/${id}/approve`, { method: 'PUT' });
    showCustomToast('✈️ Capture Approved Live on Flight Zone!', "success");
    setSelectedPost(null);
    fetchData();
  };

  const handleDeleteSpotter = async (id) => {
    if (window.confirm('Delete this capture?')) {
      await fetch(`https://flight-zone-official.vercel.app/api/spotters/${id}`, { method: 'DELETE' });
      showCustomToast('🗑️ Capture Deleted Successfully!', "warn");
      setSelectedPost(null);
      fetchData();
    }
  };

  // 👑 AIRCRAFT SUBMIT: ADD / EDIT LOGIC WITH AUTO CLOUDINARY FILE UPLOAD
  const handleAircraftSubmit = async (e) => {
    e.preventDefault();
    showCustomToast("⏳ Syncing with Cloudinary CDN... Please wait.", "warn");

    // File එකක් සහ Text Fields එකට බැක්එන්ඩ් යවන්න FormData එකක් හදනවා බං
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (imageFile) data.append('image', imageFile); // පින්තූරය යන්නේ මෙතනින් 📸

    const url = isEditing 
      ? `https://flight-zone-official.vercel.app/api/aircrafts/edit/${currentPlaneId}`
      : 'https://flight-zone-official.vercel.app/api/aircrafts/add';

    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, { method, body: data });
      if (res.ok) {
        showCustomToast(isEditing ? "✏️ Aircraft Specification Updated!" : "🎉 New Aircraft Asset Deployed with Cloudinary Link!", "success");
        // Form එක Reset කරනවා
        setFormData({ name: '', type: 'commercial', manufacturer: '', description: '', range: '', capacity: '', engines: '', wingspan: '', topSpeed: '', payload: '' });
        setImageFile(null);
        setIsEditing(false);
        fetchData();
      } else {
        showCustomToast("Server rejected the request.", "error");
      }
    } catch (err) {
      console.error(err);
      showCustomToast("🌐 Connection to server failed.", "error");
    }
  };

  // 👑 DELETE AIRCRAFT FROM DIRECTORY
  const handleDeleteAircraft = async (id) => {
    if (window.confirm("Are you sure you want to permanently delete this aircraft from Global Directory?")) {
      await fetch(`https://flight-zone-official.vercel.app/api/aircrafts/${id}`, { method: 'DELETE' });
      showCustomToast("🗑️ Aircraft Removed Successfully!", "warn");
      fetchData();
    }
  };

  // 👑 EDIT CLICK: FILL FORM LOGIC
  const startEdit = (plane) => {
    setIsEditing(true);
    setCurrentPlaneId(plane._id);
    setFormData({
      name: plane.name, type: plane.type, manufacturer: plane.manufacturer, description: plane.description,
      range: plane.specs.range || '', capacity: plane.specs.capacity || '', engines: plane.specs.engines || '', wingspan: plane.specs.wingspan || '',
      topSpeed: plane.specs.topSpeed || '', payload: plane.specs.payload || ''
    });
    // ෆෝම් එක තියෙන උඩ හරියට ස්ක්‍රෝල් කරනවා ලේසි වෙන්න
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  // 👑 GLOBAL SEARCH FILTERING LOGIC (ටැබ් 4ටම බෙදා හැරීම)
  const query = searchTerm.toLowerCase();

  const filteredInquiries = inquiries.filter(item => {
    return (item.name && item.name.toLowerCase().includes(query)) || (item.email && item.email.toLowerCase().includes(query));
  });

  const filteredUsers = users.filter(user => {
    return (user.name && user.name.toLowerCase().includes(query)) || (user.email && user.email.toLowerCase().includes(query));
  });

  const filteredSpotters = spotters.filter(post => {
    return (post.userName && post.userName.toLowerCase().includes(query)) || (post.title && post.title.toLowerCase().includes(query));
  });

  // 👑 4 වෙනි ටැබ් එකේ සර්ච් ලොජික් එක (නම හෝ මැනුෆැක්චරර් අනුව)
  const filteredAircrafts = aircrafts.filter(p => {
    return (p.name && p.name.toLowerCase().includes(query)) || (p.manufacturer && p.manufacturer.toLowerCase().includes(query));
  });

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 md:px-8 relative overflow-x-hidden">
      
      {/* CUSTOM TOAST NOTIFICATION BOX */}
      {toast.show && (
        <div className="fixed top-5 right-5 z-[9999] max-w-sm w-full transition-all duration-500 ease-in-out">
          <div className={`p-4 rounded-2xl shadow-2xl border flex items-center justify-between text-white font-bold backdrop-blur-md ${
            toast.type === 'success' ? 'bg-emerald-600 border-emerald-500' :
            toast.type === 'warn' ? 'bg-amber-500 border-amber-400' : 'bg-red-600 border-red-500'
          }`}>
            <div className="flex items-center space-x-3">
              <span className="text-xl">{toast.type === 'success' ? '✅' : toast.type === 'warn' ? '⚠️' : '❌'}</span>
              <p className="text-sm tracking-wide font-sans">{toast.message}</p>
            </div>
            <button onClick={() => setToast({ show: false, message: '', type: 'success' })} className="text-white/70 hover:text-white ml-4"><FaTimes size={16} /></button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Flight Zone HQ</h1>

        {/* Controls Layout Container */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          
          {/* Tabs Control Buttons */}
          <div className="flex flex-wrap gap-2 md:gap-4">
            <button onClick={() => setActiveTab('inquiries')} className={`px-5 py-3 font-semibold rounded-xl flex items-center space-x-2 transition ${activeTab === 'inquiries' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-600'}`}><FaInbox /> <span>Inquiries ({inquiries.length})</span></button>
            <button onClick={() => setActiveTab('users')} className={`px-5 py-3 font-semibold rounded-xl flex items-center space-x-2 transition ${activeTab === 'users' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-600'}`}><FaUsers /> <span>Users ({users.length})</span></button>
            <button onClick={() => setActiveTab('spotters')} className={`px-5 py-3 font-semibold rounded-xl flex items-center space-x-2 transition ${activeTab === 'spotters' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-600'}`}><FaCamera /> <span>Spotters ({spotters.length})</span></button>
            
            {/* 👑 අලුතින් එකතු කරපු 4 වෙනි ටැබ් බටන් එක */}
            <button onClick={() => { setActiveTab('directory'); setSearchTerm(''); }} className={`px-5 py-3 font-semibold rounded-xl flex items-center space-x-2 transition ${activeTab === 'directory' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-600'}`}><FaPlane /> <span>Manage Directory ({aircrafts.length})</span></button>
          </div>

          {/* GLOBAL SEARCH BAR */}
          <div className="relative w-full max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
              <FaSearch />
            </span>
            <input 
              type="text" 
              placeholder={`Search in ${activeTab}... (Name or Email)`} 
              className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-blue-500 transition text-sm shadow-sm font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600">
                <FaTimes size={14} />
              </button>
            )}
          </div>

        </div>

        {loading ? <div className="text-center py-10 font-semibold text-gray-500">Loading HQ Console...</div> : (
          <div>
            {/* TAB 1: INQUIRIES */}
            {activeTab === 'inquiries' && (
              <div className="bg-white rounded-2xl border overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <tbody className="divide-y text-sm">
                    {filteredInquiries.length === 0 ? (
                      <tr><td colSpan="4" className="p-10 text-center text-gray-400 font-medium">No inquiries found matching "{searchTerm}"</td></tr>
                    ) : (
                      filteredInquiries.map(item => (
                        <tr key={item._id} className="hover:bg-gray-50"><td className="p-4 font-bold">{item.name}<br/><span className="text-xs text-gray-400">{item.email}</span></td><td className="p-4"><b>{item.subject}</b><p className="text-xs text-gray-500">{item.message}</p></td><td className="p-4"><span className={`px-2.5 py-1 rounded-full text-xs font-bold ${item.status === 'Approved' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>{item.status}</span></td><td className="p-4 text-center">{item.status === 'Pending' && <button onClick={() => handleApproveInquiry(item._id)} className="bg-green-600 text-white text-xs font-bold px-3 py-2 rounded-xl mr-2">Approve</button>}<button onClick={() => handleDeleteInquiry(item._id)} className="text-red-600 font-bold">Delete</button></td></tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB 2: USERS */}
            {activeTab === 'users' && (
              <div className="bg-white rounded-2xl border overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <tbody className="divide-y text-sm">
                    {filteredUsers.length === 0 ? (
                      <tr><td colSpan="4" className="p-10 text-center text-gray-400 font-medium">No users found matching "{searchTerm}"</td></tr>
                    ) : (
                      filteredUsers.map(member => (
                        <tr key={member._id} className="hover:bg-gray-50">
                          <td className="p-4 font-bold flex items-center space-x-2">
                            <img src={member.profilePic || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=40"} className="w-8 h-8 rounded-full object-cover" alt="" /> 
                            <span>{member.name}</span>
                          </td>
                          <td className="p-4 text-gray-500">{member.email}</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${member.role === 'Admin' ? 'bg-amber-100 text-amber-800' : 'bg-blue-50 text-blue-700'}`}>
                              {member.role || 'User'}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            {member.role !== 'Admin' ? (
                              <button 
                                onClick={() => handleMakeAdmin(member._id, member.name)} 
                                className="bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-bold px-3 py-2 rounded-xl transition"
                              >
                                Make Admin
                              </button>
                            ) : (
                              <span className="text-xs font-bold text-gray-400">🛡️ Main Admin</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB 3: SPOTTERS SUBMISSIONS */}
            {activeTab === 'spotters' && (
              <div className="bg-white rounded-2xl border overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead><tr className="bg-gray-50 border-b text-xs text-gray-400 font-bold uppercase"><th className="p-4">Main Photo</th><th className="p-4">Details</th><th className="p-4">Status</th><th className="p-4 text-center">Actions</th></tr></thead>
                  <tbody className="divide-y text-sm text-gray-600">
                    {filteredSpotters.length === 0 ? (
                      <tr><td colSpan="4" className="p-10 text-center text-gray-400 font-medium">No submissions found matching "{searchTerm}"</td></tr>
                    ) : (
                      filteredSpotters.map(post => {
                        const postImages = post.images && post.images.length > 0 ? post.images : [post.image];
                        return (
                          <tr key={post._id} className="hover:bg-gray-50">
                            <td className="p-4"><img src={postImages[0]} alt="Preview" className="w-20 h-14 object-cover rounded-lg border bg-gray-100" /></td>
                            <td className="p-4">
                              <div className="font-bold text-gray-900">{post.title}</div>
                              <div className="text-xs text-gray-400">📍 {post.location.split(' - ')[0]} | By: <b>{post.userName}</b></div>
                              <div className="text-[10px] text-blue-600 font-bold mt-0.5">📦 Contains {postImages.length} Capture(s)</div>
                            </td>
                            <td className="p-4"><span className={`px-2.5 py-1 rounded-full text-xs font-bold ${post.status === 'Approved' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>{post.status}</span></td>
                            <td className="p-4 text-center whitespace-nowrap">
                              <div className="flex justify-center space-x-2">
                                <button 
                                  onClick={() => { setSelectedPost(post); setPreviewImgIndex(0); }}
                                  className="bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-bold px-3 py-2 rounded-xl flex items-center space-x-1 transition"
                                >
                                  <FaEye /> <span>Preview</span>
                                </button>
                                {post.status === 'Pending' && <button onClick={() => handleApproveSpotter(post._id)} className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center space-x-1 transition"><FaCheck /> <span>Approve</span></button>}
                                <button onClick={() => handleDeleteSpotter(post._id)} className="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold px-3 py-2 rounded-xl flex items-center space-x-1 transition"><FaTrash /> <span>Delete</span></button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* 👑 TAB 4: DIRECTORY MANAGEMENT (ADD / EDIT / DELETE WITH DYNAMIC INTERFACE) */}
            {activeTab === 'directory' && (
              <div className="grid lg:grid-cols-3 gap-8">
                
                {/* 📝 LEFT ROW: DYNAMIC SPECIFICATIONS UPLOAD FORM */}
                <div className="bg-white p-6 rounded-2xl border shadow-sm h-fit">
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                    {isEditing ? <><FaEdit className="text-amber-500"/><span>Edit Aircraft Specs</span></> : <><FaPlus className="text-emerald-500"/><span>Add New Fleet Asset</span></>}
                  </h2>
                  <form onSubmit={handleAircraftSubmit} className="space-y-4 text-sm font-medium">
                    <div>
                      <label className="text-xs text-gray-400 uppercase">Aircraft Model Name</label>
                      <input type="text" className="w-full border p-2.5 rounded-xl mt-1 focus:outline-blue-500 text-gray-800" placeholder="e.g. Airbus A350-1000" required value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-400 uppercase">Category</label>
                        <select className="w-full border p-2.5 rounded-xl mt-1 text-gray-800 font-semibold" value={formData.type} onChange={(e)=>setFormData({...formData, type: e.target.value})}>
                          <option value="commercial">Commercial</option>
                          <option value="military">Military</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 uppercase">Manufacturer</label>
                        <input type="text" className="w-full border p-2.5 rounded-xl mt-1 text-gray-800" placeholder="e.g. Airbus" required value={formData.manufacturer} onChange={(e)=>setFormData({...formData, manufacturer: e.target.value})} />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-gray-400 uppercase">Description</label>
                      <textarea rows="3" className="w-full border p-2.5 rounded-xl mt-1 text-gray-800" placeholder="Write summary about aircraft specifications..." required value={formData.description} onChange={(e)=>setFormData({...formData, description: e.target.value})}></textarea>
                    </div>
                    
                    {/* Technical Specification Grids */}
                    <div className="bg-gray-50 p-4 rounded-xl border border-dashed border-gray-200 space-y-3">
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">Technical Specs Matrix</span>
                      <div className="grid grid-cols-2 gap-3 text-xs text-gray-800">
                        <div><span className="text-[10px] text-gray-400 block uppercase">Flight Range</span><input type="text" placeholder="16,100 km" className="border p-2 rounded-lg w-full mt-0.5" value={formData.range} onChange={(e)=>setFormData({...formData, range: e.target.value})} /></div>
                        <div><span className="text-[10px] text-gray-400 block uppercase">Seat Capacity</span><input type="text" placeholder="350 seats" className="border p-2 rounded-lg w-full mt-0.5" value={formData.capacity} onChange={(e)=>setFormData({...formData, capacity: e.target.value})} /></div>
                        <div><span className="text-[10px] text-gray-400 block uppercase">Engines Setup</span><input type="text" placeholder="RR Trent XWB" className="border p-2 rounded-lg w-full mt-0.5" value={formData.engines} onChange={(e)=>setFormData({...formData, engines: e.target.value})} /></div>
                        <div><span className="text-[10px] text-gray-400 block uppercase">Wingspan Dimension</span><input type="text" placeholder="64.75 m" className="border p-2 rounded-lg w-full mt-0.5" value={formData.wingspan} onChange={(e)=>setFormData({...formData, wingspan: e.target.value})} /></div>
                        <div><span className="text-[10px] text-gray-400 block uppercase">Top Speed</span><input type="text" placeholder="Mach 0.89" className="border p-2 rounded-lg w-full mt-0.5" value={formData.topSpeed} onChange={(e)=>setFormData({...formData, topSpeed: e.target.value})} /></div>
                        <div><span className="text-[10px] text-gray-400 block uppercase">Payload Limit</span><input type="text" placeholder="18,000 lbs" className="border p-2 rounded-lg w-full mt-0.5" value={formData.payload} onChange={(e)=>setFormData({...formData, payload: e.target.value})} /></div>
                      </div>
                    </div>

                    {/* IMAGE FILE CAPTURE SELECTOR */}
                    <div>
                      <label className="text-xs text-gray-400 uppercase block">Aircraft Capture File</label>
                      <input type="file" accept="image/*" className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mt-2 cursor-pointer" required={!isEditing} onChange={(e)=>setImageFile(e.target.files[0])} />
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold shadow-md hover:bg-blue-700 transition">Save Changes</button>
                      {isEditing && (
                        <button type="button" onClick={() => { setIsEditing(false); setFormData({ name: '', type: 'commercial', manufacturer: '', description: '', range: '', capacity: '', engines: '', wingspan: '', topSpeed: '', payload: '' }); setImageFile(null); }} className="bg-gray-200 text-gray-600 px-4 rounded-xl font-bold">Cancel</button>
                      )}
                    </div>
                  </form>
                </div>

                {/* 📊 RIGHT ROW: LIVE INTERACTIVE MANAGEMENT DATA LIST */}
                <div className="lg:col-span-2 bg-white rounded-2xl border overflow-hidden shadow-sm h-[75vh] overflow-y-auto">
                  <table className="w-full text-left">
                    <tbody className="divide-y text-sm">
                      {filteredAircrafts.length === 0 ? (
                        <tr><td colSpan="3" className="p-10 text-center text-gray-400 font-medium">No fleet items matching "{searchTerm}"</td></tr>
                      ) : (
                        filteredAircrafts.map(plane => (
                          <tr key={plane._id} className="hover:bg-gray-50/70 transition">
                            <td className="p-4 w-24"><img src={plane.image} className="w-20 h-14 object-cover rounded-lg border bg-gray-100" alt="Plane" /></td>
                            <td className="p-4">
                              <div className="font-bold text-gray-900 text-base">{plane.name}</div>
                              <div className="text-xs text-gray-400 mt-0.5">Mfg: <b className="text-gray-600">{plane.manufacturer}</b> | Type: <span className="uppercase font-black text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md ml-1">{plane.type}</span></div>
                            </td>
                            <td className="p-4 text-right whitespace-nowrap">
                              <button onClick={() => startEdit(plane)} className="text-blue-600 bg-blue-50 hover:bg-blue-100 font-black px-3 py-2 rounded-xl mr-2 text-xs transition">Edit</button>
                              <button onClick={() => handleDeleteAircraft(plane._id)} className="text-red-600 bg-red-50 hover:bg-red-100 font-black px-3 py-2 rounded-xl text-xs transition">Delete</button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

              </div>
            )}
          </div>
        )}
      </div>

      {/* LIVE INTERACTIVE PREVIEW MODAL */}
      {selectedPost && (() => {
        const modalImages = selectedPost.images && selectedPost.images.length > 0 ? selectedPost.images : [selectedPost.image];
        return (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border flex flex-col md:flex-row max-h-[90vh] md:max-h-none">
              <div className="relative bg-gray-950 w-full md:w-3/5 h-64 md:h-96 flex items-center justify-center group">
                <img src={modalImages[previewImgIndex]} alt="Full Preview" className="w-full h-full object-contain select-none" />
                {modalImages.length > 1 && (
                  <>
                    <button onClick={() => setPreviewImgIndex(p => p === 0 ? modalImages.length - 1 : p - 1)} className="absolute left-2 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center text-xs hover:bg-black transition">❮</button>
                    <button onClick={() => setPreviewImgIndex(p => p === modalImages.length - 1 ? 0 : p + 1)} className="absolute right-2 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center text-xs hover:bg-black transition">❯</button>
                    <div className="absolute bottom-3 bg-black/40 px-3 py-1 rounded-full text-[10px] text-white font-bold tracking-widest">{previewImgIndex + 1} / {modalImages.length}</div>
                  </>
                )}
              </div>
              <div className="p-6 w-full md:w-2/5 flex flex-col justify-between bg-white border-t md:border-t-0 md:border-l">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${selectedPost.status === 'Approved' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>{selectedPost.status}</span>
                    <button onClick={() => setSelectedPost(null)} className="text-gray-400 hover:text-gray-600 transition"><FaTimes size={18} /></button>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 leading-tight mb-2">{selectedPost.title}</h2>
                  <div className="space-y-3 text-xs font-medium text-gray-500 border-t pt-3">
                    <div className="flex items-center space-x-1.5 text-gray-700"><FaMapMarkerAlt className="text-red-500" /> <span className="font-semibold">{selectedPost.location}</span></div>
                    <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Submitted By</div>
                      <div className="font-bold text-gray-800 text-sm mt-0.5">👤 {selectedPost.userName}</div>
                    </div>
                    {selectedPost.instagram && (
                      <a href={selectedPost.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center space-x-1 text-pink-600 hover:underline"><FaInstagram /> <span>View Instagram Profile</span></a>
                    )}
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t flex space-x-2">
                  {selectedPost.status === 'Pending' && <button onClick={() => handleApproveSpotter(selectedPost._id)} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center space-x-1.5 shadow-sm transition text-sm"><FaCheck /> <span>Approve Live</span></button>}
                  <button onClick={() => handleDeleteSpotter(selectedPost._id)} className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold py-3 px-4 rounded-xl flex items-center justify-center space-x-1.5 transition text-sm"><FaTrash /> <span>Delete</span></button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

    </div>
  );
}