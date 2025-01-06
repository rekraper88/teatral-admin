import { createForm } from "@modular-forms/solid";
import SubmitButton from "../SubmitButton";
import { csrf, request } from "../../lib/utils";

export function DeleteRoom(props) {
    const [deleteRoomForm, { Form }] = createForm();
    const handleDelete = async id => {
        try {
            await csrf();
            await request.delete('/rooms/' + id);

            document.getElementById(id + '_delete_form').submit();

            if (props.finalAction) {
                props.finalAction();
            }
        } catch (error) {
            alert(error)
        }
    }

    return (
        <>
            <button onClick={() => document.getElementById(props.id).showModal()}>
                {props.btn}
            </button>
            <dialog id={props.id} className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className=" absolute right-5 top-3">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Eliminar {props.name}</h3>
                    <div className="py-2">
                        <Form onSubmit={() => handleDelete(props.id)}>
                            <p className="pb-2">Esta seguro que quiere eliminar esta sala? Esta accion es irreversible!</p>
                            <SubmitButton
                                type="submit"
                                class="form-button !btn-error !text-white"
                                loadingVariable={deleteRoomForm.submitting}
                            >
                                Eliminar sala
                            </SubmitButton>
                        </Form>
                    </div>
                </div>
                <form method="dialog" id={props.id + '_delete_form'} className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}