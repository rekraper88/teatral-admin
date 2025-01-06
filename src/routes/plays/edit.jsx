import { createForm } from "@modular-forms/solid";
import SubmitButton from "../../components/SubmitButton";
import { createStore } from "solid-js/store";
import { createEffect, createResource, createSignal, For, Match, Show, Switch } from "solid-js";
import NewCompanyForm from "../../components/Company/NewCompanyForm";
import { csrf, request } from "../../lib/utils";
import { useNavigate, useParams } from "@solidjs/router";
import Loading from "../../components/Loading";


const fetchPlay = async id => {
    const response = await request.get('/plays/' + id + '/edit');
    return response.data;
}

export default function EditPlay() {
    const [createPlayForm, { Form, Field }] = createForm();
    const params = useParams();
    const navigate = useNavigate();

    const [play] = createResource(() => fetchPlay(params.id));


    const handlePlayEdit = async (values, event) => {       
        try {
            await request.put('/plays/' + params.id, values);
            navigate('/obras/' + params.id)
        } catch (error) {
            alert(error);
        }
    }

    return (
        <Switch>
            <Match when={play.loading}>
                <Loading />
            </Match>
            <Match when={play.error}>
                {play.error}
            </Match>
            <Match when={play()}>
                <div>
                    <div className="flex items-center">
                        <a href="/obras">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                            </svg>
                        </a>
                        <h2 class="ml-3">Editar obra</h2>
                    </div>
                    <Form onSubmit={handlePlayEdit}>
                        <Field
                            name="title"
                        >
                            {(field, props) =>
                                <div class="form-container">
                                    <label for="title">Titulo</label>
                                    <input
                                        {...props}
                                        type="text"
                                        id="title"
                                        class="form-input"
                                        value={play().title}
                                    />
                                    {field.error && <div class="form-error">{field.error}</div>}
                                </div>
                            }
                        </Field>
                        <Field
                            name="argument"
                        >
                            {(field, props) =>
                                <div class="form-container">
                                    <label for="argument">Argumento</label>
                                    <textarea
                                        {...props}
                                        type="text"
                                        id="argument"
                                        class="form-input !max-h-32 !h-32 pt-2"
                                        value={play().argument}
                                    />
                                    {field.error && <div class="form-error">{field.error}</div>}
                                </div>
                            }
                        </Field>
                        <Field
                            name="author"
                        >
                            {(field, props) =>
                                <div class="form-container">
                                    <label for="author">Autor</label>
                                    <input
                                        {...props}
                                        type="text"
                                        id="author"
                                        class="form-input"
                                        value={play().author}
                                    />
                                    {field.error && <div class="form-error">{field.error}</div>}
                                </div>
                            }
                        </Field>
                        <Field
                            name="duration"
                        >
                            {(field, props) =>
                                <div class="form-container">
                                    <label for="duration">Duracion (en minutos)</label>
                                    <input
                                        {...props}
                                        type="number"
                                        id="duration"
                                        class="form-input"
                                        value={play().duration}
                                    />
                                    {field.error && <div class="form-error">{field.error}</div>}
                                </div>
                            }
                        </Field>
                        <SubmitButton
                            type="submit"
                            class="form-button"
                            loadingVariable={createPlayForm.submitting}
                        >
                            Actualizar
                        </SubmitButton>
                    </Form>
                </div>
            </Match>
        </Switch>
    );
}