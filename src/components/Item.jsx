import { createForm } from "@modular-forms/solid";
import SubmitButton from "./SubmitButton";
import { request } from "../lib/utils";
import { createEffect, createSignal, Show } from "solid-js";
import useCarteleraContext from "../context/CarteleraContext";

export default function Item({ item, finalAction, urlString, itemStr, cartelera }) {
    const [form, { Form }] = createForm();
    const [signState, setSignState] = createSignal(item.is_in_cartelera ? 'disabled' : 'agregar');
    const { addToCartelera, idRemovedFromCartelera, setNewPlayToAdd } = useCarteleraContext();

    const handleSubmit = async () => {
        try {
            await request.delete(urlString + item.id);
        } catch (error) {
            alert(error)
        }
        document.getElementById(item.id + '_delete_form').submit();
        finalAction();
    }

    const [signStateLoading, setSignStateLoading] = createSignal(false);

    createEffect(() => {
        //listen for changes of the id
        if (item.id == idRemovedFromCartelera()) {
            setSignState("agregar");
        }
    }, idRemovedFromCartelera);

    const cambiarEstadoCartelera = async () => {
        setSignStateLoading(true);
        const newItem = await addToCartelera(item.id);

        if (!newItem.error) {
            setSignState("disabled");
            setNewPlayToAdd(newItem);
        }
        setSignStateLoading(false);
    }

    return (
        <div className="my-6 px-4 py-2.5 w-full rounded-md bg-gray-50 flex items-start justify-between">
            <div>
                <a href={itemStr + 's/' + item.id} className="font-semibold">{item.title || item.name}</a>
                <Show when={cartelera}>
                    <Show when={signState() === "agregar"}>
                        <div className="my-2">
                            <SubmitButton loadingVariable={signStateLoading()} onClick={cambiarEstadoCartelera} className="btn text-gray-700 block">Agregar a cartelera</SubmitButton>
                        </div>
                    </Show>
                    <Show when={signState() === "disabled"}>
                        <div className="my-2">
                            <button class="btn btn-disabled italic">En cartelera</button>
                        </div>
                    </Show>
                </Show>
            </div>
            <div class="py-1">
                <a href={itemStr + 's/' + item.id + "/actualizar"}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                </a>
                <button onClick={() => document.getElementById(item.id).showModal()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mt-2 size-4 text-red-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </button>
                <dialog id={item.id} className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            <button className=" absolute right-5 top-3">✕</button>
                        </form>
                        <h3 className="font-bold text-lg">Eliminar {item.title || item.name}</h3>
                        <div className="py-2">
                            <Form onSubmit={handleSubmit}>
                                <p className="pb-2">Esta seguro que quiere eliminar esta {itemStr || "sala"}? Esta accion es irreversible!
                                    {itemStr == "compania" && "Todas las obras, horarios, y boletas asociadas con esta compania van a ser borradas."}
                                </p>
                                <SubmitButton
                                    type="submit"
                                    class="form-button !btn-error !text-white"
                                    loadingVariable={form.submitting}
                                >
                                    Eliminar {itemStr || "sala"}
                                </SubmitButton>
                            </Form>
                        </div>
                    </div>
                    <form method="dialog" id={item.id + '_delete_form'} className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
        </div>
    );
}