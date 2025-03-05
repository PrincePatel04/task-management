import { yupResolver } from "@hookform/resolvers/yup";

import { Button, Modal } from "flowbite-react";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import CustomInput from "../../../shared/components/input";
import CustomSelect from "../../../shared/components/select";
import CustomTextArea from "../../../shared/components/textArea";
import {
    initialValues,
    taskStatusOptions,
    validationSchema,
} from "../task.constant";
import { FormValues } from "../task.interface";
import { addTask, updateTask } from "../taskSlice";

interface Props {
    handleClose: () => void;
    editId?: number | null;
}

const TaskModal: FC<Props> = ({ handleClose, editId = null }) => {
    const tasks = useAppSelector((state) => state.tasks.tasks);
    const dispatch = useAppDispatch();

    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<FormValues>({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema),
    });

    const handleTask = (values: FormValues) => {
        if (editId) {
            dispatch(updateTask({ id: editId, ...values }));
        } else {
            dispatch(addTask({ id: Date.now(), ...values }));
        }
        handleClose();
    };

    useEffect(() => {
        if (editId) {
            const [data] = tasks.filter((task) => task.id === editId);
            reset({ ...data });
        }
    }, [editId, reset, tasks]);

    return (
        <>
            <Modal show={true} onClose={handleClose}>
                <Modal.Header>{editId ? "Edit Task" : "Add Task"}</Modal.Header>
                <Modal.Body>
                    <div className="space-y-4">
                        <CustomInput<FormValues>
                            label="Title"
                            name="title"
                            control={control}
                            error={errors.title?.message}
                            placeholder="Select Title"
                        />
                        <CustomTextArea<FormValues>
                            label="Description"
                            name="description"
                            control={control}
                            error={errors.description?.message}
                            placeholder="Select Description"
                        />
                        <CustomSelect<FormValues>
                            label="Status"
                            name="status"
                            control={control}
                            error={errors.status?.message}
                            options={taskStatusOptions}
                        />
                        <CustomInput<FormValues>
                            type="date"
                            label="Due Date"
                            name="dueDate"
                            control={control}
                            error={errors.dueDate?.message}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button size="sm" onClick={handleSubmit(handleTask)}>
                        {editId ? "Update Task" : "Add Task"}
                    </Button>
                    <Button size="sm" color="gray" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default TaskModal;
