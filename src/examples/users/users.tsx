import { Component } from 'react';
import axios from 'axios';
import { Button, Modal, Table, Tag } from 'antd';
import { IEntity } from './types';
import * as Mappers from './mappers';
import Spinner from './spinner';
import Info from './Info';

interface UsersState {
  users: IEntity.User[];
  isLoading: boolean;
  userId:any
}

export default class Users extends Component<any, UsersState> {
  state: UsersState = {
    users: [],
    isLoading: true,
    userId:null
  };

  handleBack = ()=>{
    this.setState({userId:null})
  }

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
  onDeleteUser = async (userId: number) => {
    try {
      this.setState({ isLoading: true });

      const updatedUsers = this.state.users.filter(user => user.id !== userId);
      this.setState({ users: updatedUsers, isLoading: false });
    } catch (err) {

      console.error('Error deleting user:', err);
      this.setState({ isLoading: false });
    }
  };

  info = () => {
    Modal.info({
      title: 'This is a notification message',
      content: (
        <div>
          <p>some messages...some messages...</p>
          <p>some messages...some messages...</p>
        </div>
      ),
      onOk() {},
    });
  };

  render() {
    const { isLoading, users } = this.state;

    if(this.state.userId){
      return (
        <>
          <Info onBack={this.handleBack} userId={this.state.userId}/>
        </>
      )
    }

    return (
      <div id='usere'>
      <div className="mx-auto w-full">
        {!!users.length  || users.length === 0 ?(
          <Table
          className="your-custom-class h-[700px]"
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
                   <Button onClick={() => {
  this.setState({ userId: user.id });
  window.history.replaceState({}, '', `/${user.id}`);
}}>Info</Button>


<Button onClick={this.info}>Edit</Button>
                    <Button type="primary" danger onClick={() => this.onDeleteUser(user.id)}>
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
        ) :(
          <h1>Tugadi</h1>
        )
        }
        <Spinner visible={isLoading} />
        <Modal />
      </div>
     </div>
    );
  }
  Info(id: number): void {
    throw new Error('Method not implemented.');
  }
}
//window.history.replaceState({}, '', `/${user.id}`)
