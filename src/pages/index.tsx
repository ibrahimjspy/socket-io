import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:3001', { autoConnect: false });

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputData, setInputData] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [progressUpdates, setProgressUpdates] = useState([]);

  const handleInputChange = (e) => {
    setInputData(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    try {
      const parsedData = JSON.parse(inputData);
      setIsLoading(true);

      axios.post("http://localhost:8080/video/generation/framework/script", parsedData)
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
      setProgressUpdates(prevUpdates => {
        let updates = [...prevUpdates, data.message];
        if (updates.length > 7) {
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
            <li key={index} style={{ backgroundColor: '#eae7ff', padding: '10px', marginBottom: '5px', borderRadius: '4px', transition: 'transform 0.3s', cursor: 'pointer' }}
                onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={e => e.target.style.transform = 'scale(1)'}>
              {update}
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
        `}
      </style>
    </div>
  );
}
