export default function SubmitButton(props) {
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