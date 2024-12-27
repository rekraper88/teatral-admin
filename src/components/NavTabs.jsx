import { useLocation } from "@solidjs/router";

export default function NavTabs() {
    const location = useLocation()
    
    return (
        <div role="tablist" class="tabs tabs-boxed">
            <a href="/" role="tab" class={(location.pathname == '/' && 'tab-active') + ' tab font-bold'}>Obras</a>
            <a href="/companias" role="tab" class={((location.pathname == '/companias' || location.pathname == '/companias/crear') && 'tab-active') + ' tab font-bold'}>Companias</a>
            <a href="/calendario" role="tab" class={(location.pathname == '/calendario' && 'tab-active') + ' tab font-bold'}>Calendario</a>
            <a href="/salas" role="tab" class={(location.pathname == '/salas' && 'tab-active') + ' tab font-bold'}>Salas</a>
        </div>
    );
}