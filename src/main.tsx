import "bootstrap/dist/css/bootstrap.min.css";
import { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Store from "./store/store.ts";

interface IStore {
  store: Store;
}

const store = new Store();

export const Context = createContext<IStore>({ store });

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <Context.Provider value={{ store }}>
    <App />
  </Context.Provider>
);
