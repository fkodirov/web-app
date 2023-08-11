import React, { useState, useEffect, useContext } from "react";
import { IUser } from "../models/IUser";
import UserService from "../services/UserService";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import { Trash3Fill, UnlockFill } from "react-bootstrap-icons";

const UsersTable: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const { store } = useContext(Context);

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="container-fluid">
      <div className="row flex-column d-flex align-items-center">
        <div className="col mb-3 d-flex justify-content-center gap-5">
          <button className="btn btn-danger me-2">Block</button>
          <UnlockFill
            className="cursor-pointer"
            size={32}
            color="green"
            title="Unblock selected users"
          />
          <Trash3Fill
            className="cursor-pointer"
            size={32}
            color="orange"
            title="Delete selected users"
          />
        </div>
        <div className="users-table">
          <div className="table-responsive-sm">
            <table className="table table-bordered table-hover rounded">
              <thead>
                <tr>
                  <th scope="col">
                    <input type="checkbox" className="form-check-input" />
                  </th>
                  <th scope="col">Id</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Registration Date</th>
                  <th scope="col">Last Login Date</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <th scope="row">
                      <input type="checkbox" className="form-check-input" />
                    </th>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.registrationDate}</td>
                    <td>{user.lastLoginDate}</td>
                    <td>{user.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(UsersTable);
