import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 💡 http:// සහ අන්තිම / කෑල්ල නැතිව පිරිසිදු Client ID එක පමණක් ඇතුළත් කළා */}
    <GoogleOAuthProvider clientId="814676699984-9tks7v787362j88ega869ko8ppjhpk8t.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)