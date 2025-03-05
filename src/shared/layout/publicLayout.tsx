import { FC } from "react";
import { Outlet } from "react-router";

const PublicLayout: FC = () => {
    return (
        <div className="h-screen w-screen p-4 flex items-center justify-center bg-slate-200">
            <Outlet />
        </div>
    );
};

export default PublicLayout;
