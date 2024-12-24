/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import "./index.css";
import Index from "./routes/index";
import { AuthProvider } from "./context/AuthContext";
import AuthLayout from "./layouts/AuthLayout";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
	throw new Error(
		"Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
	);
}

render(
	() => (

		<AuthProvider>
			<Router root={AuthLayout}>
				<Route path="/" component={Index} />
			</Router>
		</AuthProvider>
	),
	root,
);
