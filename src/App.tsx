import { FC, useContext, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import { Context } from "./main";
import { observer } from "mobx-react-lite";
import RegistrationForm from "./components/RegistrationForm";
import UsersTable from "./components/UsersTable";

const App: FC = () => {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  if (store.isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="spinner-border text-primary w-10 h-10"
          role="status"
        ></div>
      </div>
    );
  } else if (!store.isAuth) {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }

  return <UsersTable />;
};

export default observer(App);
