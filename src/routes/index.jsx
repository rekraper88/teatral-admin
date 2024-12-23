import { createEffect } from "solid-js";
import useAuthContext from "../context/AuthContext";

export default function Index() {
    const authContext= useAuthContext();

    createEffect(() => {
        console.log(authContext);
        
        // if (!user) getUser();
    });
    return (
        <div class="prose">
            <h1>Hello</h1>
            {authContext()}
        </div>
    );
}