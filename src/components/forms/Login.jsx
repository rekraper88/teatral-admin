import { createForm } from "@modular-forms/solid";
import { createSignal } from "solid-js";
import SubmitButton from "../SubmitButton";
import useAuthContext from "../../context/AuthContext";

export default function Login({ props }) {
    const [form, { Form, Field}] = createForm();
    const [errors, setErrors] = createSignal('');
    const { login }  = useAuthContext();

    const [email, setEmail] = createSignal('')
    const [password, setPassword] = createSignal('')

    
    const handleLogin = async (values, event) => {
        const res = await login(values)
        setErrors(res);
    }

    return (
        <>
            <h2 class="mb-3 mt-5">Iniciar sesion</h2>
            <Form onSubmit={handleLogin}>
                <Field
                    name="email"
                >
                    {(field, props) =>
                        <div class="form-container">
                            <input
                                {...props}
                                type="email"
                                class="form-input"
                                placeholder="Su correo electronico"
                                value={email()}
                                on:change={() => setEmail(field.value)}
                            />
                            {field.error && <div class="form-error">{field.error}</div>}
                            {errors().email && <div class="form-error">{errors().email}</div>}
                        </div>
                    }
                </Field>
                <Field
                    name="password"
                >
                    {(field, props) =>
                        <div class="form-container">
                            <input
                                {...props}
                                type="password"
                                class="form-input"
                                placeholder="Su contrasena"
                                value={password()}
                                on:change={() => setPassword(field.value)}
                            />
                            {field.error && <div class="form-error">{field.error}</div>}
                            {errors().password && <div class="form-error">{errors().password}</div>}
                        </div>
                    }
                </Field>
                <SubmitButton
                    type="submit"
                    class="form-button"
                    loadingVariable={form.submitting}
                >
                    Iniciar sesion
                </SubmitButton>
            </Form>
        </>
    );
}