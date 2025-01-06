import { createForm, required } from "@modular-forms/solid";
import SubmitButton from "../../components/SubmitButton";
import { csrf, request } from "../../lib/utils";
import { useNavigate, useParams } from "@solidjs/router";
import CompanyForm from "../../components/Company/CompanyForm";
import { createResource } from "solid-js";
import Loading from "../../components/Loading";

const fetchCompany = async id => {
    try {
        const response = await request.get('/companies/' + id + '/edit')
        return response.data;
    } catch (error) {
        alert(error);
        console.log(error);
    }
}

export default function EditCompany() {
    const params = useParams();
    const [company] = createResource(() => fetchCompany(params.id));

    return (
        <Switch>
            <Match when={company.loading}>
                <Loading />
            </Match>
            <Match when={company.error}>
                {company.error}
            </Match>
            <Match when={company()}>
                <div className="flex items-center">
                    <a href="/companias">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                        </svg>
                    </a>
                    <h2 class="ml-3">Actualizar compania</h2>
                </div>
                <CompanyForm company={company()} edit={true}/>
            </Match>
        </Switch>
    )
}