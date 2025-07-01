import { NavLink } from "react-router";

const NavBar = () => {
    return (
        <nav>
            <div className="border text-center space-x-4 py-2">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/events">Events</NavLink>
                <NavLink to="/addEvents">Add Events</NavLink>
                <NavLink to="/myEvents">My Events</NavLink>
            </div>
        </nav>
    );
};

export default NavBar;