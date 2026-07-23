import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken, setUser } = useContext(AuthContext);
  
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userData = {
      'username': username,
      'email': email,
      'password': password
    };
    
    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      
      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
        setUser(data.user);
        navigate('/home');
      }
    } catch (error) {
      console.error('Register error: ', error);
    }
  }
  
  return (
    <div className="min-h-svh flex justify-center items-center">
      <form onSubmit={handleSubmit} className="p-6 rounded-lg shadow-sm bg-white space-y-2 max-w-xl">
        <p className="text-4xl text-zinc-900 font-bold text-center">Register</p>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="p-2 w-full rounded-lg border-2 border-zinc-800" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="p-2 w-full rounded-lg border-2 border-zinc-800" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="p-2 w-full rounded-lg border-2 border-zinc-800" />
        <div className="flex justify-center items-center">
          <button type="submit" className="bg-blue-600 px-4 py-2 text-gray-100 rounded-lg">Register</button>
        </div>
      </form>
    </div>
  );
}