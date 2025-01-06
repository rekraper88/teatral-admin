import { createForm, required } from "@modular-forms/solid";
import { useNavigate } from "@solidjs/router";
import { csrf, request } from "../../lib/utils";
import SubmitButton from "../SubmitButton";

export default function NewCompanyForm(props) {
    const [companyForm, { Form, Field }] = createForm();

    const navigate = useNavigate();

    const handleCreate = async (values, event) => {
        await csrf();
        await request.post('/companies', values).then(res => {
            if (props.finalAction) {
                props.finalAction(res);
            } else {
                navigate('/companias');
            }
        });
    }

    return (
        <Form onSubmit={handleCreate}>
            <Field
                name="name"
                validate={[
                    required('Este campo es obligatorio')
                ]}
            >
                {(field, props) =>
                    <div class="form-container">
                        <label htmlFor="name">Nombre de la compania</label>
                        <input
                            {...props}
                            type="text"
                            id="name"
                            class="form-input"
                        />
                        {field.error && <div class="form-error">{field.error}</div>}
                    </div>
                }
            </Field>
            <Field
                name="director"
                validate={[
                    required('Este campo es obligatorio')
                ]}
            >
                {(field, props) =>
                    <div class="form-container">
                        <label htmlFor="actores">Director</label>
                        <input
                            {...props}
                            type="text"
                            id="director"
                            class="form-input"
                        />
                        {field.error && <div class="form-error">{field.error}</div>}
                    </div>
                }
            </Field>
            <Field
                name="actors"
                validate={[
                    required('Este campo es obligatorio')
                ]}
            >
                {(field, props) =>
                    <div class="form-container">
                        <label htmlFor="actores">Actores</label>
                        <input
                            {...props}
                            type="text"
                            id="actores"
                            class="form-input"
                        />
                        {field.error && <div class="form-error">{field.error}</div>}
                    </div>
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
    );
}