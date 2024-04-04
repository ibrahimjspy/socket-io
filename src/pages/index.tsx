import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { initializeApp} from "firebase/app";
import firebase from 'firebase/compat/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const socket = io('http://localhost:3001/', { autoConnect: false });

export default function Home() {
  const [videoUrl, setVideoUrl] = useState('');
  const [progressUpdates, setProgressUpdates] = useState([]);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaCI5z6DkyHNfUtwSi2Yji4HotobYhRDU",
  authDomain: "test-notification-30dcf.firebaseapp.com",
  projectId: "test-notification-30dcf",
  storageBucket: "test-notification-30dcf.appspot.com",
  messagingSenderId: "71181934722",
  appId: "1:71181934722:web:d530335cf6dc100ef5949b"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);


  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('messages', (data) => {
      console.log('Chat message', data);
    });

    return () => {
      socket.off('connect');
      socket.off('message');
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then(function(registration) {
          console.log('Service worker registration succeeded:', registration);
        })
        .catch(function(error) {
          console.log('Service worker registration failed:', error);
        });
    }
    const messaging = getMessaging(app);

    // Request permission for push notifications
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
        // Get Firebase Messaging instance
  
        console.log(messaging)
        // Get the browser token for Firebase Cloud Messaging
        getToken(messaging, { vapidKey: 'BO2xehHzcqok6lvq4f8eKSbegUJ1JjcejfB1M0VE-RCehbXgxUtadrkxGViClfXuHexgnu0ZoKs2CBGmBKpMX0M' }).then((token) => {
          if (token) {
            // Use the token for sending push notifications
            console.log("Firebase token:", token);
          } else {
            console.log("No token received");
          }
        }).catch((error) => {
          console.error("Error getting token:", error);
        });
      }
    });

    console.log('in messeging')
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      
      // Check if browser supports notifications
      if (!("Notification" in window)) {
        alert("This browser does not support system notifications");
        return;
      }
    
      // Check whether notification permissions have already been granted
      if (Notification.permission === "granted") {
        // If it's okay, let's create a notification
        console.log('Notification received from firebase')

        showNotification(payload);
      }
      // Otherwise, we need to ask the user for permission
      else if (Notification.permission !== "denied") {
        console.log('no permission to show messafe')
        Notification.requestPermission().then(permission => {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
            showNotification(payload);
          }
        });
      }
      // At last, if the user has denied notifications, and you 
      // want to be respectful there is no need to bother them any more.
    });
    
    function showNotification(payload:any) {
      const notificationTitle = payload.notification.title;
      const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon, // Optional: you can provide an icon URL
        // You can add more options here. For more options, see:
        // https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification
      };
    
      new Notification(notificationTitle, notificationOptions);
      alert(payload.notification.body)
    }
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: '#f3f3f3' }}>
          <div className="ball small" style={{ top: '10%', left: '20%' }}></div>
          <div className="ball small" style={{ top: '90%', left: '5%' }}></div>
          <div className="ball small" style={{ top: '30%', left: '30%' }}></div>
          <div className="ball medium" style={{ top: '50%', left: '80%' }}></div>
          <div className="ball medium" style={{ top: '90%', left: '90%' }}></div>

          <div className="ball large" style={{ top: '70%', left: '10%' }}></div>
      <h1 style={{ color: '#5d3fd3', textAlign: 'center', marginBottom: '30px', animation: 'fadeIn 1s' }}>Notification demo</h1>
      
      <div style={{ marginTop: '20px', width: '50%', minWidth: '300px', animation: 'fadeIn 2s' }}>
  <h2 style={{ color: '#90EE90', textAlign: 'center', marginBottom: '30px' }}>Notification Updates</h2>
  <ul style={{ listStyleType: 'none', padding: 0 }}>
    {/* {progressUpdates.map((update: any, index) => (
      <li key={index} style={{ display: 'flex', alignItems: 'center', backgroundColor: '#eae7ff', padding: '10px', marginBottom: '5px', borderRadius: '4px', transition: 'transform 0.3s' }}
          onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={e => e.target.style.transform = 'scale(1)'}>
        {`${update.message}`} 
      </li>
    ))} */}
  </ul>
  {videoUrl && <div style={{ marginTop: '20px', textAlign: 'center', backgroundColor: '#e8f5e9', padding: '10px', borderRadius: '4px' }}>
        <p style={{ fontWeight: 'bold', color: '#2e7d32' }}>Video Generated:</p>
        <a href={videoUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#388e3c', textDecoration: 'none', fontWeight: 'bold' }}>{videoUrl}</a>
      </div>}
</div>

      <style jsx global>
        
        {`
          body {
            margin: 0;
            padding: 0;
            overscroll-behavior: none;
            background-color: #fafafa;
            background: linear-gradient(135deg, #9c8cb9 0%, #76a5af 100%);
          }

          /* Custom Scrollbar Styling */
          ::-webkit-scrollbar {
            width: 8px;
          }

          ::-webkit-scrollbar-track {
            background: #f1f1f1;
          }

          ::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: #555;
          }

          /* Enhance animations and transitions */
          .loader,
          textarea,
          button,
          li {
            transition: all 0.3s ease;
          }

          /* Hover effects for interactive elements */
          button:hover {
            background-color: #4c2fb9;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          li:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          /* Click effects for button */
          button:active {
            transform: scale(0.98); /* Slightly shrink the button when clicked */
            opacity: 0.9;
          }
      
          /* Improved spacing and visual effects */
          textarea {
            margin-bottom: 20px; /* More space below textarea */
          }
      
          .loader {
            margin-top: 20px; /* Space above loader */
          }
          /* Ball animations */
          @keyframes floatAnimation {
            0% {
              transform: translateY(0) scale(1);
            }
            50% {
              transform: translateY(-20vh) scale(1.2);
            }
            100% {
              transform: translateY(0) scale(1);
            }
          }
          
          /* Ball styles */
          .ball {
            position: absolute;
            border-radius: 50%;
            opacity: 0.7;
            background-color: #a890d3; /* Lighter purple */
            animation: floatAnimation ease-in-out infinite;
          }
          
          /* Different sizes and animation durations for balls */
          .ball.small {
            width: 20px;
            height: 20px;
            animation-duration: 5s;
          }
          
          .ball.medium {
            width: 30px;
            height: 30px;
            animation-duration: 7s;
          }
          
          .ball.large {
            width: 40px;
            height: 40px;
            animation-duration: 10s;
          }

          .loader {
            border: 5px solid #f3f3f3; /* Light grey border */
            border-top: 5px solid #8a2be2; /* Purplish color for the top border */
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 2s linear infinite;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
