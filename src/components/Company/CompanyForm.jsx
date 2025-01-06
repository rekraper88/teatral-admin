import { createForm, required } from "@modular-forms/solid";
import { useNavigate } from "@solidjs/router";
import { csrf, request } from "../../lib/utils";
import SubmitButton from "../SubmitButton";

export default function CompanyForm({ finalAction, company, edit}) {
    const [companyForm, { Form, Field }] = createForm();

    const navigate = useNavigate();

    const handleCreate = async (values, event) => {
        if (edit) {
            await request.put('/companies/' + company.id, values).then(res => {
                if (finalAction) {
                    finalAction(res);
                } else {
                    navigate('/companias/' + company.id);
                }
            });
        } else {
            await request.post('/companies', values).then(res => {
                if (finalAction) {
                    finalAction(res);
                } else {
                    navigate('/companias');
                }
            });
        }
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
                            value={company?.name}
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
                            value={company?.director}
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
                            value={company?.actors}
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
                {
                    edit ? 'Actualizar compania' : 'Crear compania'
                }
            </SubmitButton>
        </Form>
    );
}