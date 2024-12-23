import { createForm, minLength, email, required } from "@modular-forms/solid";
import { request, csrf } from "../lib/utils";
import { useNavigate } from "@solidjs/router";
import { createSignal } from "solid-js";
import useAuthContext from "../context/AuthContext";

export default function Login() {
  const [loginForm, { Form, Field }] = createForm();
  const navigate = useNavigate();
  const [errors, setErrors] = createSignal([]);
  const { login } = useAuthContext();

  const handleSubmit = (values, event) => {
    event.preventDefault();
    const res = login(values)
    console.log('hi');
    
    // setErrors(res);
  }

  return (
    <div class="flex justify-center items-center">
      <div className="w-96">
        <h1 class="mb-3">Iniciar sesion</h1>
        <Form onSubmit={handleSubmit}>
          <Field
            name="email"
          >
            {(field, props) =>
              <>
                <input {...props} type="email" class="form-input" placeholder="Su correo electronico" />
                {field.error && <div class="form-error">{field.error}</div>}
                {errors().email && <div class="form-error">{errors().email}</div>}
              </>
            }
          </Field>
          <Field
            name="password"
          >
            {(field, props) =>
              <>
                <input {...props} type="password" class="form-input" placeholder="Su contrasena" />
                {field.error && <div class="form-error">{field.error}</div>}
                {errors().password && <div class="form-error">{errors().password}</div>}
              </>
            }
          </Field>
          <button type="submit" className="form-button" disabled={loginForm.submitting}>
            {loginForm.submitting ?
              <span class="loading loading-spinner loading-md"></span>
              :
              'Iniciar sesion'
            }
          </button>
        </Form>
      </div>
    </div>
  );
}
