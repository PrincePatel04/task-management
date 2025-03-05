import { Button, Select, Table } from "flowbite-react";
import { FC, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import TaskModal from "./components/taskModal";
import { deleteTask } from "./taskSlice";

const TaskManagement: FC = () => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [editId, setEditId] = useState<number | null>(null);

    const tasks = useAppSelector((state) => state.tasks.tasks);
    const dispatch = useAppDispatch();
    const [filter, setFilter] = useState("All");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [sortColumn, setSortColumn] = useState<"status" | "dueDate">(
        "dueDate"
    );

    const filteredTasks = useMemo(() => {
        return filter === "All"
            ? tasks
            : tasks.filter((task) => task.status === filter);
    }, [filter, tasks]);

    const sortedTasks = useMemo(() => {
        return [...filteredTasks].sort((a, b) => {
            let valueA: string | number = a[sortColumn];
            let valueB: string | number = b[sortColumn];

            if (sortColumn === "dueDate") {
                valueA = new Date(valueA).getTime();
                valueB = new Date(valueB).getTime();
            }

            return sortOrder === "asc"
                ? valueA > valueB
                    ? 1
                    : -1
                : valueA < valueB
                ? 1
                : -1;
        });
    }, [filteredTasks, sortColumn, sortOrder]);

    const handleSort = (column: "status" | "dueDate") => {
        setSortOrder(
            sortColumn === column
                ? sortOrder === "asc"
                    ? "desc"
                    : "asc"
                : "asc"
        );
        setSortColumn(column);
    };

    const handleEdit = (id: number) => {
        setEditId(id);
        setModalOpen(true);
    };

    const handleDelete = (id: number) => {
        dispatch(deleteTask(id));
    };

    const renderSortIcon = (column: "status" | "dueDate") =>
        sortColumn === column ? (sortOrder === "asc" ? "↑" : "↓") : "↑↓";

    return (
        <div>
            <div className="flex items-center justify-between gap-4 mb-4">
                <h2 className="text-2xl font-extrabold">Tasks</h2>
                <Button size="sm" onClick={() => setModalOpen(true)}>
                    Add New
                </Button>
            </div>
            <div className="space-y-4">
                <div className="flex justify-end mb-4">
                    <Select
                        onChange={(e) => setFilter(e.target.value)}
                        className="w-full max-w-60"
                    >
                        {["All", "To Do", "In Progress", "Done"].map(
                            (status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            )
                        )}
                    </Select>
                </div>

                <div className="overflow-auto">
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>Title</Table.HeadCell>
                            <Table.HeadCell className="w-1/5">
                                Description
                            </Table.HeadCell>
                            <Table.HeadCell
                                onClick={() => handleSort("status")}
                                className="cursor-pointer text-nowrap"
                            >
                                Status {renderSortIcon("status")}
                            </Table.HeadCell>
                            <Table.HeadCell
                                onClick={() => handleSort("dueDate")}
                                className="cursor-pointer text-nowrap"
                            >
                                Due Date {renderSortIcon("dueDate")}
                            </Table.HeadCell>
                            <Table.HeadCell>Actions</Table.HeadCell>
                        </Table.Head>
                        <Table.Body>
                            {sortedTasks.length > 0 ? (
                                sortedTasks.map(
                                    ({
                                        id,
                                        title,
                                        description,
                                        status,
                                        dueDate,
                                    }) => (
                                        <Table.Row key={id}>
                                            <Table.Cell>{title}</Table.Cell>
                                            <Table.Cell className="line-clamp-1">
                                                {description}
                                            </Table.Cell>
                                            <Table.Cell>{status}</Table.Cell>
                                            <Table.Cell>
                                                {new Date(
                                                    dueDate
                                                ).toLocaleDateString()}
                                            </Table.Cell>
                                            <Table.Cell className="flex gap-2">
                                                <Button
                                                    size="xs"
                                                    color="gray"
                                                    onClick={() =>
                                                        handleEdit(id)
                                                    }
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    size="xs"
                                                    color="red"
                                                    onClick={() =>
                                                        handleDelete(id)
                                                    }
                                                >
                                                    Delete
                                                </Button>
                                            </Table.Cell>
                                        </Table.Row>
                                    )
                                )
                            ) : (
                                <Table.Row>
                                    <Table.Cell
                                        colSpan={4}
                                        className="text-center text-gray-500"
                                    >
                                        No data available
                                    </Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table>
                </div>
            </div>
            {isModalOpen && (
                <TaskModal
                    editId={editId}
                    handleClose={() => setModalOpen(false)}
                />
            )}
        </div>
    );
};

export default TaskManagement;
