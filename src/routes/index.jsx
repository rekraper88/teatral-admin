import { createEffect } from "solid-js";
import useAuthContext from "../context/AuthContext";
import { request } from "../lib/utils";

export default function Index() {
    const { user, getUser} = useAuthContext();
    createEffect(async () => {
        if (!user()) await getUser();
    });
    return (
        <div class="prose">
            <h1>Hello</h1>
            {user()?.name}
        </div>
    );
}