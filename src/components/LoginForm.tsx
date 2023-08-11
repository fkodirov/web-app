import { FC, useContext, useState } from "react";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
interface Iinvalid {
  status: boolean;
  message?: string;
}

const EMAIL_REGEXP =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
function validateEmail(value: string) {
  return EMAIL_REGEXP.test(value);
}
const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { store } = useContext(Context);
  const [isInvalidEmail, setIsInvalidEmail] = useState<Iinvalid>({
    status: false,
  });
  const [isInvalidPsw, setIsInvalidPsw] = useState<Iinvalid>({ status: false });

  return (
    <div className="form-login w-100 p-15 m-auto text-center">
      <form>
        <h1 className="h3 mb-3 fw-normal">Login Form</h1>

        <div className="form-floating mb-2">
          <input
            type="email"
            className={`form-control ${
              isInvalidEmail.status ? "is-invalid" : ""
            }`}
            id="floatingInput"
            placeholder="name@example.com"
            onChange={(e) => {
              setEmail(e.target.value);
              setIsInvalidEmail({ status: false });
            }}
            value={email}
          />
          <label htmlFor="floatingInput">Email</label>
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
            className={`form-control ${
              isInvalidPsw.status ? "is-invalid" : ""
            }`}
            id="floatingPassword"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
              setIsInvalidPsw({ status: false });
            }}
            value={password}
          />
          <label htmlFor="floatingPassword">Password</label>
          {isInvalidPsw ? (
            <div className="invalid-feedback text-left m-1">
              {isInvalidPsw.message}
            </div>
          ) : (
            ""
          )}
        </div>

        <button
          className="w-100 btn btn-lg btn-primary mb-2"
          onClick={async (event) => {
            event.preventDefault();
            let i = 0;
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
              setIsInvalidPsw({
                status: true,
                message: "The password must not be empty.",
              });
              i++;
            }
            if (i !== 0) return;
            try {
              await store.login(email, password);
            } catch (e) {
              if (e.response.data.message.includes("User not found"))
                setIsInvalidEmail({ status: true, message: "User not found" });
              else if (e.response.data.message.includes("User blocked!"))
                setIsInvalidEmail({ status: true, message: "User blocked!" });
              if (e.response.data.message.includes("Incorrect Password"))
                setIsInvalidPsw({
                  status: true,
                  message: "Incorrect Password",
                });
            }
          }}
        >
          Login
        </button>
        <div className="checkbox mb-3">
          <p>
            Not a member?{" "}
            <span
              className="text-primary cursor-pointer"
              onClick={() => store.setLoginForm(false)}
            >
              Sign Up now
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default observer(LoginForm);
