import axios from "axios";
import { useEffect, useState } from "react";
import EventCard from "../../Components/Navigation/Events/EventCard";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyEvents = () => {
    const user = JSON.parse(localStorage.getItem("user")) || null;
    const userId = user._id;
    const [events, setEvents] = useState(null);
    useEffect(() => {
        loadEvents();
    }, [])

    const loadEvents = async () => {
        const res = await axios(`http://localhost:5000/api/events/myevents/${userId}`);
        setEvents(res.data);
        // console.log(res.data);
    }
    const handleDelete = async (event) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });
            if (result.isConfirmed) {
                await axios.delete(`http://localhost:5000/api/events/${event._id}`);

                await Swal.fire({
                    title: "Deleted!",
                    text: "The event has been removed.",
                    icon: "success"
                });

                loadEvents();
            }
        } catch (err) {
            console.error(err);
            Swal.fire({
                title: "Error",
                text: "Failed to delete the event. Please try again.",
                icon: "error"
            });
        }
    };

    return (
        <div>
            
            {events && !events.length ==0 && <p className="mb-7 text-xl">Events {events.length}</p>}
            {
                events &&
                <div className="grid grid-cols-4 gap-5">
                    {
                        events.map((e, indx) => {
                            return <EventCard refetch={loadEvents} key={indx} handleDelete={handleDelete} isMyEvent={true} event={e} />
                        })
                    }
                </div>
            }
            {
                (!events || events?.length == 0) &&
                    <div className="flex flex-col items-center justify-center py-36 text-center">
                        <p className="text-lg font-semibold text-gray-500">
                            No events to display yet, <span className="font-medium text-[#5f45ba]"><Link to="/addEvents" className="hover:underline">Create some?</Link></span>
                        </p>
                    </div>
            }

        </div>
    );
};

export default MyEvents;