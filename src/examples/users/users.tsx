import React, { Component } from 'react'; // Import React
import { Button, Modal, Table, Tag } from 'antd';
import { IEntity } from './types';
import * as Mappers from './mappers';
import Spinner from './spinner';
import Info from './Info';

interface UsersState {
  users: IEntity.User[];
  isLoading: boolean;
  userId: number | null; // Change the type to 'number | null'
  selectedUser: IEntity.User | null;
  isEditModalVisible: boolean;
  // Add state properties for editing fields
  editName: string;
  editUsername: string;
  editEmail: string;
  editCity: string;
  editZipCode: string;
  editWebsite: string;
  editCompany: string;
}

export default class Users extends Component<any, UsersState> {
  state: UsersState = {
    users: [],
    isLoading: true,
    userId: null,
    selectedUser: null,
    isEditModalVisible: false,
    // Initialize state properties for editing fields
    editName: '',
    editUsername: '',
    editEmail: '',
    editCity: '',
    editZipCode: '',
    editWebsite: '',
    editCompany: '',
  };

  handleBack = () => {
    this.setState({ userId: null });
  };

  onLoadUsers = async () => {
    try {
      this.setState({ isLoading: true });
      await new Promise((res) => setTimeout(() => res(20), 500));

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

      const updatedUsers = this.state.users.filter((user) => user.id !== userId);
      this.setState({ users: updatedUsers, isLoading: false });
    } catch (err) {
      console.error('Error deleting user:', err);
      this.setState({ isLoading: false });
    }
  };

  onEditUser = (user: IEntity.User) => { // Change the argument type to IEntity.User
    this.setState({
      selectedUser: user,
      isEditModalVisible: true,
      editName: user.name,
      editUsername: user.username,
      editEmail: user.email,
      editCity: user.city,
      editZipCode: user.zipcode,
      editWebsite: user.website,
      editCompany: user.company,
    });
  };

  onCloseEditModal = () => {
    // Close the Edit modal
    this.setState({ selectedUser: null, isEditModalVisible: false });
  };

  handleEditSave = () => {
    const { users, selectedUser, editName, editUsername, editEmail, editCity, editZipCode, editWebsite, editCompany } = this.state;
    const updatedUsers = users.map((user) =>
      user.id === selectedUser?.id
        ? {
            ...user,
            name: editName,
            username: editUsername,
            email: editEmail,
            city: editCity,
            zipcode: editZipCode,
            website: editWebsite,
            company: editCompany,
          }
        : user
    );

    this.setState({ users: updatedUsers, isEditModalVisible: false });
  };

  render() {
    const { isLoading, users, isEditModalVisible, selectedUser, editName, editUsername, editEmail, editCity, editZipCode, editWebsite, editCompany } = this.state;

    if (this.state.userId) {
      return (
        <>
          <Info onBack={this.handleBack} userId={this.state.userId} />
        </>
      );
    }

    return (
      <div id="usere">
        <div className="mx-auto w-full">
          {!!users.length || users.length === 0 ? (
            <Table
              className="your-custom-class h-[700px]"
              bordered
              rowKey="id"
              columns={[
                {
                  title: '🆔',
                  dataIndex: 'id',
                  width: 40,
                },
                {
                  title: 'Name 🌀',
                  dataIndex: 'name',
                },
                {
                  title: 'Username 🤦🏻',
                  dataIndex: 'username',
                },
                {
                  title: 'Email 📧',
                  dataIndex: 'email',
                },
                {
                  title: 'City 🌆',
                  dataIndex: 'city',
                },
                {
                  title: 'ZipCode 🔒',
                  dataIndex: 'zipcode',
                  render: (zipcode) => <Tag>🇺🇿 {zipcode}</Tag>,
                },
                {
                  title: 'Website ⛬',
                  dataIndex: 'website',
                },
                {
                  title: 'Company 💼',
                  dataIndex: 'company',
                },
                {
                  title: 'Actions',
                  dataIndex: '',
                  render: (value, user) => (
                    <Button.Group>
                      <Button
                        className="bg-yellow-500 hover:text-black"
                        onClick={() => {
                          this.setState({ userId: user.id });
                          window.history.replaceState({}, '', `/${user.id}`);
                        }}
                      >
                        Info
                      </Button>
                      <Button onClick={() => this.onEditUser(user)}>Edit</Button>
                      <Button type="primary" danger onClick={() => this.onDeleteUser(user.id)}>
                        Delete
                      </Button>
                    </Button.Group>
                  ),
                },
              ]}
              dataSource={users}
              pagination={false}
              rowClassName="text-center"
            />
          ) : (
            <h1>Tugadi</h1>
          )}
          <Spinner visible={isLoading} />
          <Modal visible={isEditModalVisible} onOk={this.handleEditSave} onCancel={this.onCloseEditModal}>
            {selectedUser && (
              <>
                <h1>Edit User</h1>
                <form>
                  <label>Name:</label>
                  <input
                    type="text"
                    value={editName} // Use 'value' instead of 'defaultValue'
                    onChange={(e) => this.setState({ editName: e.target.value })}
                  />
                  {/* Add other form fields here */}
                </form>
              </>
            )}
          </Modal>
        </div>
      </div>
    );
  }
}
