import { useLocation } from "@solidjs/router";

export default function NavTabs() {
    const location = useLocation()
    
    return (
        <div role="tablist" class="tabs tabs-boxed rounded-md font-medium">
            <a href="/" role="tab" class={((location.pathname.startsWith('/obras') || location.pathname == "/") && 'tab-active') + ' tab '}>Obras</a>
            <a href="/companias" role="tab" class={(location.pathname.startsWith('/companias') && 'tab-active') + ' tab '}>Companias</a>
            <a href="/calendario" role="tab" class={(location.pathname == '/calendario' && 'tab-active') + ' tab '}>Calendario</a>
            <a href="/salas" role="tab" class={(location.pathname.startsWith('/salas') && 'tab-active') + ' tab '}>Salas</a>
        </div>
    );
}