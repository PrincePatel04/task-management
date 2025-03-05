import { Button } from "flowbite-react";
import { FC } from "react";
import { useAppDispatch } from "../../app/hooks";
import { clearAuthData } from "../../features/auth/authSlice";

const Header: FC = () => {
    const dispatch = useAppDispatch();
    const handleLogout = () => {
        dispatch(clearAuthData());
    };
    return (
        <div className="h-12 w-full sticky top-0 bg-cyan-700 z-50">
            <div className="container flex items-center justify-between h-full w-full mx-auto px-4">
                <p className="text-2xl text-white font-bold">Task Management</p>
                <Button size="xs" color="gray" onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default Header;
