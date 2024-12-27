import { createEffect, createResource, createSignal, Match, Switch } from "solid-js"
import { request } from "../../lib/utils";
import Company from "../../components/Company";

const fetchCompanies = async () => {
    const response = await request.get('/companies');
    return response.data;
}

export default function Companies() {
    const [refetch, setRefetch] = createSignal(0);
    const [companies] = createResource(refetch, fetchCompanies);

    const refetchData = () => setRefetch(prevRefetch => prevRefetch + 1);

    return (
        <>
            <div className="flex justify-between">
                <h2>Companias</h2>
                <a href="/companias/crear" className="btn btn-primary">Crear</a>
            </div>
            <Switch>
                <Match when={companies.loading}>
                    <div className="text-center mt-4">
                    <div class="skeleton h-12 w-full rounded-md  my-3"></div>
                    <div class="skeleton h-12 w-full rounded-md  my-3"></div>
                    <div class="skeleton h-12 w-full rounded-md  my-3"></div>
                    <div class="skeleton h-12 w-full rounded-md  my-3"></div>
                    <div class="skeleton h-12 w-full rounded-md  my-3"></div>
                        {/* <span className="loading loading-spinner loading-lg"></span> */}
                    </div>
                </Match>
                <Match when={companies.error}>
                    <div className="mt-2">
                        Hubo un error: {companies.error}
                    </div>
                </Match>
                <Match when={companies()}>
                    <For each={companies()}>
                        {(item, index) =>
                            <Company
                                refetchData={refetchData}
                                id={index}
                                companyId={item.id}
                                name={item.name}
                                director={item.director}
                                actors={item.actors}
                                createdAt={item.created_at}
                            />
                        }
                    </For>
                </Match>
            </Switch >
        </>
    )
}