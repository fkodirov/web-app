import { FC, useContext, useState } from "react";
import { Context } from "../main";
import { observer } from "mobx-react-lite";

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { store } = useContext(Context);

  return (
    <div className="form-login w-100 p-15 m-auto text-center">
      <form>
        <h1 className="h3 mb-3 fw-normal">Login Form</h1>
        <div className="form-floating mb-2">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
          <label htmlFor="floatingInput">Email</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <button
          className="w-100 btn btn-lg btn-primary mb-2"
          onClick={async (event) => {
            event.preventDefault();
            try {
              await store.login(email, password);
            } catch (e) {
              console.log(e);
            }
          }}
        >
          Login
        </button>
        <div className="checkbox mb-3">
          <p>
            Not a member?{" "}
            <span className="text-primary cursor-pointer">Sign Up now</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default observer(LoginForm);
