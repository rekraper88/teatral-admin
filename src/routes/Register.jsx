import { createForm, minLength, email, required } from "@modular-forms/solid";
import { useNavigate } from "@solidjs/router";
import { csrf, request } from "../lib/utils";
import { createSignal } from "solid-js";

export default function Register() {
  const [registerForm, { Form, Field }] = createForm();
  const navigate = useNavigate();
  const [errors, setErrors] = createSignal([]);

  const handleSubmit = async (values, event) => {
    await csrf();
    try {
      const res = await request.post('/register', values);
      console.log(res);

      navigate('/');
    } catch (error) {
      if (error.response.status === 422) {
        setErrors(error.response.data.errors)
      }
    }
  }

  return (
    <div class="flex justify-center items-center">
      <div className="w-96">
        <h1 class="mb-3">Registrarse</h1>
        <Form onSubmit={handleSubmit}>
          <Field
            name="name"
            validate={[
              required('Este campo es obligatorio'),
            ]}
          >
            {(field, props) =>
              <>
                <input {...props} type="name" class="form-input" placeholder="Su nombre" />
                {field.error && <div class="form-error">{field.error}</div>}
                {errors().name && <div class="form-error">{errors().name}</div>}
              </>
            }
          </Field>
          <Field
            name="email"
            validate={[
              required('Este campo es obligatorio'),
              email('Su correo electronico no es valido')
            ]}
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
            validate={[
              required('Este campo es obligatorio'),
              minLength(6, 'Su contrasena debe tener por lo menos 8 caracteres')
            ]}
          >
            {(field, props) =>
              <>
                <input {...props} type="password" class="form-input" placeholder="Su contrasena" />
                {field.error && <div class="form-error">{field.error}</div>}
                {errors().password && <div class="form-error">{errors().password}</div>}
              </>
            }
          </Field>
          <Field
            name="password_confirmation"
            validate={[
              required('Este campo es obligatorio'),
              minLength(6, 'Su contrasena debe tener por lo menos 6 caracteres'),
            ]}
          >
            {(field, props) =>
              <>
                <input {...props} type="password" class="form-input" placeholder="Confirme su contrasena" />
                {field.error && <div class="form-error">{field.error}</div>}
                {errors().password_confirmation && <div class="form-error">{errors().password_confirmation}</div>}
              </>
            }
          </Field>
          <button type="submit" className="form-button" disabled={registerForm.submitting}>
            {registerForm.submitting ?
              <span class="loading loading-spinner loading-md"></span>
              :
              'Crear cuenta'
            }
          </button>
        </Form>
      </div>
    </div>
  );
}
