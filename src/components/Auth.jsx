import { createForm, email as validateEmail, minLength, required, email } from "@modular-forms/solid";
import useAuthContext from "../context/AuthContext";
import { createSignal, Match, Switch } from "solid-js";
import Login from "./forms/Login";
import SubmitButton from "./SubmitButton";

export default function Auth() {
    const [section, setSection] = createSignal('login');
    const [loginErrors, setLoginErrors] = createSignal([]);
    const [registerErrors, setRegisterErrors] = createSignal([]);
    const [registerForm, { Form, Field}] = createForm();
    const { login, register } = useAuthContext();

    const [rName, setRName] = createSignal('')
    const [rEmail, setREmail] = createSignal('')
    const [rPassword, setRPassword] = createSignal('')
    const [repeatPassword, setRepeatPassword] = createSignal('')

    const handleRegister = async (values, event) => {
        const res = await register(values)
        setRegisterErrors(res);
    }
    return (
        <div class="h-screen">
            <div class="-mt-16 flex h-screen justify-center items-center">
                <div className="w-96">
                    <div role="tablist" class="tabs tabs-bordered">
                        <a role="tab" class={(section() == "login" && "tab-active") + " tab"} on:click={() => setSection('login')}>Iniciar sesion</a>
                        <a role="tab" class={(section() == "register" && "tab-active") + " tab"} on:click={() => setSection('register')}>Registrarse</a>
                    </div>
                    <Switch>
                        <Match when={section() == "login"}>
                            <Login />
                        </Match>
                        <Match when={section() == "register"}>
                            <h2 class="mb-3 mt-5">Registrarse</h2>
                            <Form onSubmit={handleRegister}>
                                <Field
                                    name="name"
                                    validate={[
                                        required('Este campo es obligatorio'),
                                    ]}
                                >
                                    {(field, props) =>
                                        <div class="form-container">
                                            <input
                                                {...props}
                                                type="name"
                                                class="form-input"
                                                placeholder="Su nombre"
                                                value={rName()}
                                                on:change={() => setRName(field.value)}
                                            />
                                            {field.error && <div class="form-error">{field.error}</div>}
                                            {registerErrors().name && <div class="form-error">{registerErrors().name}</div>}
                                        </div>
                                    }
                                </Field>
                                <Field
                                    name="email"
                                    validate={[
                                        required('Este campo es obligatorio'),
                                        validateEmail('Su correo electronico no es valido')
                                    ]}
                                >
                                    {(field, props) =>
                                        <>
                                            <input
                                                {...props}
                                                type="email"
                                                class="form-input"
                                                placeholder="Su correo electronico"
                                                value={rEmail()}
                                                on:change={() => setREmail(field.value)}
                                            />
                                            {field.error && <div class="form-error">{field.error}</div>}
                                            {registerErrors().email && <div class="form-error">{registerErrors().email}</div>}
                                        </>
                                    }
                                </Field>
                                <Field
                                    name="password"
                                    validate={[
                                        required('Este campo es obligatorio'),
                                        minLength(6, 'Su contrasena debe tener por lo menos 8 caracteres')
                                    ]}
                                >
                                    {(field, props) =>
                                        <>
                                            <input
                                                {...props}
                                                type="password"
                                                class="form-input"
                                                placeholder="Su contrasena"
                                                value={rPassword()}
                                                on:change={() => setRPassword(field.value)}
                                            />
                                            {field.error && <div class="form-error">{field.error}</div>}
                                            {registerErrors().password && <div class="form-error">{registerErrors().password}</div>}
                                        </>
                                    }
                                </Field>
                                <Field
                                    name="password_confirmation"
                                    validate={[
                                        required('Este campo es obligatorio'),
                                        minLength(6, 'Su contrasena debe tener por lo menos 6 caracteres'),
                                    ]}
                                >
                                    {(field, props) =>
                                        <>
                                            <input
                                                {...props}
                                                type="password"
                                                class="form-input"
                                                placeholder="Confirme su contrasena"
                                                value={repeatPassword()}
                                                on:change={() => setRepeatPassword(field.value)}
                                            />
                                            {field.error && <div class="form-error">{field.error}</div>}
                                            {registerErrors().password_confirmation && <div class="form-error">{registerErrors().password_confirmation}</div>}
                                        </>
                                    }
                                </Field>
                                <SubmitButton type="submit" className="form-button" loadingVariable={registerForm.submitting}>Crear Cuenta</SubmitButton>
                                {/* <button type="submit" className="form-button" disabled={registerForm.submitting}>
                                    {registerForm.submitting ?
                                        <span class="loading loading-spinner loading-md"></span>
                                        :
                                        'Crear cuenta'
                                    }
                                </button> */}
                            </Form>
                        </Match>
                    </Switch>
                </div>
            </div>
        </div>
    );
}