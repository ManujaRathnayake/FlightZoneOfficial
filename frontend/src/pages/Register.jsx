import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const navigate = useNavigate();

  // 📷 පින්තූරය කුඩා කරලා Base64 බවට හරවන ඔයාගේ සුපිරි කෝඩ් එක (Canvas Compression)
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
          const MAX_WIDTH = 150;
          const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7); // 70% Quality
          setProfilePic(compressedBase64);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  // 📧 සාමාන්‍යයෙන් Register වන Function එක
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, profilePic })
      });
      const data = await res.json();
      if (res.ok) {
        alert('Account created successfully! Welcome onboard.');
        navigate('/login');
      } else { 
        alert(data.message || 'Registration failed.'); 
      }
    } catch (err) { 
      console.error(err); 
    }
  };

  // 🌐 ගූගල් හරහා ක්ෂණිකව Register (Sign Up) වන ලොජික් එක
  const handleGoogleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;

    try {
      const res = await fetch('http://localhost:5000/api/auth/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });
      
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/my-profile');
        window.location.reload();
      } else {
        alert("Google Registration failed on server.");
      }
    } catch (err) {
      console.error("Google Register Error:", err);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Create Account</h2>
        
        {/* සාමාන්‍ය රෙජිස්ටර් ෆෝම් එක */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Full Name</label>
            <input type="text" className="w-full border border-gray-200 p-3 rounded-xl focus:border-blue-500 outline-none text-sm font-semibold text-gray-700" required value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Email Address</label>
            <input type="email" className="w-full border border-gray-200 p-3 rounded-xl focus:border-blue-500 outline-none text-sm font-semibold text-gray-700" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Password</label>
            <input type="password" className="w-full border border-gray-200 p-3 rounded-xl focus:border-blue-500 outline-none text-sm" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Upload Profile Picture</label>
            <div className="flex items-center space-x-4 mt-1">
              {profilePic && (
                <img src={profilePic} alt="Preview" className="w-12 h-12 rounded-full object-cover border border-blue-500" />
              )}
              <input type="file" accept="image/*" className="w-full text-xs text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" required={!profilePic} onChange={handleImageUpload} />
            </div>
          </div>
          
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-bold mt-6 transition shadow-md cursor-pointer">
            Register
          </button>
        </form>

        {/* ──────── OR Separator ──────── */}
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-xs font-bold uppercase">or</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* 👑 Google Sign-Up Button */}
        <div className="flex justify-center w-full">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => console.log('Google Sign-Up Failed')}
            theme="filled_blue"
            shape="circle"
            text="signup_with"
          />
        </div>

        <p className="text-sm text-gray-500 text-center mt-4">Already registered? <Link to="/login" className="text-blue-600 hover:underline">Sign In</Link></p>
      </div>
    </div>
  );
}