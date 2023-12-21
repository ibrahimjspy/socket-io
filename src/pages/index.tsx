import { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001', { autoConnect: false });

export default function Home() {
  useEffect(() => {
    socket.connect();
  
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });
    socket.onAny((event, ...args) => {
      console.log(event, args);
    })
    socket.on('progressUpdate', (data) => {
      console.log('Progress Update:', data);
    });
  
    // Cleanup function
    return () => {
      socket.off('connect');
      socket.off('progressUpdate');
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Next.js WebSocket Demo</h1>
      {/* Your UI components go here */}
    </div>
  );
}
