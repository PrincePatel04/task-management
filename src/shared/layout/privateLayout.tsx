import { FC } from "react";
import { Outlet } from "react-router";
import Header from "./header";

const PrivateLayout: FC = () => {
    return (
        <div className="w-full">
            <Header />
            <div className="container min-h-[calc(100vh-48px)] mx-auto p-4">
                <Outlet />
            </div>
        </div>
    );
};

export default PrivateLayout;
