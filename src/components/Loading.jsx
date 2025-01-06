import { Show } from "solid-js";

export default function Loading(props) {
    return (
        <>
            <Show when={props.skeleton}>
                <div className="text-center mt-4">
                    <div class="skeleton h-12 w-full rounded-md  my-3"></div>
                    <div class="skeleton h-12 w-full rounded-md  my-3"></div>
                    <div class="skeleton h-12 w-full rounded-md  my-3"></div>
                    <div class="skeleton h-12 w-full rounded-md  my-3"></div>
                    <div class="skeleton h-12 w-full rounded-md  my-3"></div>
                </div>
            </Show>
            <Show when={!props.skeleton}>
                <div className="text-center mt-10">
                    <div class={"loading loading-" + (props.size ? props.size : "lg") + " loading-spinner"}></div>
                </div>
            </Show>
        </>
    );
}