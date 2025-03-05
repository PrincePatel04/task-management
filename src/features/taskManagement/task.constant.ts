import { object, string } from "yup";

export const validationSchema = object().shape({
    title: string().required("Title is required"),
    description: string().required("Description is required"),
    status: string().required("Status is required"),
    dueDate: string().required("Due date is required"),
});

export const initialValues = {
    title: "",
    description: "",
    status: "",
    dueDate: "",
};

export const taskStatusOptions = [
    { value: "To Do", label: "To Do" },
    { value: "In Progress", label: "In Progress" },
    { value: "Done", label: "Done" },
];
