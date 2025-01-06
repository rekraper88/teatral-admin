import { createForm } from "@modular-forms/solid";
import SubmitButton from "../../components/SubmitButton";
import { createStore } from "solid-js/store";
import { createEffect, createResource, createSignal, For, Match, Show, Switch } from "solid-js";
import CompanyForm from "../../components/Company/CompanyForm";
import { csrf, request } from "../../lib/utils";
import { useNavigate } from "@solidjs/router";

const fetchCompanies = async () => {
    const response = await request.get('/companies');
    return response.data;
}

export default function NewPlay() {
    const [createPlayForm, { Form, Field }] = createForm();
    const [values, setValues] = createStore({});
    const [section, setSection] = createSignal('first');
    const [secondSection, setSecondSection] = createSignal('automatic');
    const navigate = useNavigate();
    const [companies] = createResource(fetchCompanies);
    const [selectedCompany, setSelectedCompany] = createSignal(companies[0]);

    const [formLoading, setFormLoading] = createSignal(false);

    const changeSection = () => {
        const title = createPlayForm.internal.fields.title.value.get();
        const argument = createPlayForm.internal.fields.argument.value.get();
        const author = createPlayForm.internal.fields.author.value.get();
        const duration = createPlayForm.internal.fields.duration.value.get();

        setValues({ title, argument, author, duration });
        setSection('second');
    }

    const createPlay = async (response) => {
        try {
            if (secondSection() == 'manual') {
                const play = await request.post('/plays', { ...values, company_id: response.data.id });

                navigate('/obras/' + play.data.id);
            }
        } catch (error) {
            console.log(error);
            alert(error)
        }
    }

    const handlePlayCreate = async () => {
        setFormLoading(true)
        try {
            const play = await request.post('/plays', { ...values, company_id: selectedCompany().id });
            setFormLoading(false);
            navigate('/obras/' + play.data.id);
        } catch (error) {
            setFormLoading(false);
            alert(error);
        }
    }

    createEffect(() => {
        if (companies()) {
            setSelectedCompany(companies()[0])
        }
    }, companies())

    return (
        <div>
            <div className="flex items-center">
                <a href="/obras">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                </a>
                <h2 class="ml-3">Agregar obra</h2>
            </div>
            <Switch>
                <Match when={section() == "first"}>
                    <Form>
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
                                    />
                                    {field.error && <div class="form-error">{field.error}</div>}
                                </div>
                            }
                        </Field>
                        <SubmitButton
                            type="button"
                            class="form-button"
                            loadingVariable={createPlayForm.submitting}
                            onClick={changeSection}
                        >
                            Siguiente
                        </SubmitButton>
                    </Form>
                </Match>
                <Match when={section() == "second"}>
                    <div class="my-4 rounded-md bg-gray-50 px-6 py-4">
                        <p class="my-1"><span className="font-semibold">Titulo</span>: {values.title}</p>
                        <p class="my-1"><span className="font-semibold">Argumento</span>: {values.argument}</p>
                        <p class="my-1"><span className="font-semibold">Autor</span>: {values.author}</p>
                        <p class="my-1"><span className="font-semibold">Duracion</span>: {values.duration} minutos</p>
                    </div>
                    <h3 class="mt-8">
                        {
                            secondSection() == "manual" ?
                                "Informacion de compania"
                                :
                                "Eliga la compania asociada con la obra"
                        }
                    </h3>
                    <div role="tablist" class="tabs tabs-bordered w-80 my-3">
                        <a role="tab" class={(secondSection() == "manual" && "tab-active") + " tab"} on:click={() => setSecondSection('manual')}>Manual</a>
                        <a role="tab" class={(secondSection() == "automatic" && "tab-active") + " tab"} on:click={() => setSecondSection('automatic')}>Automatico</a>
                    </div>
                    <Show when={secondSection() == "manual"}>
                        <CompanyForm finalAction={createPlay} />
                    </Show>
                    <Show when={secondSection() == "automatic" && !companies.loading}>
                        <div className="px-4 py-1.5 rounded-md border border-gray-100 mb-2">
                            <For each={companies()}>
                                {(item, index) =>
                                    <div onClick={() => setSelectedCompany(item)} className={" border border-gray-50 px-4 py-2 bg-gray-50 rounded-md my-3 font-medium cursor-pointer " + (selectedCompany() == item && "!border-blue-600 text-blue-600")}>
                                        {item.name}
                                    </div>
                                }
                            </For>
                        </div>
                        <SubmitButton
                            class="form-button"
                            onClick={handlePlayCreate}
                            loadingVariable={formLoading()}
                        >
                            Crear obra
                        </SubmitButton>
                    </Show>
                </Match>
            </Switch>
        </div>
    );
}