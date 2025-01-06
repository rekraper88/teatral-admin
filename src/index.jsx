/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import "./index.css";
import Index from "./routes/index";
import { AuthProvider } from "./context/AuthContext";
import AuthLayout from "./layouts/AuthLayout";
import Companies from "./routes/companies/index";
import Calendar from "./routes/calendario";
import Rooms from "./routes/rooms/index";
import NewRoom from "./routes/rooms/new";

import New from "./routes/companies/new";
import EditRoom from "./routes/rooms/edit";
import Room from "./routes/rooms/room";
import Plays from "./routes/plays";
import NewPlay from "./routes/plays/new";
import Play from "./routes/plays/play";
import EditPlay from "./routes/plays/edit";
import Company from "./routes/companies/company";
import EditCompany from "./routes/companies/Edit";

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
					<Route path="/obras" component={Plays} />
					<Route path="/obras/:id" component={Play} />
					<Route path="/obras/:id/actualizar" component={EditPlay} />
					<Route path="/obras/crear" component={NewPlay} />
					<Route path="/companias/crear" component={New} />
					<Route path="/companias" component={Companies} />
					<Route path="/companias/:id" component={Company} />
					<Route path="/companias/:id/actualizar" component={EditCompany} />
					<Route path="/calendario" component={Calendar}></Route>
					<Route path="/salas" component={Rooms}></Route>
					<Route path="/salas/crear" component={NewRoom}></Route>
					<Route path="/salas/:id" component={Room}></Route>
					<Route path="/salas/:id/actualizar" component={EditRoom}></Route>
				</Route>
			</Router>
		</AuthProvider>
	),
	root,
);
