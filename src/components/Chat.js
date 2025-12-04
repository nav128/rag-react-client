// ui component that will render a chat interface
import React, { useEffect, useRef } from 'react';
import useChat from '../hooks/useChat';
import { uploadFile } from '../service/fileService';
import './chat.css';

export default function Chat() {
  const {
    messages,
    currentMessage,
    setCurrentMessage,
    postMessage,
    isLoading,
    error,
    liveAnswer
  } = useChat();

  const lastMessageRef = useRef(null);
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    } }, [messages, isLoading]
);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle file upload logic here
      console.log('File selected:', file.name);
      uploadFile(file)
      // Reset input
      event.target.value = '';
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {/* masseages */}
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <span>{msg.content}</span>
            <div className="timestamp">{new Date(msg.timestamp).toLocaleString()}</div>
            </div>
        ))}
        {/* live answer */}
        {isLoading && (
          <div className="message assistant">
            <span>{liveAnswer.message}</span>
            <div className="typing-dots" aria-hidden style={{display: 'inline-block', marginLeft: 8}}>
                <style>{`
                    .typing-dots span {
                        display: inline-block;
                        width: 5px;
                        height: 5px;
                        margin: 0 3px;
                        background: currentColor;
                        border-radius: 50%;
                        animation: typing-bounce 1s infinite;
                        opacity: 0.4;
                    }
                    .typing-dots span:nth-child(1) { animation-delay: 0s; }
                    .typing-dots span:nth-child(2) { animation-delay: 0.15s; }
                    .typing-dots span:nth-child(3) { animation-delay: 0.3s; }
                    @keyframes typing-bounce {
                        0% { transform: translateY(0); opacity: 0.4; }
                        50% { transform: translateY(-6px); opacity: 1; }
                        100% { transform: translateY(0); opacity: 0.4; }
                    }
                `}</style>
                <span></span><span></span><span></span>
            </div>
          </div>
        )} 
        </div>
        {/* user input */}
        <div className="input-container">
            <textarea
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="Type your message..."
            />
            <button onClick={() => postMessage(currentMessage)} disabled={isLoading || !currentMessage.trim()}>
                Send
            </button>
            <input
              type="file"
              id="file-upload"
              accept=".txt,.md"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
            <button 
                title="Upload a file to provide context"
                onClick={() => document.getElementById('file-upload').click()}>
              Upload File
            </button>
        </div>
        {/* error display */}
        {error && <div className="error">{error}</div>}
    </div>
  );
}   
