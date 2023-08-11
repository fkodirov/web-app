import { FC, useContext, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import { Context } from "./main";
import { observer } from "mobx-react-lite";

import RegistrationForm from "./components/RegistrationForm";
import UsersTable from "./components/UsersTable";
import { BoxArrowInRight } from "react-bootstrap-icons";

const App: FC = () => {
  const { store } = useContext(Context);
  // const [isLoginForm, setIsLoginForm] = useState(true);

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
  }
  if (!store.isAuth) {
    return (
      <div>{store.isLoginForm ? <LoginForm /> : <RegistrationForm />}</div>
    );
  }

  return (
    <div className="container-fluid vh-100">
      <div className="row text-center my-3">
        <div className="col">
          <span className="fw-bold">
            {store.isAuth ? store.user.email : "Sign in"}
          </span>
        </div>
        <div className="col">
          <button className="btn btn-primary" onClick={() => store.logout()}>
            <BoxArrowInRight title="Log out" size={20} />
            {" Выйти "}
          </button>
        </div>
      </div>
      <h1></h1>

      <UsersTable />
    </div>
  );
};

export default observer(App);
