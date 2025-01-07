import { useNavigate, useParams } from "@solidjs/router";
import { createEffect, createResource, createSignal, For, Match, Show, Switch } from "solid-js";
import { csrf, request } from "../../lib/utils";
import Loading from "../../components/Loading";
import { createForm } from "@modular-forms/solid";
import SubmitButton from "../../components/SubmitButton";

const fetchPlay = async (id) => {
    try {
        await csrf();
        const response = await request.get('/plays/' + id)
        return response.data;
    } catch (error) {
        alert(error);
    }
}

export default function Play() {
    const params = useParams();
    const [refetch, setRefetch] = createSignal(0);
    const [data] = createResource(refetch, () => fetchPlay(params.id))
    const [schedules, setSchedules] = createSignal({});
    const [addScheduleForm, { Form, Field }] = createForm();
    const [schedulesLoading, setSchedulesLoading] = createSignal(false);
    const [roomId, setRoomId] = createSignal();
    const [deleteScheduleLoading, setDeleteScheduleLoading] = createSignal(false);
    const navigate = useNavigate();
    const [deleteForm] = createForm();
    const [selectedCompany, setSelectedCompany] = createSignal(0);
    const [companies, setCompanies] = createSignal();
    const [companiesLoading, setCompaniesLoading] = createSignal(false);
    const [changeCompanyLoading, setChangeCompanyLoading] = createSignal(false);

    const deleteSchedule = async (e, id) => {
        e.preventDefault();
        setDeleteScheduleLoading(true);
        try {
            await request.delete('/schedules/' + id);
        } catch (error) {
            alert(error);
        }
        setDeleteScheduleLoading(false);
        document.getElementById(id + '_delete_form').submit();
        setRefetch(prevRefetch => prevRefetch + 1);
    }

    const chooseRoom = async (index) => {
        setRoomId(index);

        document.getElementById(index).showModal();
        setSchedulesLoading(true);
        const response = await request.get('/get_schedules_for_room?room_id=' + index);
        setSchedules(response.data.schedules);

        setSchedulesLoading(false);
    }

    const addSchedule = async (values, event) => {
        const startDate = new Date(values.day + 'T' + values.start)
        const endDate = new Date(values.day + 'T' + values.end)

        // newer is bigger
        if (schedules().length) {
            // check for overlap
            for (const schedule of schedules()) {
                const scheduleStartDate = new Date(schedule.day + 'T' + schedule.start_time)
                const scheduleEndDate = new Date(schedule.day + 'T' + schedule.end_time)

                if ((startDate <= scheduleEndDate && endDate >= scheduleStartDate)) {
                    alert('Hay horarios que conflican o estan muy justos');
                    return;
                } else {
                    break;
                }
            }
            await request.post('/schedules', { ...values, play_title: data().play.title, play_id: params.id, room_id: roomId() })
            document.getElementById(roomId() + '_close').submit();
            setRefetch(prevRefetch => prevRefetch + 1);
            return;
        } else {
            try {
                await request.post('/schedules', { ...values, play_title: data().play.title, play_id: params.id, room_id: roomId() })
                document.getElementById(roomId() + '_close').submit();
                setRefetch(prevRefetch => prevRefetch + 1);
            } catch (error) {
                alert(error);
            }
        }
    }

    const deletePlay = async () => {
        try {
            await request.delete('/plays/' + params.id);
        } catch (error) {
            alert(error)
        }
        document.getElementById('delete_modal_close').submit();
        navigate('/')
    }

    const openChangeCompanyModel = async () => {
        document.getElementById("change_company_modal").showModal();
        setCompaniesLoading(true);
        try {
            const response = await request.get('/companies');
            setCompanies(response.data);
            setCompaniesLoading(false);
        } catch (error) {
            alert(error);
            document.getElementById("change_company_modal_close").submit();
        }
    }

    const handleCompanyChange = async (values, event) => {
        setChangeCompanyLoading(true)
        try {
            await request.post('/change_company?play_id=' + data().play.id, { company_id: selectedCompany() });
            setRefetch(prevRefetch => prevRefetch + 1);
        } catch (error) {
            alert(error);
            setChangeCompanyLoading(false)
        }
        setChangeCompanyLoading(false)
        document.getElementById("change_company_modal_close").submit();
    }

    return (
        <Switch>
            <Match when={data.loading}>
                <Loading />
            </Match>
            <Match when={data.error}>
                {data.error}
            </Match>
            <Match when={data()}>
                <h2>{data().play.title}</h2>
                <div className="mb-2 flex items-center">
                    <a href={"/obras/" + params.id + "/actualizar"} class="text-sm mt-0.5 text-blue-600">Actualizar</a>
                    <div class="ml-3">
                        <button class="text-sm text-blue-600" onClick={() => openChangeCompanyModel()}>
                            Cambiar compania
                        </button>
                        <dialog id={"change_company_modal"} className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                    <button className=" absolute right-5 top-3">✕</button>
                                </form>
                                <h3 className="font-bold text-lg">Cambiar compania</h3>
                                <div className="py-2">
                                    <Form onSubmit={handleCompanyChange}>
                                        <Switch>
                                            <Match when={companiesLoading()}>
                                                <div className="-mt-5 mb-5">
                                                    <Loading />
                                                </div>
                                            </Match>
                                            <Match when={!companiesLoading()}>
                                                <For each={companies()}>
                                                    {(item, index) =>
                                                        <div className={"flex justify-between px-5 py-3 rounded-md border border-gray-100 my-3 " + (selectedCompany() == item.id && "border-blue-600 text-blue-600")}>
                                                            <span class="font-medium">{item.name}</span>
                                                            <button type="button" onClick={() => setSelectedCompany(item.id)} class={"btn " + (selectedCompany() == item.id && "border-blue-600 text-blue-600")}>Elegir</button>
                                                        </div>
                                                    }
                                                </For>
                                            </Match>
                                        </Switch>
                                        <SubmitButton
                                            type="submit"
                                            class="form-button"
                                            loadingVariable={changeCompanyLoading()}
                                        >
                                            Cambiar compania
                                        </SubmitButton>
                                    </Form>
                                </div>
                            </div>
                            <form method="dialog" id="change_company_modal_close" className="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>
                    </div>
                    <div class="ml-3">
                        <button class="text-sm text-red-600" onClick={() => document.getElementById("delete_modal").showModal()}>
                            Eliminar
                        </button>
                        <dialog id={"delete_modal"} className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                    <button className=" absolute right-5 top-3">✕</button>
                                </form>
                                <h3 className="font-bold text-lg">Eliminar {data().play.title}</h3>
                                <div className="py-2">
                                    <Form onSubmit={deletePlay}>
                                        <p className="pb-2">Esta seguro que quiere eliminar esta obra? Esta accion es irreversible!</p>
                                        <SubmitButton
                                            type="submit"
                                            class="form-button !btn-error !text-white"
                                            loadingVariable={deleteForm.submitting}
                                        >
                                            Eliminar obra
                                        </SubmitButton>
                                    </Form>
                                </div>
                            </div>
                            <form method="dialog" id="delete_modal_close" className="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>
                    </div>
                </div>
                <p class="my-2 break-words">{data().play.argument}</p>
                <div className="text-sm text-gray-600">
                    Autor: {data().play.author} • Duracion: {data().play.duration} minutos • Compania: <a href={"/companias/" + data().play.company_id} className="underline">{data().company.name}</a>
                </div>
                <div className="my-3">
                    <Show when={data().rooms_with_schedule}>
                        <div className="my-6">
                            <h3>Horarios de representacion</h3>
                            <For each={data().rooms_with_schedule}>
                                {(item, index) =>
                                    <div className="mt-3 rounded-md bg-gray-50 px-5 py-3 flex justify-between">
                                        <div>
                                            <p class="font-semibold">Representada en: {item.name}</p>
                                            <button class="text-red-600 text-sm" onClick={() => document.getElementById(item.id + '_delete').showModal()}>
                                                Eliminar horario
                                            </button>
                                            <dialog id={item.id + '_delete'} className="modal">
                                                <div className="modal-box">
                                                    <form method="dialog">
                                                        <button className=" absolute right-5 top-3">✕</button>
                                                    </form>
                                                    <h3 className="font-bold text-lg">Eliminar {item.name}</h3>
                                                    <div className="py-2">
                                                        <form method="delete" onSubmit={e => deleteSchedule(e, item.schedule_id)}>
                                                            <p className="pb-2">Esta seguro que quiere eliminar este horario? Esta accion es irreversible!</p>
                                                            <SubmitButton
                                                                type="submit"
                                                                class="form-button !btn-error !text-white"
                                                                loadingVariable={deleteScheduleLoading()}
                                                            >
                                                                Eliminar horario
                                                            </SubmitButton>
                                                        </form>
                                                    </div>
                                                </div>
                                                <form method="dialog" id={item.schedule_id + '_delete_form'} className="modal-backdrop">
                                                    <button>close</button>
                                                </form>
                                            </dialog>
                                        </div>
                                        <div className="text-gray-600 text-sm">
                                            {item.day.split('-')[2]}/{item.day.split('-')[1]}/{item.day.split('-')[0]}
                                            &nbsp;
                                            {item.start_time}
                                            -
                                            {item.end_time}
                                        </div>
                                    </div>
                                }
                            </For>

                        </div>
                    </Show>
                    <Show when={data().rooms}>
                        <div className="my-6">
                            <h3>Asignar sala y horario</h3>
                            <For each={data().rooms}>
                                {(item, index) =>
                                    <div className="flex justify-between px-5 py-3 rounded-md border border-gray-100 my-3">
                                        <span class="font-medium">{item.name}</span>
                                        <button class="btn" onClick={() => chooseRoom(item.id)}>Asignar</button>
                                        <dialog id={item.id} class="modal">
                                            <div class="modal-box">
                                                <h3 class="text-lg font-bold">{item.name}</h3>
                                                <Show when={schedulesLoading()}>
                                                    <div className="-mt-10">
                                                        <Loading />
                                                    </div>
                                                </Show>
                                                <Show when={!schedulesLoading()}>
                                                    <Show when={schedules().length}>
                                                        <div className="my-5 px-4 py-2 rounded-md border border-gray-100">
                                                            <span className="text-lg font-semibold">Horarios ocupados</span>
                                                            <For each={schedules()}>
                                                                {(item, index) =>
                                                                    <div className="my-3 py-2 px-4 rounded-md bg-gray-50 flex items-center justify-between">
                                                                        <div>
                                                                            {item.title}
                                                                        </div>
                                                                        <div className="text-gray-600 text-sm">
                                                                            {item.day.split('-')[2]}/{item.day.split('-')[1]}/{item.day.split('-')[0]}
                                                                            &nbsp;
                                                                            {item.start_time}
                                                                            -
                                                                            {item.end_time}
                                                                        </div>
                                                                    </div>
                                                                }
                                                            </For>
                                                        </div>
                                                    </Show>
                                                    <Show when={!schedules().length}>
                                                        <div class="w-full p-5 text-center rounded-md bg-gray-50">
                                                            <p class="text-gray-600 text-sm">Esta sala no tiene horarios ocupados</p>
                                                        </div>
                                                    </Show>
                                                    <Form onSubmit={addSchedule}>
                                                        <Field
                                                            name="day"
                                                        >
                                                            {(field, props) =>
                                                                <div className="form-container">
                                                                    <label htmlFor="date">Dia</label>
                                                                    <input
                                                                        {...props}
                                                                        type="date"
                                                                        id="date"
                                                                        class="form-input"
                                                                    />
                                                                </div>
                                                            }
                                                        </Field>
                                                        <div className="flex w-full">
                                                            <Field
                                                                name="start"
                                                            >
                                                                {(field, props) =>
                                                                    <div className="form-container w-full mr-3">
                                                                        <label for="start">Hora de comienzo</label>
                                                                        <input
                                                                            {...props}
                                                                            type="time"
                                                                            id="start"
                                                                            class="form-input"
                                                                        />
                                                                    </div>
                                                                }
                                                            </Field>
                                                            <Field
                                                                name="end"
                                                            >
                                                                {(field, props) =>
                                                                    <div className="form-container w-full ml-3">
                                                                        <label for="end">Hora final</label>
                                                                        <input
                                                                            {...props}
                                                                            type="time"
                                                                            id="end"
                                                                            class="form-input"
                                                                        />
                                                                    </div>
                                                                }
                                                            </Field>
                                                        </div>
                                                        <SubmitButton
                                                            class="form-button"
                                                            loadingVariable={addScheduleForm.submitting}
                                                        >
                                                            Asignar
                                                        </SubmitButton>
                                                    </Form>
                                                </Show>
                                            </div>
                                            <form method="dialog" id={item.id + '_close'} class="modal-backdrop">
                                                <button>close</button>
                                            </form>
                                        </dialog>
                                    </div>
                                }
                            </For>
                        </div>
                    </Show>
                </div>
            </Match >
        </Switch >
    );
}