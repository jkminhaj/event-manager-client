import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";

const NavBar = () => {
    const user = JSON.parse(localStorage.getItem("user")) || null;
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.setItem("user", null);
        setOpen(false)
    }
    return (
        <nav className="border flex justify-around items-center">
            <div>

            </div>
            <div className="text-center space-x-4 py-2">
                <NavLink to="/">Home</NavLink>
                {
                    user &&
                    <>
                        <NavLink to="/events">Events</NavLink>
                        <NavLink to="/addEvents">Add Events</NavLink>
                        <NavLink to="/myEvents">My Events</NavLink>
                    </>
                }
            </div>
            {
                user &&
                <div>
                    <img src={user?.image} onClick={() => { setOpen(!open) }} className="w-8 rounded-full border h-8" alt="" />
                    {
                        open &&
                        <div ref={dropdownRef} className="relative">
                            <div className="bg-white border border-gray-100 shadow p-5 min-w-44 rounded top-2 absolute right-0">
                                <p>{user?.name}</p>
                                <p onClick={ handleLogout }>Log out</p>
                                {/* <p onClick={() => { handleLogout }}>Log out</p> */}
                            </div>
                        </div>
                    }
                </div>
            }

            {
                !user &&
                <div>
                    <Link to="/signin">Sign in</Link>
                </div>
            }
        </nav>
    );
};

export default NavBar;