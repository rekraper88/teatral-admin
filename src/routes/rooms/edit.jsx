import { createForm, required } from "@modular-forms/solid";
import SubmitButton from "../../components/SubmitButton";
import { csrf, request } from "../../lib/utils";
import { useNavigate, useParams } from "@solidjs/router";
import { createEffect, createResource, createSignal, For, Match, Show, Switch } from "solid-js";

const fetchRoom = async id => {
    const response = await request.get('/rooms/' + id + '/edit');
    return response.data;
}

export default function EditRoom() {
    const [newRoomForm, { Form, Field }] = createForm();
    const navigate = useNavigate();
    const [fields, setFields] = createSignal(0);
    const [cols, setCols] = createSignal(0);

    const params = useParams();
    const [room] = createResource(() => fetchRoom(params.id));

    createEffect(() => {
        if (room()?.rows) {
            setFields(room().rows)
        }

        if (room()?.cols) {
            setCols(room().cols)
        }

        console.log(room());

    }, [room()])

    const handleEdit = async (values, event) => {
        const rows = parseInt(fields());
        const columns = parseInt(cols());
        const seats = rows * columns;

        await csrf();
        await request.put('/rooms/' + params.id, { name: values.name, rows, columns: cols(), seats });

        navigate('/salas');
    }

    return (
        <Switch>
            <Match when={room.loading}>
                <div className="text-center mt-10">
                    <div class="loading loading-lg loading-spinner"></div>
                </div>
            </Match>
            <Match when={room.error}>
                {room.error}
            </Match>
            <Match when={room()}>
                <div className="flex items-center">
                    <a href="/salas">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                        </svg>
                    </a>
                    <h2 class="ml-3">Actualizar sala</h2>
                </div>
                <Form onSubmit={handleEdit}>
                    <Field
                        name="name"
                        validate={[
                            required('Este campo es obligatorio')
                        ]}
                    >
                        {(field, props) =>
                            <div class="form-container">
                                <label for="name">Nombre de la sala</label>
                                <input
                                    {...props}
                                    type="name"
                                    id="name"
                                    class="form-input"
                                    value={room().name}
                                />
                                {field.error && <div class="form-error">{field.error}</div>}
                            </div>
                        }
                    </Field>
                    <div class="form-container">
                        <p>Disposicion de butacas</p>
                        <div className="flex items-center">
                            <Field
                                name="rows"
                                validate={[
                                    required('Este campo es obligatorio')
                                ]}
                            >
                                {(field, props) => (
                                    <>
                                        <input
                                            {...props}
                                            type="number"
                                            class="form-input"
                                            value={fields()}
                                            onKeyUp={e => setFields(e.target.value)}
                                        />
                                        {field.error && <div class="form-error">{field.error}</div>}
                                    </>
                                )}
                            </Field>
                            <div className="mx-3">x</div>
                            <Field
                                name="cols"
                                validate={[
                                    required('Este campo es obligatorio')
                                ]}
                            >
                                {(field, props) => (
                                    <>
                                        <input
                                            {...props}
                                            type="number"
                                            class="form-input"
                                            value={cols()}
                                            onKeyUp={e => setCols(e.target.value)}
                                        />
                                        {field.error && <div class="form-error">{field.error}</div>}
                                    </>
                                )}
                            </Field>
                        </div>
                        <Show when={parseInt(fields()) * parseInt(cols()) != 0 && !isNaN(parseInt(fields()) * parseInt(cols()))}>
                            <p className="text-sm text-gray-600 my-2">{parseInt(fields()) * parseInt(cols())} butacas</p>
                            <div
                                class="grid justify-center content-center my-6"
                                style={{
                                    "grid-template-columns": `repeat(${cols()}, 40px)`,
                                }}
                            >
                                <For each={Array.from({ length: fields() })}>
                                    {(row, rowIndex) => (
                                        <For each={Array.from({ length: cols() })}>
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
                        </Show>
                    </div>


                    <SubmitButton
                        type="submit"
                        class="form-button"
                        loadingVariable={newRoomForm.submitting}
                    >
                        Actualizar informacion de sala
                    </SubmitButton>
                </Form>
            </Match>
        </Switch>
    )
}