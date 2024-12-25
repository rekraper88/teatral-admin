export default function Register() {
    const [loginForm, { Form, Field}] = use
    return (
        <>
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
        </>
    );
}