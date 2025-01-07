import { createEffect, createResource, createSignal, For, Match, Show, Switch } from "solid-js";
import useAuthContext from "../context/AuthContext";
import NavTabs from "../components/NavTabs";
import { request } from "../lib/utils";
import Loading from "../components/Loading";
import { createForm } from "@modular-forms/solid";
import SubmitButton from "../components/SubmitButton";
import useCarteleraContext from "../context/CarteleraContext";
import CarteleraPlay from "../components/CarteleraPlay";

export default function Index(props) {
    const { user, getUser } = useAuthContext();
    const { getCartelera, newPlayToAdd, setNewPlayToAdd } = useCarteleraContext();
    const [carteleraPlays, { mutate }] = createResource(getCartelera);

    createEffect(async () => {
        if (!user()) await getUser();
    });

    // listen for when a new play is added
    createEffect(() => {
        const newPlay = newPlayToAdd();
        if (newPlay?.id && !carteleraPlays().some(p => p.id === newPlay.id)) {
            mutate((plays) => [...plays, newPlay]);
            setNewPlayToAdd({});
        }
    }, newPlayToAdd);

    const parentAction = cartelera_id => {
        mutate(carteleraPlays().filter(p => p.cartelera_id !== cartelera_id));
    };

    return (
        <div class="w-full flex h-full px-10 justify-center">
            <div className="w-6/12 mx-4">
                <div className="w-full h-5/6 px-6 py-4 rounded-md bg-gray-50">
                    <h2>Cartelera</h2>
                    <Switch>
                        <Match when={carteleraPlays.loading}>
                            <Loading skeleton={true} />
                        </Match>
                        <Match when={carteleraPlays.error}>
                            There was an error
                        </Match>
                        <Match when={carteleraPlays()}>
                            <Show when={!carteleraPlays()?.length}>
                                <div className="py-10 text-center">
                                    No hay obras en la cartelera
                                </div>
                            </Show>
                            <Show when={carteleraPlays()?.length}>
                                <For each={carteleraPlays()}>
                                    {(item, index) =>
                                        <CarteleraPlay item={item} parentAction={() => parentAction(item.cartelera_id)} />
                                    }
                                </For>
                            </Show>
                        </Match>
                    </Switch>
                </div>
            </div>
            <div className="w-6/12 px-4 overflow-y-scroll h-5/6">
                <NavTabs />
                <div className="mt-4">
                    {props.children}
                </div>
            </div>
        </div>

    );
}