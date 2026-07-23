import { useContext } from 'react';
import { AuthContext } from '../components/AuthContext';

export default function Home() {
  const { token, user } = useContext(AuthContext);
  
  return (
    <div>
      <p>Hello {user?.username}!</p>
      <p>Your token is {token}.</p>
    </div>
  );
}