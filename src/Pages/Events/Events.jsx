import axios from "axios";
import { useEffect, useState } from "react";
import EventCard from "../../Components/Navigation/Events/EventCard";

const Events = () => {
    const userId = "68625ba3bfc3109a8a520545";
    const [events, setEvents] = useState(null);
    useEffect(() => {
        loadEvents();
    }, [])

    const loadEvents = async () => {
        const res = await axios("http://localhost:5000/api/events");
        setEvents(res.data);
        console.log(res.data);
    }

    const handleJoinNow = async (event) => {
        try {
            const res = await axios.post(`http://localhost:5000/api/events/join/${event._id}`, { userId });
            loadEvents();
            console.log(res.data);
            alert(res.data.message);
        } catch(err){
            if(err.response.data.error){
                alert(err.response.data.error);
            }else {
                alert(err.response.data.message);
            }
        }
    }

    return (
        <div>
            Events {events ? events.length : 0}

            {
                events &&
                <div className="grid grid-cols-3">
                    {
                        events.map((e, indx) => {
                            return <EventCard key={indx} handleJoinNow={handleJoinNow} event={e} />
                        })
                    }
                </div>
            }
        </div>
    );
};

export default Events;