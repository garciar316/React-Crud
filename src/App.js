import React, { useState } from 'react';
import UserTable from "./components/UserTable";
import { v4 as uuidv4 } from 'uuid';
import AddUSerForm from './components/AddUserForm';
import EditUserForm from './components/EditUserForm';
import useLocalStorage from './context/useLocalStorage';

function App() {

  const [currentUser, setCurrentUser] = useState({
    id: null, name: '', username: ''
  });

  const [users, setUsers] = useLocalStorage('users', []);

  const [editing, setEditing] = useState(false);

  const addUser = (user) => {
    user.id = uuidv4();
    setUsers([
      ...users,
      user
    ]);
  }

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  }

  const editRow = (user) => {
    setEditing(true);
    setCurrentUser({
      id: user.id, name: user.name, username: user.username
    })
  }

  const updateUser = (id, updatedUser) => {
    setEditing(false);
    setUsers(users.map((user) => user.id === id ? updatedUser : user));
  }

  return (
    <div className="container">
      <h1>Crud App with Hooks</h1>
      <div className="flex-row">
        {
          editing ?
            <div className="flex-large">
              <h2>Edit user</h2>
              <EditUserForm
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </div>
            :
            <div className="flex-large">
              <h2>Add user</h2>
              <AddUSerForm addUser={addUser} />
            </div>
        }

        <div className="flex-large">
          <h2>View user</h2>
          <UserTable
            users={users}
            deleteUser={deleteUser}
            editRow={editRow}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
