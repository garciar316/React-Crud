import React, { useState, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AddUSerForm from './components/add_user/AddUserForm';
import useLocalStorage from './context/useLocalStorage';
import MyNavBar from './layout/MyNavBar';
import { todoReducer } from './components/useReducer/reducer';
import { crudActions } from './components/useReducer/actions';
import ListUsers from './components/user_table/ListUsers';

function App() {

  const [currentUser, setCurrentUser] = useState({
    id: null, name: '', username: ''
  });
  const [usersLocalStorage, setUsersLocalStorage] = useLocalStorage('users', []);
  const [users, dispatch] = useReducer(todoReducer, usersLocalStorage);

  const addUser = (user) => {
    user.id = uuidv4();
    dispatch({ type: crudActions.ADD, payload: user });
  }

  const deleteUser = (id) => {
    dispatch({ type: crudActions.DELETE, payload: id });
  }

  const editRow = (user) => {
    setCurrentUser({
      id: user.id, name: user.name, username: user.username
    });
    <BrowserRouter>
      <Navigate replace to="/editar" />
    </BrowserRouter>
  }

  const updateUser = (id, updatedUser) => {
    updatedUser.id = id;
    dispatch({ type: crudActions.EDIT, payload: updatedUser });
  }

  useEffect(() => {
    setUsersLocalStorage(users);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyNavBar />}>
          <Route index element={
            <ListUsers
              users={users}
              deleteUser={deleteUser}
              editRow={editRow}
              updateUser={updateUser}
              currentUser={currentUser}
            />
          } />
          <Route path="agregar" element={<AddUSerForm addUser={addUser} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
