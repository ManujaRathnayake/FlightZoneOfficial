import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // 1. 📧 සාමාන්‍ය ඊමේල්/පාස්වර්ඩ් ලොගින් ලොජික් එක
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://flight-zone-official.vercel.app/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        alert('Logged in successfully!');
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user)); // User Object එක සේව් කලා
        window.location.href = "/"; // සාර්ථක ලොගිනයෙන් පසු මුල් පිටුවට ගොස් Navbar එක Refresh කරයි
      } else { 
        alert(data.message); 
      }
    } catch (err) { 
      console.error(err); 
    }
  };

  // 2. 🌐 ගූගල් ලොගින් එක සාර්ථක වුණාම දුවන ලොජික් එක
  const handleGoogleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential; // ගූගල් එකෙන් ලැබෙන Token එක

    try {
      // 🔄 මේ ටෝකන් එක අපි බැක්එන්ඩ් (Node.js) එකට යවනවා ව්‍යුත්පන්න කරන්න
      const res = await fetch('https://flight-zone-official.vercel.app/api/auth/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });
      
      const data = await res.json();
      if (res.ok) {
        // ලොගින් එක සාර්ථක නම් යූසර්ව localStorage එකට දාලා Profile එකට යවනවා
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/my-profile');
        window.location.reload();
      } else {
        alert("Google Authentication failed on server.");
      }
    } catch (err) {
      console.error("Google Login Error:", err);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 px-4 py-12">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 animate-scale-up">
        <div className="text-center mb-6">
          <span className="inline-flex w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 items-center justify-center text-2xl mb-3">✈️</span>
          <h2 className="text-2xl font-extrabold text-gray-900">Flight Zone Club Login</h2>
          <p className="text-xs text-gray-400 mt-1">Welcome back, sign in to continue</p>
        </div>
        
        {/* සාමාන්‍ය ලොගින් ෆෝම් එක */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full border border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="mb-6">
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Password</label>
            <input 
              type="password" 
              className="w-full border border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-bold transition shadow-md hover:shadow-lg cursor-pointer">
            Sign In
          </button>
        </form>

        {/* ──────── OR Separator ──────── */}
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-xs font-bold uppercase">or</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* 👑 Google Login Button */}
        <div className="flex justify-center w-full">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => console.log('Login Failed')}
            theme="filled_blue"
            shape="circle"
          />
        </div>

        <p className="text-sm text-gray-500 text-center mt-6">
          Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
}