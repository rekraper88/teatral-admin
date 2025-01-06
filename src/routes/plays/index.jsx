import { createEffect, createResource, createSignal, Match, Show, Switch } from "solid-js";
import { request } from "../../lib/utils";
import Loading from "../../components/Loading";
import Item from "../../components/Item";

const fetchPlays = async () => {
    try {
        const response = await request.get('/plays');
        return response.data;
    } catch (error) {
        alert(error);
        return error;
    }
}

export default function Plays() {
    const [refetch, setRefetch] = createSignal(0);
    const [plays] = createResource(refetch, fetchPlays);


    return (
        <div>
            <div className="flex justify-between items-center my-3">
                <h2>Obras</h2>
                <a href="/obras/crear" className="btn btn-primary">Agregar</a>
            </div>
            <Switch>
                <Match when={plays.error}>
                    {plays.error}
                </Match>
                <Match when={plays.loading}>
                    <Loading skeleton={true} />
                </Match>
                <Match when={plays()}>
                    <For each={plays()}>
                        {(item, index) =>
                            <Item item={item} finalAction={() => setRefetch(prevRefetch => prevRefetch + 1)} itemStr="obra" urlString="/plays/" />
                        }
                    </For>
                    <Show when={!plays().length}>
                        <div class="w-full p-10 text-center rounded-md bg-gray-50">
                            <p class="text-gray-600 text-sm">No hay obras creadas</p>
                        </div>
                    </Show>
                </Match>
            </Switch>
        </div>
    );
}