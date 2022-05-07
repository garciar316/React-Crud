import React from 'react';
import EditUserForm from '../edit_user/EditUserForm';
import UserTable from './UserTable';

const ListUsers = (props) => {
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-6">
                    <EditUserForm
                        currentUser={props.currentUser}
                        updateUser={props.updateUser}
                    />
                </div>
                <div className="col-md-6">
                    <UserTable
                        users={props.users}
                        deleteUser={props.deleteUser}
                        editRow={props.editRow} />
                </div>
            </div>
        </div>
    );
}
export default ListUsers;