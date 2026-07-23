import React, { useState } from 'react';

export default function Chat({ user, token, onLogout }) {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'System', text: 'Welcome to the real-time chat room!' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setMessages([...messages, { id: Date.now(), sender: user.name, text: inputMessage }]);
    setInputMessage('');
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
    } catch (err) {
      console.error('Logout error', err);
    }
    onLogout();
  };

  return (
    <div style={{ maxWidth: '600px', margin: '30px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
        <h2>Chat Room (Logged in as: {user.name})</h2>
        <button onClick={handleLogout} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
      </div>
      <div style={{ height: '300px', border: '1px solid #ddd', margin: '15px 0', padding: '10px', overflowY: 'scroll', backgroundColor: '#f9f9f9' }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ marginBottom: '8px' }}>
            <strong>{msg.sender}: </strong> {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          value={inputMessage} 
          onChange={(e) => setInputMessage(e.target.value)} 
          placeholder="Type a message..." 
          style={{ flex: 1, padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 15px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Send</button>
      </form>
    </div>
  );
}
