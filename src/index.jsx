/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import "./index.css";
import Index from "./routes/index";
import { AuthProvider } from "./context/AuthContext";
import AuthLayout from "./layouts/AuthLayout";
import Companies from "./routes/companies/index";
import Calendar from "./routes/calendario";
import Rooms from "./routes/salas";
import New from "./routes/companies/new";

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
				<Route path="/" component={Index}>
				<Route path="/companias/crear" component={New} /> 
					<Route path="/companias" component={Companies} /> 
					<Route path="/calendario" component={Calendar}></Route>
					<Route path="/salas" component={Rooms}></Route>
				</Route>
			</Router>
		</AuthProvider>
	),
	root,
);
