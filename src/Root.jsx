import { Outlet } from "react-router";
import Sidebar from "./Components/Sidebar";

const Root = () => {
    return (
        <div className="flex">
            <div className="p-5 bg-blue-50 h-screen min-w-[200px]">
                <Sidebar />
            </div>
            <div className="p-5 bg-red-50 w-full">
                <Outlet />
            </div>
        </div>
    );
};

export default Root;