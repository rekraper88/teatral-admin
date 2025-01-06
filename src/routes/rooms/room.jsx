import { createResource, For } from "solid-js";
import { request } from "../../lib/utils";
import { useNavigate, useParams } from "@solidjs/router";
import { DeleteRoom } from "../../components/Rooms/Delete";
import Loading from "../../components/Loading";

const fetchData = async (id) => {
    const response = await request.get('/rooms/' + id);
    return response.data;
}
export default function Room() {
    const params = useParams();
    const [data] = createResource(() => fetchData(params.id));
    const navigate = useNavigate();

    return (
        <div>
            <Switch>
                <Match when={data.loading}>
                    <Loading skeleton={false} />
                </Match>
                <Match when={data.error}>
                    {data.error}
                </Match>
                <Match when={data().room}>
                    <h2>{data().room.name}</h2>
                    <div className="flex items-center text-sm">
                        <a href={"./" + params.id + "/actualizar"} className="block text-blue-600">Actualizar sala</a>
                        <DeleteRoom
                            btn={<button className="ml-3 text-red-600">Eliminar sala</button>}
                            id={data().room.id}
                            name={data().room.name}
                            finalAction={() => navigate('/salas')}
                        />
                    </div>
                    <h3 class="my-3">Obras en representacion</h3>
                    <For each={data().plays}>
                        {(item, index) =>
                            <div class="flex justify-between items-center border border-gray-100 rounded-xl p-2 my-3">
                                <a href={"/obras/" + item.id} className="btn">{item.title}</a>
                                {/* <hr class="w-full" />   */}
                                <div class="mr-1 font-medium text-sm text-">
                                    {item.day.split('-')[2]}/{item.day.split('-')[1]}/{item.day.split('-')[0]}
                                    &nbsp;
                                    {item.start_time}
                                    -
                                    {item.end_time}
                                </div>
                            </div>
                        }
                    </For>
                    <div
                        class="grid justify-center content-center my-6"
                        style={{
                            "grid-template-columns": `repeat(${data().room.cols}, 40px)`,
                        }}
                    >
                        <For each={Array.from({ length: data().room.rows })}>
                            {(row, rowIndex) => (
                                <For each={Array.from({ length: data().room.cols })}>
                                    {(col, colIndex) => (
                                        <img
                                            src="/seat.png"
                                            class="rotate-180"
                                            alt={`Seat ${rowIndex() + 1}-${colIndex() + 1}`}
                                        />
                                    )}
                                </For>
                            )}
                        </For>
                    </div>
                    <p className="text-sm text-center text-gray-600 my-2">{parseInt(data().room.rows) * parseInt(data().room.cols)} butacas</p>
                </Match>
            </Switch>
        </div>
    );
}