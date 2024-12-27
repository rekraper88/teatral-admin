export default function Company(props) {
    return (
        <div className="my-3">
            <details class="collapse rounded-b-none rounded-md w-full bg-gray-50 collapse-arrow">
                <summary class="collapse-title pt-2.5 pb-0">{props.name}</summary>
                <div class="collapse-content text-sm">
                    <p class="pb-4"><span className="font-bold">
                        Director: </span> {props.director}
                        <br />
                        <span className="font-bold">Actores: </span> {props.actors}
                    </p>
                </div>
            </details>
            <div className="flex text-sm font-bold bg-gray-50 rounded-t-none rounded-md pb-2.5 pl-4">
                <span className="text-blue-600">Editar</span> 
                <span className="text-red-600 ml-2">Eliminar</span> 
            </div>
        </div>
    );
}