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
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-bold text-indigo-600">Update Event</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full rounded border p-2"
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            placeholder="Title"
            required
          />
          <input
            className="w-full rounded border p-2"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            placeholder="Organizer"
            required
          />
          <textarea
            className="w-full rounded border p-2"
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            placeholder="Description"
            required
          />
          <input
            className="w-full rounded border p-2"
            name="location"
            value={formData.location || ""}
            onChange={handleChange}
            placeholder="Location"
            required
          />
          <input
            className="w-full rounded border p-2"
            type="datetime-local"
            name="dateTime"
            value={
              formData.dateTime ? formatDateForInput(formData.dateTime) : ""
            }
            onChange={handleChange}
            required
          />

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded border px-4 py-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-indigo-600 px-4 py-1 text-white hover:bg-indigo-700"
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
