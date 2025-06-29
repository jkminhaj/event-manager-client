import { useContext } from "react";
import { GlobalContext } from "../Context/Global_Provider";

const Sidebar = () => {

    const {name} = useContext(GlobalContext);
    return (
        <div>
            <p>I am {name}</p>
        </div>
    );
};

export default Sidebar;