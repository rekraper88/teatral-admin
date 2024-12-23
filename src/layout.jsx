export default function Layout(props) {
  return (
    <>
      <div class="navbar px-6 border-b border-gray-100 mb-5 shadow-xs">
        <h1 class="flex-1 text-xl">
          <a href="/">Teatral</a>
        </h1>
        <div className="flex-none">
          <ul className="menu menu-horizontal">
            <li class="mr-3">
              <a href="/register">Register</a>
            </li>
            <li>
              <a href="/login" class="btn btn-primary">Iniciar sesion</a>
            </li>
          </ul>
        </div>
      </div>
      {props.children}
    </>
  );
}
