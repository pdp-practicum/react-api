import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface UserInfo {
  id: number;
  name: string;

}

interface InfoProps {
  userId: number;
  onBack: () => void
}

const Info: React.FC<InfoProps> = (props) => {
  const { userId } = props;
  const { onBack } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { data }: any = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
        setUser(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching user info:', err);
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, [userId]);

  return (
    <div>
      {isLoading ? (
        <p>Loading user information...</p>
      ) : user ? (
        <div>
          <h1 onClick={()=>{
           onBack()
          }}>User ID: {userId}</h1>
          <p>Name: {user.name}</p>
          {/* Add other user information as needed */}
        </div>
      ) : (
        <p>No user information available</p>
      )}
    </div>
  );
};

export default Info;