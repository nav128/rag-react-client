// sse that handles a single message until it is finished
import {  useEffect, useState } from 'react';

export default function useSseMessage(onComplete) {
  const [message, setMessage] = useState('');
  const [isComplete, setIsComplete] = useState(false); 
  const [error, setError] = useState(null);

  async function startListening(url) {
    setIsComplete(false);
    setMessage('');
    const eventSource = new EventSource(url);
        console.log("SSE listening to:", url);

        eventSource.onmessage = (event) => { 
          console.log("SSE event:", event.data);
          if (event.data === '[end]') {
            setIsComplete(true);
            eventSource.close();
            
          } else {
              setMessage(event.data);
            }
           }
        eventSource.onerror = (err) => {
            console.error("SSE error:", err);
            setError('Error receiving SSE message');
            setIsComplete(true);
            onComplete()
            eventSource.close();
        }
  }
  useEffect(() => {
    if (isComplete) {
        onComplete(message);
    }
  }, [isComplete]);

  return { message, startListening, isComplete, error };
}