import { Outlet } from "react-router";
import NavBar from "./Components/Navigation/NavBar";


const Root = () => {
    return (
        <div>
            <NavBar/>
            <Outlet/>
        </div>
    );
};

export default Root;