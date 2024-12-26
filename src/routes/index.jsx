import { createEffect } from "solid-js";
import useAuthContext from "../context/AuthContext";
import { request } from "../lib/utils";

export default function Index() {
    const { user, getUser} = useAuthContext();
    createEffect(async () => {
        if (!user()) await getUser();
    });
    return (
        <div class="w-full flex h-full px-10 justify-center">
            <div className="w-6/12">
                <h2>Cartelera</h2>
                <div className="mt-2 w-full px-6 py-3 rounded-md bg-gray-100">
                    <div className="font-bold text-lg">Obras:</div>
                </div>
            </div>
            <div className="w-6/12"></div>
        </div>
    );
}