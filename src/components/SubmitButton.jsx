import { createEffect } from "solid-js";

export default function SubmitButton(props) {
    createEffect(() => {
        console.log(props.loadingVariable);
        
    }, props.loadingVariable)
    return (
        <button {...props} disabled={props.loadingVariable}>
            {props.loadingVariable ?
                <span class="loading loading-spinner loading-md"></span>
                :
                props.children
            }
        </button>
    );
} 