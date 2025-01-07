import { createSignal } from "solid-js";
import useCarteleraContext from "../context/CarteleraContext";
import SubmitButton from "./SubmitButton";

export default function CarteleraPlay({ item, parentAction }) {
    const [removalLoading, setRemovalLoading] = createSignal(false);
    const { removeFromCartelera, setIdRemovedFromCartelera, idRemovedFromCartelera } = useCarteleraContext();


    const eliminar = async () => {
        setRemovalLoading(true);
        await removeFromCartelera(item.cartelera_id);
        setRemovalLoading(false);
        parentAction();
        // set the id of the removed item (from the cartelera) so that its state can be changed in the plays section
        setIdRemovedFromCartelera(item.id);
    }

    return (
        <div className="my-3 rounded-md px-4 py-2 bg-gray-100 flex justify-between">
            <div className="font-medium">
                {item.title}
            </div>
            <SubmitButton
                type="submit"
                onClick={eliminar}
                loadingVariable={removalLoading()}
                className="btn btn-error text-white block"
            >
                Eliminar de cartelera
            </SubmitButton>
        </div>
    );
}