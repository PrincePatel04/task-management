export interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
    dueDate: string;
}

export type FormValues = Omit<Task, "id">;
