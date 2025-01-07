import { createResource, createSignal, For, Match, Show, Switch } from "solid-js"
import { request } from "../../lib/utils";
import { DeleteRoom } from "../../components/Rooms/Delete";

const getData = async () => {
    const response = await request.get('/rooms');
    return response.data;
}
export default function Rooms() {
    const [refetch, setRefetch] = createSignal(0);
    const [rooms] = createResource(refetch, getData);


    return (
        <>
            <div className="flex justify-between">
                <h2>Salas</h2>
                <a href="/salas/crear" className="btn btn-primary">Crear</a>
            </div>
            <Switch>
                <Match when={rooms.loading}>
                    <div className="text-center mt-4">
                        <div class="skeleton h-12 w-full rounded-md  my-3"></div>
                        <div class="skeleton h-12 w-full rounded-md  my-3"></div>
                        <div class="skeleton h-12 w-full rounded-md  my-3"></div>
                        <div class="skeleton h-12 w-full rounded-md  my-3"></div>
                        <div class="skeleton h-12 w-full rounded-md  my-3"></div>
                        {/* <span className="loading loading-spinner loading-lg"></span> */}
                    </div>
                </Match>
                <Match when={rooms.error}>
                    <div className="mt-2">
                        Hubo un error: {rooms.error}
                    </div>
                </Match>
                <Match when={rooms()}>
                    <div className="mt-2">
                        <For each={rooms()}>
                            {(room, id) =>
                                <div className="my-6 px-4 py-2.5 w-full rounded-md bg-gray-50 flex justify-between">
                                    <a href={'./salas/' + room.id} className="font-semibold">{room.name}</a>
                                    <div class="py-2">
                                        <a href={"/salas/" + room.id + "/actualizar"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                            </svg>
                                        </a>
                                        <DeleteRoom
                                            btn={
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mt-2 size-4 text-red-600">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            }
                                            id={room.id}
                                            name={room.name}
                                            finalAction={() => setRefetch(prevRefetch => prevRefetch + 1)}
                                        />
                                    </div>
                                </div>}
                        </For>
                        <Show when={!rooms().length}>
                            <div class="w-full p-10 text-center rounded-md bg-gray-50">
                                <p class="text-gray-600 text-sm">No hay salas creadas</p>
                            </div>
                        </Show>
                    </div>
                </Match>
            </Switch>
        </>
    )
}