import { createEffect } from "solid-js";
import useAuthContext from "../context/AuthContext";
import NavTabs from "../components/NavTabs";

export default function Index(props) {
    const { user, getUser } = useAuthContext();
    createEffect(async () => {

        if (!user()) await getUser();
    });
    return (
        <div class="w-full flex h-full px-10 justify-center">
            <div className="w-6/12 mx-4">
                <div className="w-full h-5/6 px-6 py-4 rounded-md bg-gray-100">
                    <h2>Cartelera</h2>
                    <div className="font-bold text-lg mt-2">Obras:</div>
                </div>
            </div>
            <div className="w-6/12 mx-4">
                <NavTabs />
                <div className="mt-4">
                    {props.children}
                </div>
            </div>
        </div>
    );
}