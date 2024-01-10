import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'antd';
import { User } from './mappers';

interface UserInfo {
  id: number;
  name: string;
  username: string;
  email: string;
  address: string;
  city: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
  // Add other properties as needed
}

interface InfoProps {
  userId: number;
  onBack: () => void;
}

const Info: React.FC<InfoProps> = (props) => {
  const { userId, onBack } = props;
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

  const columns = [
    {
      title: `User ID${userId}`,
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: UserInfo) => (
        <>
          <p>Name: {record.name}</p>
          <p>User Name: {record.username}</p>
          <p>Email: {record.email}</p>
          <p>Address: {record.address}</p>
          <p>City: {record.city}</p>
          <p>Phone: {record.phone}</p>
          <p>Website: {record.website}</p>
          <p>Company Name: {record.company.name}</p>
        </>
      ),
    },
    // Add other columns as needed
  ];

  return (
    <div>
      {isLoading ? (
        <p>Loading user information...</p>
      ) : user ? (
        <div className='border-3'>
          <Table
            bordered
            columns={columns}
            dataSource={[user]} // Wrap user in an array to display a single row in the table
            pagination={false}
          />
          {/* Add other user information as needed */}
        </div>
      ) : (
        <p>No user information available</p>
      )}
    </div>
  );
};

export default Info;
