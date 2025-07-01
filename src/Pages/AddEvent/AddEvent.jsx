import React, { useState } from 'react';
import axios from 'axios';

const AddEvent = () => {
    const user = JSON.parse(localStorage.getItem("user")) || null;
    const userId = user._id;
    const initialFormData = {
        title: '',
        name: user.name,
        description: '',
        location: '',
        dateTime: '',
        attendeeCount: 0,
        owner: userId
    };
    const [formData, setFormData] = useState(initialFormData);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await axios.post('https://event-manager-server-eta.vercel.app/api/events', formData);
            console.log('Submitted:', response.data);
            setMessage('Event added successfully!');
            setFormData(initialFormData);
        } catch (err) {
            console.error(err);
            setMessage('Failed to add event.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto  max-w-2xl rounded-2xl p-6  ">
            <h2 className=" text-2xl text-left">Add New Event</h2>
            <hr className='w-20 border-[#5f45ba] mb-10 mt-3 border-2 ' />
            <form onSubmit={handleSubmit} className="space-y-5">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="mb-1 block text-gray-700">Event Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter title"
                            required
                            className="w-full rounded-xl border border-gray-300 p-2 px-4 text-gray-800 outline-none"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-gray-700">Organizer Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Organizer"
                            required
                            className="w-full rounded-xl border border-gray-300 p-2 px-4 text-gray-800 outline-none"
                        />
                    </div>
                </div>


                <div>
                    <label className="mb-1 block text-gray-700">Event Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Write a short description"
                        required
                        className="w-full rounded-xl border border-gray-300 p-2 px-4 text-gray-800 outline-none"
                    />
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="mb-1 block text-gray-700">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Location"
                            required
                            className="w-full rounded-xl border border-gray-300 p-2 px-4 text-gray-800 outline-none"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-gray-700">Attendee Count</label>
                        <input
                            type="number"
                            name="attendeeCount"
                            value={formData.attendeeCount}
                            onChange={handleChange}
                            placeholder="0"
                            required
                            className="w-full rounded-xl border border-gray-300 p-2 px-4 text-gray-800 outline-none"
                        />
                    </div>
                </div>


                <div>
                    <label className="mb-1 block text-gray-700">Date & Time</label>
                    <input
                        type="datetime-local"
                        name="dateTime"
                        value={formData.dateTime}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-gray-300 p-2 px-4 text-gray-800 outline-none"
                    />
                </div>


                <button
                    type="submit"
                    disabled={loading}
                    className="w-full cursor-pointer font-semibold rounded-xl bg-[#5f45ba] py-3 text-white transition hover:bg-[#4e3ba1]"
                >
                    {loading ? 'Submitting...' : 'Add Event'}
                </button>
            </form>

            {message && (
                <p className="mt-5 text-center text-green-600">
                    {message}
                </p>
            )}
        </div>

    );
};

export default AddEvent;
