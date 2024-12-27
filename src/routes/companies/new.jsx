import { createForm, required } from "@modular-forms/solid";
import SubmitButton from "../../components/SubmitButton";
import { csrf, request } from "../../lib/utils";
import { useNavigate } from "@solidjs/router";

export default function New() {
    const [companyForm, { Form, Field }] = createForm();
    const navigate = useNavigate();

    const handleCreate = async (values, event) => {
        await csrf();
        await request.post('/companies', values);

        navigate('/companias');
    }

    return (
        <>
            <div className="flex items-center">
                <a href="/companias">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                </a>
                <h2 class="ml-3">Agregar compania</h2>
            </div>
            <Form onSubmit={handleCreate}>
                <Field
                    name="name"
                    validate={[
                        required('Este campo es obligatorio')
                    ]}
                >
                    {(field, props) =>
                        <>
                            <input
                                {...props}
                                type="name"
                                class="form-input"
                                placeholder="Nombre de la compania"

                            />
                            {field.error && <div class="form-error">{field.error}</div>}
                        </>
                    }
                </Field>
                <Field
                    name="director"
                    validate={[
                        required('Este campo es obligatorio')
                    ]}
                >
                    {(field, props) =>
                        <>
                            <input
                                {...props}
                                type="director"
                                class="form-input"
                                placeholder="Director"

                            />
                            {field.error && <div class="form-error">{field.error}</div>}
                        </>
                    }
                </Field>
                <Field
                    name="actors"
                    validate={[
                        required('Este campo es obligatorio')
                    ]}
                >
                    {(field, props) =>
                        <>
                            <input
                                {...props}
                                type="actores"
                                class="form-input"
                                placeholder="Actores"

                            />
                            {field.error && <div class="form-error">{field.error}</div>}
                        </>
                    }
                </Field>

                <SubmitButton
                    type="submit"
                    class="form-button"
                    loadingVariable={companyForm.submitting}
                >
                    Crear compania
                </SubmitButton>
            </Form>
        </>
    )
}