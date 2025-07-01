import axios from "axios";
import { useEffect, useState } from "react";
import EventCard from "../../Components/Navigation/Events/EventCard";

const MyEvents = () => {
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
    const handleDelete = async (event) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${event._id}`);
      loadEvents();     
      alert("Deleted");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };
    return (
        <div>
            Events {events ? events.length : 0}

            {
                events &&
                <div className="grid grid-cols-3">
                    {
                        events.map((e, indx) => {
                            return <EventCard refetch={loadEvents} key={indx} handleDelete={handleDelete} isMyEvent={true} event={e} />
                        })
                    }
                </div>
            }
            
        </div>
    );
};

export default MyEvents;