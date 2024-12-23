import { useNavigate } from "@solidjs/router";
import { createContext, createSignal, useContext } from "solid-js";
import { csrf, request } from "../lib/utils";

const AuthContext = createContext();

export const AuthProvider = props => {
    const [user, setUser] = createSignal(null);
    const [errors, setErrors] = createSignal([]);

    const getUser = async () => {
        const { data } = await request('/api/user');
        setUser(data)
    }

    const login = async values => {
        const navigate = useNavigate();
        await csrf();
        try {
            const res = await request.post('/login', values)
            console.log(res);
            
            getUser();
            navigate('/');
        } catch (error) {
            console.log(error);
            
            if (error.response.status === 422) {
                setErrors(error.response.data.errors)
                return error.response.data.errors;
            }
        }
    }

    const register = async values => {
        const navigate = useNavigate();
        await csrf();
        try {
            await request.post('/register', values);
            getUser();
            navigate('/');
        } catch (error) {
            if (error.response.status === 422) {
                setErrors(error.response.data.errors)
                return error.response.data.errors;
            }
        }
    }

    return (
        <AuthContext.Provider value={{user, errors, login, register, getUser}}>{props.children}</AuthContext.Provider>
    )
}

export default function useAuthContext() {
    return useContext(AuthContext)
};