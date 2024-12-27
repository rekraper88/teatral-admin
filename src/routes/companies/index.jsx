import { createEffect, createResource, createSignal, Match, Switch } from "solid-js"
import { request } from "../../lib/utils";
import Company from "../../components/Company";

const fetchCompanies = async () => {
    const response = await request.get('/companies');
    return response.data;
}

export default function Companies() {
    const [companies] = createResource(fetchCompanies);

    return (
        <>
            <div className="flex justify-between">
                <h2>Companias</h2>
                <a href="/companias/crear" className="btn btn-primary">Crear</a>
            </div>
            <Switch>
                <Match when={companies.loading}>
                    <div className="text-center mt-4">
                        <span className="loading loading-spinner loading-lg"></span>
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
                            <Company name={item.name} director={item.director} actors={item.actors} />
                            // <div class="my-3 px-4 py-3 bg-gray-50 rounded-md w-full">
                            //     <div className="flex justify-between">
                            //         <div>
                            //             <div className="font-bold">{item.name}</div>
                            //             <div class="text-sm">{item.director}</div>
                            //         </div>
                            //         <div>
                            //             <button onClick={() => document.getElementById(index).showModal()}>
                            //                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            //                     <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                            //                 </svg>
                            //             </button>
                            //             <dialog id={index} className="modal">
                            //                 <div className="modal-box">
                            //                     <form method="dialog">
                            //                         {/* if there is a button in form, it will close the modal */}
                            //                         <button className=" absolute right-5 top-3">✕</button>
                            //                     </form>
                            //                     <h3 className="font-bold text-lg">{item.name}</h3>
                            //                     <p className="py-4"><span className="font-bold">
                            //                         Director: </span> {item.director}
                            //                         <br />
                            //                         <span className="font-bold">Actores: </span> {item.actors}
                            //                     </p>
                            //                     <p></p>
                            //                 </div>
                            //                 <form method="dialog" className="modal-backdrop">
                            //                     <button>close</button>
                            //                 </form>
                            //             </dialog>
                            //         </div>
                            //     </div>
                            // </div>
                        }
                    </For>
                </Match>
            </Switch >
        </>
    )
}