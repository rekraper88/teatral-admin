import { createForm, required } from "@modular-forms/solid";
import SubmitButton from "../SubmitButton";
import { createSignal } from "solid-js";
import { csrf, request } from "../../lib/utils";

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

    const handleDelete = async () => {
        await csrf();
        await request.delete('/companies/' + props.companyId);

        document.getElementById(props.id + '_delete_form').submit();
        props.refetchData();

        /** TODO: DELETE ALL THE PLAYS BY THE COMPANY */
    }

    return (
        <div className="my-6">
            <details class="collapse rounded-b-none rounded-md w-full bg-gray-50 collapse-arrow relative z-1">
                <summary class="collapse-title pt-2.5 pb-0 font-semibold">{props.name}</summary>
                <div class="collapse-content">
                    <p class="pb-4"><span className="font-semibold">
                        Director: </span> {props.director}
                        <br />
                        <span className="font-semibold">Actores: </span> {props.actors}
                    </p>
                </div>
            </details>
            <div className="text-sm bg-gray-50 rounded-t-none rounded-md -my-3 pb-2.5 px-[0.92rem] relative z-2">
                <div className="flex justify-between">
                    <div class="text-sm text-gray-600">
                        Creado el {new Date(props.createdAt).getDay()}/{new Date(props.createdAt).getMonth()}/{new Date(props.createdAt).getFullYear()}
                    </div>
                    <div class="dropdown dropdown-end rounded-md">
                        <div tabindex="0" role="button" class="cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-black">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                        </div>
                        <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-lg z-[1] w-52 p-1 shadow">
                            <li><a class="rounded-md block">
                                <button class="text-blue-600 block w-full h-full" onClick={() => document.getElementById(props.id).showModal()}>
                                    Editar
                                </button>
                                <dialog id={props.id} className="modal">
                                    <div className="modal-box">
                                        <form method="dialog">
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
                            </a></li>
                            <li><a class="rounded-md block">
                                <button class="text-red-600 block w-full h-full" onClick={() => document.getElementById(props.id + '_delete').showModal()}>
                                    Eliminar
                                </button>
                                <dialog id={props.id + '_delete'} className="modal">
                                    <div className="modal-box">
                                        <form method="dialog">
                                            <button className=" absolute right-5 top-3">✕</button>
                                        </form>
                                        <h3 className="font-bold text-lg">Eliminar {props.name}</h3>
                                        <div className="py-2">
                                            <Form onSubmit={handleDelete}>
                                                <p className="pb-2">Esta seguro que quiere eliminar esta compania? Esta accion es irreversible!</p>
                                                <SubmitButton
                                                    type="submit"
                                                    class="form-button !btn-error !text-white"
                                                    loadingVariable={editForm.submitting}
                                                >
                                                    Eliminar compania
                                                </SubmitButton>
                                            </Form>
                                        </div>
                                    </div>
                                    <form method="dialog" id={props.id + '_delete_form'} className="modal-backdrop">
                                        <button>close</button>
                                    </form>
                                </dialog>
                            </a></li>
                        </ul>
                    </div>
                </div>


                {/* <button class="text-blue-600" onClick={() => document.getElementById(props.id).showModal()}>
                    Editar
                </button>
                <dialog id={props.id} className="modal">
                    <div className="modal-box">
                        <form method="dialog">
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
                <button class="text-red-600 ml-2" onClick={() => document.getElementById(props.id + '_delete').showModal()}>
                    Eliminar
                </button>
                <dialog id={props.id + '_delete'} className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            <button className=" absolute right-5 top-3">✕</button>
                        </form>
                        <h3 className="font-bold text-lg">Eliminar {props.name}</h3>
                        <div className="py-2">
                            <Form onSubmit={handleDelete}>
                                <p className="pb-2">Esta seguro que quiere eliminar esta compania? Esta accion es irreversible!</p>
                                <SubmitButton
                                    type="submit"
                                    class="form-button !btn-error !text-white"
                                    loadingVariable={editForm.submitting}
                                >
                                    Eliminar compania
                                </SubmitButton>
                            </Form>
                        </div>
                    </div>
                    <form method="dialog" id={props.id + '_delete_form'} className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog> */}
            </div>
        </div>
    );
}