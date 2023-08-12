import React, { useState, useEffect, useContext } from "react";
import { IUser } from "../models/IUser";
import UserService from "../services/UserService";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import { Trash3Fill, UnlockFill } from "react-bootstrap-icons";

const UsersTable: React.FC = () => {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [selectedAll, setSelectedAll] = useState<boolean>(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const { store } = useContext(Context);
  store.setLoginForm(true);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    checkLastUser();
  }, [selectedUsers]);

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  }
  async function checkBlocked() {
    try {
      const user = await UserService.fetchUser(store.user.id);
      if (user.data.status === "blocked") return true;
      else return false;
    } catch (e) {
      console.log(e);
    }
  }

  async function blockUser(id: number) {
    try {
      if (await checkBlocked()) store.logout();
      else {
        await UserService.blockUser(id);
        if (id === store.user.id) store.logout();
        else getUsers();
      }
    } catch (e) {
      console.log(e);
    }
  }
  async function unblockUser(id: number) {
    try {
      if (await checkBlocked()) store.logout();
      else {
        await UserService.unblockUser(id);
        getUsers();
      }
    } catch (e) {
      console.log(e);
    }
  }
  async function deleteUser(id: number) {
    try {
      if (await checkBlocked()) store.logout();
      else {
        await UserService.deleteUser(id);
        setSelectedUsers(selectedUsers.filter((e) => e != id));
        if (id === store.user.id) store.logout();
        else getUsers();
      }
    } catch (e) {
      console.log(e);
    }
  }

  const selectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
      setSelectedAll(false);
    } else {
      const allUserIds = users.map((user) => user.id);
      setSelectedUsers(allUserIds);
      setSelectedAll(true);
    }
  };

  const selectUser = (userId: number) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const checkLastUser = () => {
    if (selectedUsers.length === users.length && users.length !== 0) {
      setSelectedAll(true);
    } else {
      setSelectedAll(false);
    }
  };

  const blockSelected = () => {
    selectedUsers.forEach((e) => blockUser(e));
  };

  const unblockSelected = () => {
    selectedUsers.forEach((e) => unblockUser(e));
  };

  const deleteSelected = () => {
    selectedUsers.forEach((e) => deleteUser(e));
  };

  const toLocalTime = (date: string) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="container-fluid">
      <div className="row flex-column d-flex align-items-center">
        <div className="col mb-3 d-flex justify-content-center gap-5">
          <button className="btn btn-danger me-2" onClick={blockSelected}>
            Block
          </button>
          <UnlockFill
            className="cursor-pointer"
            size={32}
            color="green"
            title="Unblock selected users"
            onClick={unblockSelected}
          />
          <Trash3Fill
            className="cursor-pointer"
            size={32}
            color="orange"
            title="Delete selected users"
            onClick={deleteSelected}
          />
        </div>
        <div className="users-table">
          <div className="table-responsive-sm">
            <table className="table table-bordered table-hover rounded">
              <thead>
                <tr>
                  <th scope="col">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      onChange={selectAll}
                      checked={selectedAll}
                    />
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
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => selectUser(user.id)}
                      />
                    </th>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.registrationDate
                        ? toLocalTime(user.registrationDate)
                        : ""}
                    </td>
                    <td>
                      {user.lastLoginDate
                        ? toLocalTime(user.lastLoginDate)
                        : "-"}
                    </td>
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
