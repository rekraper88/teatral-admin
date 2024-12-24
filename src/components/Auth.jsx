import { createForm, email as validateEmail, minLength, required, email } from "@modular-forms/solid";
import useAuthContext from "../context/AuthContext";
import { createSignal, Match, Switch } from "solid-js";

export default function Auth() {
    const [section, setSection] = createSignal('login');
    const [loginForm, { Form, Field }] = createForm();
    const [loginErrors, setLoginErrors] = createSignal([]);
    const [registerErrors, setRegisterErrors] = createSignal([]);
    const [registerForm] = createForm();
    const { login, register } = useAuthContext();

    const [email, setEmail] = createSignal('')
    const [password, setPassword] = createSignal('')

    const [rName, setRName] = createSignal('')
    const [rEmail, setREmail] = createSignal('')
    const [rPassword, setRPassword] = createSignal('')
    const [repeatPassword, setRepeatPassword] = createSignal('')

    const handleLogin = async (values, event) => {
        const res = await login(values)
        setLoginErrors(res);
    }

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
                            <h2 class="mb-3 mt-5">Iniciar sesion</h2>
                            <Form onSubmit={handleLogin}>
                                <Field
                                    name="email"
                                >
                                    {(field, props) =>
                                        <>
                                            <input
                                                {...props}
                                                type="email"
                                                class="form-input"
                                                placeholder="Su correo electronico"
                                                value={email()}
                                                on:change={() => setEmail(field.value)}
                                            />
                                            {field.error && <div class="form-error">{field.error}</div>}
                                            {loginErrors().email && <div class="form-error">{loginErrors().email}</div>}
                                        </>
                                    }
                                </Field>
                                <Field
                                    name="password"
                                >
                                    {(field, props) =>
                                        <>
                                            <input
                                                {...props}
                                                type="password"
                                                class="form-input"
                                                placeholder="Su contrasena"
                                                value={password()}
                                                on:change={() => setPassword(field.value)}
                                            />
                                            {field.error && <div class="form-error">{field.error}</div>}
                                            {loginErrors().password && <div class="form-error">{loginErrors().password}</div>}
                                        </>
                                    }
                                </Field>
                                <button type="submit" className="form-button" disabled={loginForm.submitting}>
                                    {loginForm.submitting ?
                                        <span class="loading loading-spinner loading-md"></span>
                                        :
                                        'Iniciar sesion'
                                    }
                                </button>
                            </Form>
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
                                        <>
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
                                        </>
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
                                <button type="submit" className="form-button" disabled={registerForm.submitting}>
                                    {registerForm.submitting ?
                                        <span class="loading loading-spinner loading-md"></span>
                                        :
                                        'Crear cuenta'
                                    }
                                </button>
                            </Form>
                        </Match>
                    </Switch>
                </div>
            </div>
        </div>
    );
}