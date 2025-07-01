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
        <nav className="shadow ">
            <div className="max-w-[1240px]  mx-auto py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <img
                        className="w-10"
                        src="https://images.seeklogo.com/logo-png/39/2/orchid-oxt-logo-png_seeklogo-398560.png" alt="" />
                    <p className="text-3xl font-bold text-[#5f45ba]">Eventure</p>
                </div>
                <div className="flex font-semibold items-center justify-between gap-5">
                    <div className="flex flex-wrap items-center justify-center gap-2 py-2">
                        {
                            !user &&
                            <NavLink
                                to="/"
                                className="text-gray-700 hover:text-[#5f45ba]"
                            >
                                Home
                            </NavLink>
                        }
                        {user && (
                            <>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `px-3 py-1 font-semibold rounded-xl transition-colors
                                    ${isActive
                                            ? 'bg-[#5f45ba] text-white'
                                            : 'text-gray-700 hover:text-[#5f45ba] hover:bg-[#5e45ba1e]'}`
                                    }
                                >
                                    Home
                                </NavLink>
                                <NavLink
                                    to="/events"
                                    className={({ isActive }) =>
                                        `px-3 py-1 font-semibold rounded-xl transition-colors
                                        ${isActive
                                            ? 'bg-[#5f45ba] text-white'
                                            : 'text-gray-700 hover:text-[#5f45ba] hover:bg-[#5e45ba1e]'}`
                                    }
                                >
                                    Events
                                </NavLink>

                                <NavLink
                                    to="/addEvents"
                                    className={({ isActive }) =>
                                        `px-3 py-1 font-semibold rounded-xl transition-colors
                                        ${isActive
                                            ? 'bg-[#5f45ba] text-white'
                                            : 'text-gray-700 hover:text-[#5f45ba] hover:bg-[#5e45ba1e]'}`
                                    }
                                >
                                    Add Events
                                </NavLink>

                                <NavLink
                                    to="/myEvents"
                                    className={({ isActive }) =>
                                        `px-3 py-1 font-semibold rounded-xl transition-colors
                                        ${isActive
                                            ? 'bg-[#5f45ba] text-white'
                                            : 'text-gray-700 hover:text-[#5f45ba] hover:bg-[#5e45ba1e]'}`
                                    }
                                >
                                    My Events
                                </NavLink>
                            </>
                        )}
                    </div>

                    {
                        user &&
                        <div>
                            <img src={user?.image} onClick={() => { setOpen(!open) }} className="w-10 rounded-full border border-gray-300 h-10 cursor-pointer" alt={user?.name} />
                            {
                                open &&
                                <div ref={dropdownRef} className="relative">

                                    <div className="absolute right-0 top-2 z-50 w-48 overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-100">

                                        <div className="px-4 py-3 text-center font-semibold text-black">
                                            {user?.name}
                                        </div>

                                        <hr className="border-gray-200" />

                                        <button
                                            onClick={handleLogout}
                                            className="block w-full px-4 py-2 text-center font-semibold text-[#5f45ba] cursor-pointer transition-colors hover:text-[#4b45ba] focus:outline-none"
                                        >
                                            Log out
                                        </button>
                                    </div>
                                </div>
                            }
                        </div>
                    }

                    {
                        !user &&
                        <div>
                            <Link to="/signin" className="bg-[#5f45ba] font-semibold text-white rounded-xl px-4 py-2 hover:bg-[#5845ba]">Sign in</Link>
                        </div>
                    }
                </div>
            </div>
        </nav>
    );
};

export default NavBar;