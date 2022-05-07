import React, { useState, useReducer, useEffect } from 'react';
import UserTable from "./components/user_table/UserTable";
import { v4 as uuidv4 } from 'uuid';
import AddUSerForm from './components/add_user/AddUserForm';
import EditUserForm from './components/edit_user/EditUserForm';
import useLocalStorage from './context/useLocalStorage';
import { todoReducer } from './components/useReducer/reducer';
import { crudActions } from './components/useReducer/actions';

function App() {

  const [currentUser, setCurrentUser] = useState({
    id: null, name: '', username: ''
  });
  const [usersLocalStorage, setUsersLocalStorage] = useLocalStorage('users', []);
  const [users, dispatch] = useReducer(todoReducer, usersLocalStorage);
  const [editing, setEditing] = useState(false);

  const addUser = (user) => {
    user.id = uuidv4();
    dispatch({type: crudActions.ADD, payload: user});
  }

  const deleteUser = (id) => {
    dispatch({type: crudActions.DELETE, payload: id});
  }

  const editRow = (user) => {
    setEditing(true);
    setCurrentUser({
      id: user.id, name: user.name, username: user.username
    })
  }

  const updateUser = (id, updatedUser) => {
    setEditing(false);
    updatedUser.id = id;
    dispatch({type: crudActions.EDIT, payload: updatedUser});
  }

  useEffect(() => {
    setUsersLocalStorage(users);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

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
