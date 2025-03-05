import { FC, lazy } from "react";
import { Navigate, Route, Routes } from "react-router";
import { useAppSelector } from "./app/hooks";
import Login from "./features/auth/login";
import PrivateLayout from "./shared/layout/privateLayout";
import PublicLayout from "./shared/layout/publicLayout";

const TaskManagement = lazy(
    () => import("./features/taskManagement/taskManagement")
);

const App: FC = () => {
    const accessToken = useAppSelector((state) => state.auth.accessToken);

    return (
        <>
            <Routes>
                {accessToken ? (
                    <>
                        <Route element={<PrivateLayout />}>
                            <Route path="/" element={<TaskManagement />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Route>
                    </>
                ) : (
                    <>
                        <Route element={<PublicLayout />}>
                            <Route path="/login" element={<Login />} />
                            <Route
                                path="*"
                                element={<Navigate to="/login" />}
                            />
                        </Route>
                    </>
                )}
            </Routes>
        </>
    );
};

export default App;
