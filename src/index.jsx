/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import "./index.css";
import Index from "./routes/index";
import Register from "./routes/Register";
import Layout from "./layout";
import Login from "./routes/Login";
import { AuthProvider } from "./context/AuthContext";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
  );
}

render(
  () => (
    <Router root={Layout}>
      <AuthProvider>
        <Route path="/" component={Index} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </AuthProvider>
    </Router>
  ),
  root,
);
