// this chat hook will create a unique id on mount
// will hold the messages in state,
// will handle posting messages to the server, after successfully posting a message
// it will use the useSseMessage hook to listen for responses
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {response_endpoint} from '../service/chatService';
import useSseMessage from './useSseMessage';

export default function useChat() {
  const [chatId, setChatId] = useState(uuidv4());
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function addMessage(role, content) {
      setMessages((prev) => [...prev, { role, content ,"timestamp": new Date().toISOString()}]);
    }
    
    function handleSseComplete(message) {
        addMessage('assitant', message);
        setIsLoading(false);
    }
    const sseMessage = useSseMessage(handleSseComplete);
    
  function postMessage(content) {
    setIsLoading(true);
    setError(null); 
    addMessage('user', content);
    setCurrentMessage('');
    sseMessage.startListening(
        response_endpoint(chatId, content)
    ).catch((err) => {
            setError(err.message);
            setIsLoading(false);
            setCurrentMessage(content); // restore message
            
        });
}

    return { 
        chatId, 
        messages, 
        currentMessage, 
        setCurrentMessage, 
        postMessage, 
        isLoading,
        error,
        liveAnswer: sseMessage
    };
}
