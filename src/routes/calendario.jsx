import { Switch, Match, createResource, createEffect, For, Show, createMemo, createSignal } from "solid-js";
import { request } from "../lib/utils";
import Loading from "../components/Loading";
import { Slider, createSlider } from "solid-slider";
import "solid-slider/slider.css";
import { createStore } from "solid-js/store";

// Fetch schedules from the server

export default function Calendar() {
    const [slider, { next, prev }] = createSlider({ loop: true });
    const [months, setMonths] = createStore([
        { name: 'Enero', schedules: [] },
        { name: 'Febrero', schedules: [] },
        { name: 'Marzo', schedules: [] },
        { name: 'Abril', schedules: [] },
        { name: 'Junio', schedules: [] },
        { name: 'Julio', schedules: [] },
        { name: 'Agosto', schedules: [] },
        { name: 'Septiembre', schedules: [] },
        { name: 'Octubre', schedules: [] },
        { name: 'Noviembre', schedules: [] },
        { name: 'Diciembre', schedules: [] }
    ]);

    const fetchSchedules = async () => {
        try {
            const response = await request.get('/schedules'); // Ensure getMonth() is called with parentheses
            response.data.forEach(schedule => {
                const monthIndex = new Date(schedule.day + 'T' + schedule.start_time).getMonth();
                setMonths(prevMonths => {
                    const newMonths = [...prevMonths]; // Copy the previous months state
                    newMonths[monthIndex].schedules.push(schedule); // Add schedule to the correct month
                    return newMonths; // Return the updated state
                });
            })
            return response.data;
        } catch (error) {
            alert(error);
        }
    };
    const [schedules] = createResource(fetchSchedules);

    // Create effect to handle schedule updates
    createEffect(() => {
        if (schedules()) {
            schedules().forEach(schedule => {
                const monthIndex = new Date(schedule.day + 'T' + schedule.start_time).getMonth(); // Ensure getMonth() is called with parentheses
                setMonths(prevMonths => {
                    const newMonths = [...prevMonths]; // Copy the previous months state
                    newMonths[monthIndex].schedules.push(schedule); // Add schedule to the correct month
                    return newMonths; // Return the updated state
                });
            });
        }
    }, schedules);

    return (
        <Switch>
            <Match when={schedules.loading}>
                <Loading />
            </Match>
            <Match when={schedules.error}>
                {schedules.error}
            </Match>
            <Match when={months[0]}>
                <h2>Calendario</h2>

                <div className="relative z-10">
                    <div className="flex justify-between items-center mt-4 bg-transparent absolute top-0 w-full z-20">
                        <button class="rounded-full hover:bg-gray-100 p-2" onClick={prev}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                        <button class="rounded-full hover:bg-gray-100 p-2" onClick={next}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div>
                    <div use:slider>
                        <For each={months}>
                            {(month, index) => (
                                <div class="mt-5">
                                    <h4 className="font-semibold text-center">{month.name}</h4>
                                    <div className="px-4 py-6">
                                        <Show when={month.schedules.length === 0}>
                                            <div class="w-full p-10 text-center rounded-md bg-gray-50">
                                                <p class="text-gray-600 text-sm">No hay horarios asociados con este mes</p>
                                            </div>
                                        </Show>

                                        <For each={month.schedules}>
                                            {(schedule) => (
                                                <div className="flex items-center">
                                                    <div className="block font-semibold py-1.5 text-sm text-center w-9 h-[2.1rem] rounded-full text-white bg-red-500">
                                                        {
                                                            schedule.day.split('-')[2].startsWith('0') ?
                                                                schedule.day.split('-')[2][1]
                                                                :
                                                                schedule.day.split('-')[2]
                                                        }
                                                    </div>
                                                    <div className="ml-3 my-3 border-b border-gray-100 flex w-full justify-between">
                                                        <div className="font-semibold flex items-center">
                                                            {schedule.title}
                                                        </div>
                                                        <div className="text-gray-600 text-sm">
                                                            {schedule.start_time}
                                                            -
                                                            {schedule.end_time}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </For>
                                    </div>
                                </div>
                            )}
                        </For>
                    </div>
                </div>
            </Match>
        </Switch>
    );
}
