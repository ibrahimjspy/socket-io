import { SetStateAction, useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://23.22.190.84:3000', { autoConnect: false });

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputData, setInputData] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [progressUpdates, setProgressUpdates] = useState([]);

  const handleInputChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setInputData(e.target.value);
  };

  const handleFormSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const parsedData = JSON.parse(inputData);
      setIsLoading(true);

      axios.post("http://23.22.190.84:3000/api/v1/ai/video/generate", parsedData)
        .then(response => {
          console.log(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error:', error);
          setIsLoading(false);
        });
    } catch (error) {
      console.error('Invalid JSON input:', error);
    }
  };

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('progressUpdate', (data) => {
      console.log('Progress Update:', data);
      if(data.url){
        setVideoUrl(data.url);
      }
      if(data.metadata){
        console.log(data.metadata);
        alert(data.metadata);
      }
      setProgressUpdates(prevUpdates => {
        let updates = [...prevUpdates, data.message];
        if (updates.length > 20) {
          updates = updates.slice(-7); // Keep only the last 7 updates
        }
        return updates;
      });
    });

    return () => {
      socket.off('connect');
      socket.off('progressUpdate');
      socket.disconnect();
    };
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: '#f3f3f3' }}>
          <div className="ball small" style={{ top: '10%', left: '20%' }}></div>
          <div className="ball small" style={{ top: '90%', left: '5%' }}></div>
          <div className="ball small" style={{ top: '30%', left: '30%' }}></div>
          <div className="ball medium" style={{ top: '50%', left: '80%' }}></div>
          <div className="ball medium" style={{ top: '90%', left: '90%' }}></div>

          <div className="ball large" style={{ top: '70%', left: '10%' }}></div>
      <h1 style={{ color: '#5d3fd3', textAlign: 'center', marginBottom: '30px', animation: 'fadeIn 1s' }}>AI video stitching demo</h1>
      <form onSubmit={handleFormSubmit} style={{ width: '50%', minWidth: '300px', animation: 'slideIn 1s' }}>
        <textarea 
          value={inputData} 
          onChange={handleInputChange} 
          placeholder="Enter JSON data here"
          rows={10}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        <button type="submit" style={{ width: '100%', padding: '10px 15px', backgroundColor: '#5d3fd3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s' }}
          onMouseOver={e => e.target.style.backgroundColor = '#4c2fb9'}
          onMouseOut={e => e.target.style.backgroundColor = '#5d3fd3'}>
          Start Video Generation
        </button>
      </form>
      {isLoading && <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <div className="loader"></div>
      </div>}
      
      <div style={{ marginTop: '20px', width: '50%', minWidth: '300px', animation: 'fadeIn 2s' }}>
  <h2 style={{ color: '#5d3fd3', textAlign: 'center' }}>Progress Updates</h2>
  <ul style={{ listStyleType: 'none', padding: 0 }}>
    {progressUpdates.map((update, index) => (
      <li key={index} style={{ display: 'flex', alignItems: 'center', backgroundColor: '#eae7ff', padding: '10px', marginBottom: '5px', borderRadius: '4px', transition: 'transform 0.3s' }}
          onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={e => e.target.style.transform = 'scale(1)'}>
        {update}
        {/* Show loader next to the last item */}
        {index === progressUpdates.length - 1 && !videoUrl && (
          <div className="loader" style={{ marginLeft: '500px', marginBottom:'20px' }}></div>
        )}
      </li>
    ))}
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
