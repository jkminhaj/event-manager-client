import { useState } from "react";
import UpdateEventModal from "../../MyEvents/UpdateEventModal";

const EventCard = ({
    event,
    handleJoinNow,
    isMyEvent = false ,
    handleDelete ,
    refetch
}) => {
    const userId = "68625ba3bfc3109a8a520545";
    let isJoined = false;

    const [open , setOpen ] = useState(false);
    isJoined = event.joinedUsers.includes(userId);

    const date = new Date(event.dateTime).toLocaleString('en-BD', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });

    return (
        <div className="max-w-md mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
            <div className="p-6">
                <h2 className="text-2xl font-bold text-indigo-600">{event.title}</h2>
                <h3 className="text-lg font-semibold text-gray-800 mt-1">{event.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{event.location}</p>
                <p className="text-sm text-gray-500 mb-3">{date}</p>
                <p className="text-gray-700 text-sm mb-4">{event.description}</p>
                <span className="text-gray-600">Attendees: {event.attendeeCount}</span>
                {
                    !isMyEvent &&
                    <div className="flex items-center justify-between text-sm">
                        {
                            isJoined ?
                                <button onClick={() => { handleJoinNow(event) }} className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700 transition duration-200">
                                    Joined
                                </button> :
                                <button onClick={() => { handleJoinNow(event) }} className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700 transition duration-200">
                                    Join Now
                                </button>
                        }
                    </div>
                }

                {
                    isMyEvent &&
                    <div className="flex gap-6 mt-3.5">
                        <button onClick={()=>{setOpen(true)}}>Update</button>
                        <button onClick={()=>{handleDelete(event)}}>Delete</button>
                    </div>
                }
            </div>
            <UpdateEventModal refetch={refetch} isOpen={open} onClose={()=>{setOpen(false)}} event={event}/>
        </div>
    );
};

export default EventCard;