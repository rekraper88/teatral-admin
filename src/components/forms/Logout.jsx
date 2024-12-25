import { createForm } from "@modular-forms/solid";
import SubmitButton from "../SubmitButton";
import useAuthContext from "../../context/AuthContext";

export default function Logout({ props }) {
    const [form, { Form }] = createForm();
    const { logout } = useAuthContext();

    return (
        <Form onSubmit={logout} style={{ padding: 0}}>
            <SubmitButton
                type="submit"
                class="btn"
                loadingVariable={form.submitting}
            >
                Cerrar sesion
            </SubmitButton>
        </Form>
    );
}