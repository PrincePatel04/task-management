import { object, string } from "yup";

export const validationSchema = object().shape({
    username: string().required("Username is required").trim(),
    password: string().required("Password is required").trim(),
});

export const initialValues = { username: "", password: "" };
