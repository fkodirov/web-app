import { FC, useContext, useState } from "react";
import { Context } from "../main";
import { observer } from "mobx-react-lite";

const RegistrationForm: FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { store } = useContext(Context);
  return (
    <div className="form-login w-100 p-15 m-auto text-center">
      <form>
        <h1 className="h3 mb-3 fw-normal">Sign Up</h1>

        <div className="form-floating mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            id="nameInput"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
          <label htmlFor="nameInput">Name</label>
        </div>
        <div className="form-floating mb-2">
          <input
            type="email"
            className="form-control"
            placeholder="name@example.com"
            id="emailInput"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
          <label htmlFor="emailInput">Email</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            id="passwordInput"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
          <label htmlFor="passwordInput">Password</label>
        </div>

        <button
          className="w-100 btn btn-lg btn-primary mb-2"
          onClick={async (e) => {
            e.preventDefault();

            try {
              await store.registration(name, email, password);
            } catch (e) {
              console.log(e);
            }
          }}
        >
          Sign up
        </button>
        <div className="checkbox mb-3">
          <p>
            Already have an account?{" "}
            <span className="text-primary cursor-pointer">Log in</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default observer(RegistrationForm);
