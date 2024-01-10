import { Component } from 'react';
import { Button, Modal, Table, Tag } from 'antd';
import { IEntity } from './types';
import * as Mappers from './mappers';
import Spinner from './spinner';

interface UsersState {
  users: IEntity.User[];
  isLoading: boolean;
}

export default class Users extends Component<any, UsersState> {
  state: UsersState = {
    users: [],
    isLoading: true
  };

  onLoadUsers = async () => {
    try {
      this.setState({ isLoading: true });
      await new Promise(res => setTimeout(() => res(20), 500));

      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const data: any[] = await res.json();
      const users = (data || []).map(Mappers.User);
      this.setState({ users, isLoading: false });
    } catch (err) {
      this.setState({ isLoading: false });
    }
  };

  componentDidMount(): void {
    window.addEventListener('popstate', () => {
      console.log('pathname: ', window.location.pathname);
    });

    this.onLoadUsers();
  }

  render() {
    const { isLoading, users } = this.state;

    return (
      <div className="mx-auto w-[1400px]">
        {!!users.length && (
          <Table
            bordered
            rowKey="id"
            columns={[
              {
                title: '🆔',
                dataIndex: 'id',
                width: 40
              },
              {
                title: 'Name 🌀',
                dataIndex: 'name'
              },
              {
                title: 'Username 🤦🏻',
                dataIndex: 'username'
              },
              {
                title: 'Email 📧',
                dataIndex: 'email'
              },
              {
                title: 'City 🌆',
                dataIndex: 'city'
              },
              {
                title: 'ZipCode 🔒',
                dataIndex: 'zipcode',
                render: zipcode => <Tag>🇺🇿 {zipcode}</Tag>
              },
              {
                title: 'Website ⛬',
                dataIndex: 'website'
              },
              {
                title: 'Company 💼',
                dataIndex: 'company'
              },
              {
                title: 'Actions',
                dataIndex: '',
                render: (value, user) => (
                  <Button.Group>
                    <Button onClick={() => window.history.replaceState({}, '', `/${user.id}`)}>Info</Button>
                    <Button>Edit</Button>
                    <Button type="primary" danger>
                      Delete
                    </Button>
                  </Button.Group>
                )
              }
            ]}
            dataSource={users}
            pagination={false}
            rowClassName="text-center"
          />
        )}
        <Spinner visible={isLoading} />
        <Modal />
      </div>
    );
  }
}
