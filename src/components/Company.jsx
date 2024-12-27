import { createForm, required } from "@modular-forms/solid";
import SubmitButton from "./SubmitButton";
import { createSignal } from "solid-js";
import { csrf, request } from "../lib/utils";

export default function Company(props) {
    const [editForm, { Form, Field }] = createForm();
    const [name, setName] = createSignal(props.name)
    const [director, setDirector] = createSignal(props.director)
    const [actors, setActors] = createSignal(props.actors)

    const handleEdit = async (values, event) => {
        await csrf();
        await request.put('/companies/' + props.companyId, values);

        document.getElementById(props.id + '_form').submit();
        props.refetchData();
    }

    return (
        <div className="my-3">
            <details class="collapse rounded-b-none rounded-md w-full bg-gray-50 collapse-arrow">
                <summary class="collapse-title pt-2.5 pb-0">{props.name}</summary>
                <div class="collapse-content text-sm">
                    <p class="pb-4"><span className="font-bold">
                        Director: </span> {props.director}
                        <br />
                        <span className="font-bold">Actores: </span> {props.actors}
                    </p>
                </div>
            </details>
            <div className="flex text-sm font-bold bg-gray-50 rounded-t-none rounded-md pb-2.5 pl-4">
                <button class="text-blue-600" onClick={() => document.getElementById(props.id).showModal()}>
                    Editar
                </button>
                <dialog id={props.id} className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className=" absolute right-5 top-3">✕</button>
                        </form>
                        <h3 className="font-bold text-lg">{props.name}</h3>
                        <div className="py-2">
                            <Form onSubmit={handleEdit}>
                                <Field
                                    name="name"
                                    validate={[
                                        required('Este campo es obligatorio')
                                    ]}
                                >
                                    {(field, props) =>
                                        <>
                                            <input
                                                {...props}
                                                type="name"
                                                class="form-input"
                                                placeholder="Nombre de la compania"
                                                value={name()}
                                            />
                                            {field.error && <div class="form-error">{field.error}</div>}
                                        </>
                                    }
                                </Field>
                                <Field
                                    name="director"
                                    validate={[
                                        required('Este campo es obligatorio')
                                    ]}
                                >
                                    {(field, props) =>
                                        <>
                                            <input
                                                {...props}
                                                type="director"
                                                class="form-input"
                                                placeholder="Director"
                                                value={director()}
                                            />
                                            {field.error && <div class="form-error">{field.error}</div>}
                                        </>
                                    }
                                </Field>
                                <Field
                                    name="actors"
                                    validate={[
                                        required('Este campo es obligatorio')
                                    ]}
                                >
                                    {(field, props) =>
                                        <>
                                            <input
                                                {...props}
                                                type="actores"
                                                class="form-input"
                                                placeholder="Actores"
                                                value={actors()}
                                            />
                                            {field.error && <div class="form-error">{field.error}</div>}
                                        </>
                                    }
                                </Field>

                                <SubmitButton
                                    type="submit"
                                    class="form-button"
                                    loadingVariable={editForm.submitting}
                                >
                                    Subir cambios
                                </SubmitButton>
                            </Form>
                        </div>
                    </div>
                    <form method="dialog" id={props.id + '_form'} className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
                <span className="text-red-600 ml-2">Eliminar</span>
            </div>
        </div>
    );
}