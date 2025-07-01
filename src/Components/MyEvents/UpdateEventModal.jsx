import { useEffect, useState } from "react";
import axios from "axios";

const UpdateEventModal = ({ isOpen, onClose, event, refetch }) => {
  const [formData, setFormData] = useState(event);

  useEffect(() => setFormData(event), [event]);

  console.log(formData);
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5000/api/events/${event._id}`,
        formData
      );
      console.log(res)
      refetch();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };
  const formatDateForInput = (utcString) => {
    const date = new Date(utcString);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60000);
    return localDate.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:mm"
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
  <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-100">
    <h2 className="mb-6 text-2xl font-semibold  text-center">Update Event</h2>

    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block  text-gray-700">Title</label>
          <input
            className="w-full rounded-xl border border-gray-200 p-2 px-4 text-gray-800 outline-none"
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            placeholder="Event title"
            required
          />
        </div>
        <div>
          <label className="mb-1 block  text-gray-700">Organizer</label>
          <input
            className="w-full rounded-xl border border-gray-200 p-2 px-4 text-gray-800 outline-none"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            placeholder="Organizer"
            required
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block  text-gray-700">Description</label>
        <textarea
          className="w-full rounded-xl border border-gray-200 p-2 px-4 text-gray-800 outline-none"
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          placeholder="Brief description"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block  text-gray-700">Location</label>
          <input
            className="w-full rounded-xl border border-gray-200 p-2 px-4 text-gray-800 outline-none"
            name="location"
            value={formData.location || ""}
            onChange={handleChange}
            placeholder="Location"
            required
          />
        </div>
        <div>
          <label className="mb-1 block  text-gray-700">Attendees</label>
          <input
            className="w-full rounded-xl border border-gray-200 p-2 px-4 text-gray-800 outline-none"
            name="attendeeCount"
            value={formData.attendeeCount || ""}
            onChange={handleChange}
            placeholder="Total"
            required
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block  text-gray-700">Date & Time</label>
        <input
          className="w-full rounded-xl border border-gray-200 p-2 px-4 text-gray-800 outline-none"
          type="datetime-local"
          name="dateTime"
          value={formData.dateTime ? formatDateForInput(formData.dateTime) : ""}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl cursor-pointer px-5 py-2 font-semibold text-gray-600 hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-xl cursor-pointer bg-[#5f45ba] px-6 py-2 font-semibold text-white transition hover:bg-[#4e3ba1]"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</div>


  );
};

export default UpdateEventModal;
