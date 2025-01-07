import { createContext, createSignal, useContext } from "solid-js";
import { csrf, request } from "../lib/utils";

const CarteleraContext = createContext();

export const CarteleraProvider = props => {
    const [refetchCartelera, setRefetchCartelera] = createSignal(0);
    const [idRemovedFromCartelera, setIdRemovedFromCartelera] = createSignal(0);
    const [newPlayToAdd, setNewPlayToAdd] = createSignal({});

    const getCartelera = async () => {
        try {
            const response = await request.get('/cartelera');
            return response.data;
        } catch (error) {
            alert(error)
        }
    }

    const addToCartelera = async (id) => {
        try {
            const response = await request.post('/cartelera', { play_id: id });
            if (response.data.error) {
                alert(response.data.error);
            }
            return response.data;
        } catch (error) {
            alert(error);
            return error;
        }
    }

    const removeFromCartelera = async id => {
        try {
            const response = await request.delete('/cartelera/' + id);
            return response.data;
        } catch (error) {
            alert(error);
            return error;
        }
    }

    return <CarteleraContext.Provider value={{
        getCartelera,
        addToCartelera,
        removeFromCartelera,
        refetchCartelera,
        idRemovedFromCartelera,
        setIdRemovedFromCartelera,
        newPlayToAdd,
        setNewPlayToAdd
    }}>
        {props.children}
    </CarteleraContext.Provider>
}

export default function useCarteleraContext() {
    const value = useContext(CarteleraContext);

    if (!value) {
        throw new Error("Missing context Provider");
    }

    return value;
}