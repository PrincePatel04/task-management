import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "../../shared/util/utility";
import { Task } from "./task.interface";

export interface TaskState {
    tasks: Task[];
}

const initialState: TaskState = {
    tasks: getLocalStorage("tasks") ?? [],
};

export const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
            localStorage.setItem("tasks", JSON.stringify(state.tasks));
        },
        updateTask: (state, action: PayloadAction<Task>) => {
            const index = state.tasks.findIndex(
                (task) => task.id === action.payload.id
            );
            if (index !== -1) state.tasks[index] = action.payload;
            setLocalStorage("tasks", state.tasks);
        },
        deleteTask: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter(
                (task) => task.id !== action.payload
            );
            setLocalStorage("tasks", state.tasks);
        },
    },
});

export const { addTask, updateTask, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;
