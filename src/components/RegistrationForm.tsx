import { FC, useContext, useState } from "react";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import validateEmail from "../helper/helper";
import { IisInvalid } from "../models/Iinvalid";

const RegistrationForm: FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { store } = useContext(Context);
  const [isInvalidName, setIsInvalidName] = useState<boolean>(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState<IisInvalid>({
    status: false,
  });
  const [isInvalidPsw, setIsInvalidPsw] = useState<boolean>(false);
  return (
    <div className="form-login w-100 p-15 m-auto text-center">
      <form>
        <h1 className="h3 mb-3 fw-normal">Sign Up</h1>

        <div className="form-floating mb-2">
          <input
            type="text"
            className={`form-control ${isInvalidName ? "is-invalid" : ""}`}
            placeholder="Name"
            id="nameInput"
            onChange={(e) => {
              setName(e.target.value);
              setIsInvalidName(false);
            }}
            value={name}
          />
          <label htmlFor="nameInput">Name</label>
          {isInvalidName ? (
            <div className="invalid-feedback text-left m-1">
              The user name must not be empty.
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="form-floating mb-2">
          <input
            type="email"
            className={`form-control ${
              isInvalidEmail.status ? "is-invalid" : ""
            }`}
            placeholder="name@example.com"
            id="emailInput"
            onChange={(e) => {
              setEmail(e.target.value);
              setIsInvalidEmail({ status: false });
            }}
            value={email}
          />
          <label htmlFor="emailInput">Email</label>
          {isInvalidEmail.status ? (
            <div className="invalid-feedback text-left m-1">
              {isInvalidEmail.message}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className={`form-control ${isInvalidPsw ? "is-invalid" : ""}`}
            placeholder="Password"
            id="passwordInput"
            onChange={(e) => {
              setPassword(e.target.value);
              setIsInvalidPsw(false);
            }}
            value={password}
          />
          <label htmlFor="passwordInput">Password</label>
          {isInvalidPsw ? (
            <div className="invalid-feedback text-left m-1">
              The password must not be empty.
            </div>
          ) : (
            ""
          )}
        </div>

        <button
          className="w-100 btn btn-lg btn-primary mb-2"
          onClick={async (e) => {
            e.preventDefault();
            let i: number = 0;
            if (name.trim() === "") {
              setIsInvalidName(true);
              i++;
            }
            if (email === "") {
              setIsInvalidEmail({
                status: true,
                message: "The email must not be empty.",
              });
              i++;
            } else if (!validateEmail(email)) {
              setIsInvalidEmail({
                status: true,
                message: "Invalid email address",
              });
              i++;
            }
            if (password === "") {
              setIsInvalidPsw(true);
              i++;
            }
            if (i !== 0) return;

            try {
              await store.registration(name, email, password);
            } catch (e) {
              if (e.response.data.message.includes("The user")) {
                setIsInvalidName(true);
              }
              if (e.response.data.message.includes("the same email"))
                setIsInvalidEmail({
                  status: true,
                  message: "A user with the same email already exists",
                });
              else if (e.response.data.message.includes("email address"))
                setIsInvalidEmail({
                  status: true,
                  message: "Invalid email address",
                });
              if (e.response.data.message.includes("The password"))
                setIsInvalidPsw(true);
            }
          }}
        >
          Sign up
        </button>
        <div className="checkbox mb-3">
          <p>
            Already have an account?{" "}
            <span
              className="text-primary cursor-pointer"
              onClick={() => store.setLoginForm(true)}
            >
              Log in
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default observer(RegistrationForm);
