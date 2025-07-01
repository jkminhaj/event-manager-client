import { useState } from "react";
import UpdateEventModal from "../../MyEvents/UpdateEventModal";

const EventCard = ({
    event,
    handleJoinNow,
    isMyEvent = false,
    handleDelete,
    refetch
}) => {
    const user = JSON.parse(localStorage.getItem("user")) || null;
    const userId = user._id;
    let isJoined = false;

    const [open, setOpen] = useState(false);
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
        <div className="relative mx-auto w-full rounded-2xl bg-white shadow-lg ring-1 ring-gray-100">

            <div className="p-6 space-y-3">

                <h2 className="text-2xl font-bold text-[#5f45ba]">{event.title}</h2>


                <h3 className="text-lg font-semibold text-gray-800">{event.name}</h3>


                <p className="text-sm text-gray-500">{event.location}</p>
                <p className="text-sm text-gray-500">{date}</p>


                <p className="text-sm text-gray-700">{event.description}</p>


                <span className="block text-sm font-medium text-gray-600">
                    Attendees: {event.attendeeCount}
                </span>

                {!isMyEvent && (
                    <div className="pt-1">
                        <button
                            onClick={() => handleJoinNow(event)}
                            disabled={isJoined}
                            className={`w-full rounded-xl py-2 font-semibold text-white shadow-md transition
                            ${isJoined ? 'bg-gray-400 cursor-default' : 'bg-[#5f45ba]  cursor-pointer hover:bg-[#4e3ba1]'}`}
                        >
                            {isJoined ? 'Joined' : 'Join Now'}
                        </button>
                    </div>
                )}

                {isMyEvent && (
                    <div className="flex gap-4 pt-1">
                        <button
                            onClick={() => setOpen(true)}
                            className="flex-1 cursor-pointer rounded-xl bg-[#5e45ba1e] py-2 font-semibold text-[#5f45ba] transition hover:bg-[#d9d2ff]"
                        >
                            Update
                        </button>
                        <button
                            onClick={() => handleDelete(event)}
                            className="flex-1  cursor-pointer rounded-xl bg-red-50 py-2 font-semibold text-red-600 transition hover:bg-red-100"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>

            <UpdateEventModal
                refetch={refetch}
                isOpen={open}
                onClose={() => setOpen(false)}
                event={event}
            />
        </div>

    );
};

export default EventCard;