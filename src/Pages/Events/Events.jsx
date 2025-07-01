import axios from "axios";
import { useEffect, useState } from "react";
import EventCard from "../../Components/Navigation/Events/EventCard";

const Events = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const userId = user?._id;

  const [events, setEvents] = useState([]);       
  const [displayed, setDisplayed] = useState([]);  

  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("");

  const loadEvents = async () => {
    const { data } = await axios("http://localhost:5000/api/events");
    const sorted = data.sort(
      (a, b) => new Date(a.dateTime) - new Date(b.dateTime)
    );
    setEvents(sorted);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    if (!events.length) return;

    const now = new Date();
    let list = [...events];

    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      list = list.filter(e => e.title.toLowerCase().includes(q));
    }

    const sameDay = (d1, d2) => d1.toDateString() === d2.toDateString();
    const between = (d, s, e) => d >= s && d <= e;

    switch (filterType) {
      case "today":
        list = list.filter(e => sameDay(new Date(e.dateTime), now));
        break;

      case "currentWeek": {
        const start = new Date(now);
        start.setDate(now.getDate() - now.getDay());
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        list = list.filter(e => between(new Date(e.dateTime), start, end));
        break;
      }

      case "lastWeek": {
        const end = new Date(now);
        end.setDate(now.getDate() - now.getDay() - 1);
        const start = new Date(end);
        start.setDate(end.getDate() - 6);
        list = list.filter(e => between(new Date(e.dateTime), start, end));
        break;
      }

      case "currentMonth":
        list = list.filter(e => {
          const d = new Date(e.dateTime);
          return (
            d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
          );
        });
        break;

      case "lastMonth": {
        const month = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
        const year = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
        list = list.filter(e => {
          const d = new Date(e.dateTime);
          return d.getMonth() === month && d.getFullYear() === year;
        });
        break;
      }

      default:
        break;
    }

    setDisplayed(list);
  }, [events, searchText, filterType]);

  const handleJoinNow = async event => {
    if (!userId) return alert("Please sign in first");
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/events/join/${event._id}`,
        { userId }
      );
      
      loadEvents();
      alert(data.message);
    } catch (err) {
      const msg = err.response?.data?.error || err.response?.data?.message;
      alert(msg || "Something went wrong");
    }
  };

  
  const clearFilters = () => {
    setSearchText("");
    setFilterType("");
  };

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">
        Events ({displayed.length})
      </h1>

      <div className="mb-4 flex items-center gap-2">
        <input
          type="text"
          placeholder="Search by title"
          className="rounded border px-2 py-1"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />

        <select
          value={filterType}
          onChange={e => setFilterType(e.target.value)}
          className="rounded border px-2 py-1"
        >
          <option value="">Select a date range</option>
          <option value="today">Today</option>
          <option value="currentWeek">Current Week</option>
          <option value="lastWeek">Last Week</option>
          <option value="currentMonth">Current Month</option>
          <option value="lastMonth">Last Month</option>
        </select>

        <button
          onClick={clearFilters}
          className="rounded border bg-gray-100 px-3 py-1"
        >
          Clear Filters ✖
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayed.map(evt => (
          <EventCard
            key={evt._id}
            event={evt}
            handleJoinNow={handleJoinNow}
          />
        ))}
      </div>
    </div>
  );
};

export default Events;
