import { useParams } from "@solidjs/router";
import { request } from "../../lib/utils";
import { createResource, createSignal, For, Match, Show, Switch } from "solid-js";
import Loading from "../../components/Loading";

const fetchData = async id => {
    try {
        const response = await request.get('/companies/' + id);
        return response.data;
    } catch (error) {
        alert(error)
    }
}

export default function Company() {
    const params = useParams();
    const [refetch, setRefetch] = createSignal(0);
    const [data] = createResource(refetch, () => fetchData(params.id));


    return (
        <Switch>
            <Match when={data.loading}>
                <Loading />
            </Match>
            <Match when={data.error}>
                {data.error}
            </Match>
            <Match when={data()}>
                <h2>{data().company.name}</h2>
                <div className="text-sm text-gray-600">
                    <div>
                        <span className="font-medium">Actores: </span> {data().company.actors}
                    </div>
                    <div>
                        <span className="font-medium">Director: </span> {data().company.director}
                    </div>
                </div>
                <div className="mt-10">
                    <h3>Obras</h3>
                    <Show when={!data().plays.length}>
                        <div class="w-full p-10 text-center rounded-md bg-gray-50">
                            <p class="text-gray-600 text-sm">No hay obras asociadas con esta compania</p>
                        </div>
                    </Show>
                    <Show when={data().plays.length}>
                        <For each={data().plays}>
                            {(item, index) =>
                                <div className="px-5 py-3 rounded-md bg-gray-50 my-3 ">
                                    <a href={"/obras/" + item.id} class="font-medium">{item.title}</a>
                                    <p class="text-sm text-gray-600 line-clamp-2 shadow-ellipsis">{item.argument}</p>
                                </div>
                            }
                        </For>
                    </Show>
                </div>
            </Match >
        </Switch >
    );
}