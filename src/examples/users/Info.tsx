import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'antd';
import { CaretLeftOutlined } from '@ant-design/icons';

interface UserInfo {
  id: number;
  name: string;
  isLoading: boolean;
  username: string;
  email: string;
  address: {
  city: string;
  };
  phone: string;
  website: string;
  company: {
    name: string;
  };
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
      setIsLoading(true);
      await new Promise((res) => setTimeout(() => res(20), 500));

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
      title: 'Attribute',
      dataIndex: 'attribute',
      key: 'attribute',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  const dataSource = [
    { key: '1', attribute: 'Name', value: user?.name },
    { key: '2', attribute: 'User Name', value: user?.username },
    { key: '3', attribute: 'Email', value: user?.email },
    { key: '4', attribute: 'City', value: user?.address.city },
    { key: '5', attribute: 'Phone', value: user?.phone },
    { key: '6', attribute: 'Website', value: user?.website },
    { key: '7', attribute: 'Company Name', value: user?.company.name },
  ];

  return (
    <div>
      {isLoading ? (
        <p>Loading user information...</p>
      ) : user ? (
        <div className="">
          <Button size="large" type="primary" icon={<CaretLeftOutlined />} onClick={onBack}>
            Next {userId}
          </Button>
          <Table dataSource={dataSource} columns={columns} pagination={false} />
        </div>
      ) : (
        <p>No user information available</p>
      )}
    </div>
  );
};

export default Info;