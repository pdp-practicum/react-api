import React, { useState, useEffect } from 'react';
import { Spin, Table, Tag } from 'antd';
import * as Mappers from './mappers'; // Import Mappers (update the path accordingly)

interface UserInfo {
  id: number;
  name: string;
  username: string;
  email: string;
  city: string;
  zipcode: string;
  website: string;
  company: string;
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
       setIsLoading(true);
       await new Promise((res) => setTimeout(() => res(20), 500));

       const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
       const data: any = await res.json();
       const user = Mappers.User(data);
       setUser(user);
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
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'ZipCode',
      dataIndex: 'zipcode',
      key: 'zipcode',
      render: (zipcode: string) => <Tag>{zipcode}</Tag>,
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
    },
  ];

  return (
   <div id="usere">
     <div className="mx-auto w-full">
       <Spin spinning={isLoading} size="large">
         <Table
           dataSource={user ? [user] : []} 
           columns={columns}
           pagination={false}
           rowClassName="text-center"
         />
       </Spin>
     </div>
   </div>
 );
};

export default Info;