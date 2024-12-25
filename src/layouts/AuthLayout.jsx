import { createEffect, createResource, createSignal, Match, Show, Switch } from "solid-js";
import useAuthContext from "../context/AuthContext";
import { request } from "../lib/utils";
import { Navigate } from "@solidjs/router";
import Auth from "../components/Auth";
import Logout from "../components/forms/Logout";

const fetchUser = async () => {
    const { data } = await request.get('/api/user');
    return data;
}

export default function AuthLayout(props) {
    const { getUser, logout } = useAuthContext();
    // const [userId, setUserId] = createSignal('');
    const [user] = createResource(getUser);

    return (
        <div>
            <Show when={user.loading}>
                <div className="text-center mt-10">
                    <div class="loading loading-lg loading-spinner"></div>
                </div>
            </Show>
            <Switch>
                <Match when={user.error}>
                    <Auth />
                </Match>
                <Match when={user()}>
                    <div class="navbar px-6 shadow-xs dark:shadow-md mb-5 shadow-xs">
                        <h1 class="flex-1 text-xl">
                            <a href="/">Teatral</a>
                        </h1>
                        <div className="flex-none">
                            <ul className="menu menu-horizontal">
                                <li class="mr-3">
                                    <a href="/settings">{user().name}</a>
                                </li>
                                <li class="mr-3">
                                    <Logout />
                                </li>
                            </ul>
                        </div>
                    </div>
                    {props.children}
                </Match>
            </Switch>
        </div>
    )
}