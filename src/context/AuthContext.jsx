import { useNavigate } from "@solidjs/router";
import { createContext, createEffect, createSignal, useContext } from "solid-js";
import { csrf, request } from "../lib/utils";

const AuthContext = createContext();

export const AuthProvider = props => {
    const [user, setUser] = createSignal(null);
    const [errors, setErrors] = createSignal([]);

    const getUser = async () => {
        const { data } = await request('/api/user');
        setUser(data)
        return data;
    }

    const login = async values => {
        await csrf();
        try {
            const res = await request.post('/login', values)
            // console.log(res);

            await getUser();
            window.location.reload();

            return { success: true }
        } catch (error) {
            if (error.response.status === 422) {
                setErrors(error.response.data.errors)
                return error.response.data.errors;
            }
        }
    }

    const register = async values => {
        await csrf();
        try {
            await request.post('/register', values);
            await getUser();
            window.location.reload();
            return { success: true }
        } catch (error) {
            if (error.response.status === 422) {
                setErrors(error.response.data.errors)
                return error.response.data.errors;
            }
        }
    }

    const logout = async () => {
        await request.post('/logout').then(() => {
            setUser(null);
            window.location.reload();
        });

        return { success: true }
    }

    // createEffect(() => {
    //     if (!user()) {
    //         getUser();
    //     }
    // })

    return (
        <AuthContext.Provider value={{ user, errors, login, register, getUser, logout }}>{props.children}</AuthContext.Provider>
    )
}

export default function useAuthContext() {
    const value = useContext(AuthContext);

    if (!value) {
        throw new Error("Missing context Provider");
    }

    return value;
};