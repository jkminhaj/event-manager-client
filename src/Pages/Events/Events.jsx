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
    const { data } = await axios("https://event-manager-server-eta.vercel.app/api/events");
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
        `https://event-manager-server-eta.vercel.app/api/events/join/${event._id}`,
        { userId }
      );

      loadEvents();
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


      <div className="my-4 mt-7 flex flex-wrap items-center gap-3">

        <input
          type="text"
          placeholder="Search by title"
          className="flex-1 min-w-[150px] rounded-xl border border-gray-300 px-3 py-2  text-gray-800 outline-none placeholder:text-gray-500"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />


        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="min-w-[160px] cursor-pointer rounded-xl  px-3 py-2 font-semibold text-gray-800 outline-none"
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
          className="rounded-xl cursor-pointer bg-[#5f45ba] px-4 py-2 font-semibold text-white transition hover:bg-[#4e3ba1]"
        >
          Clear Filters
        </button>
      </div>

      <h1 className="mb-7 text-xl ">
        Events ({displayed.length})
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {displayed.map(evt => (
          <EventCard
            key={evt._id}
            event={evt}
            handleJoinNow={handleJoinNow}
          />
        ))}
      </div>

      {
        (displayed?.length == 0) &&
        <div className="flex flex-col items-center justify-center py-36 text-center">
          <p className="text-lg font-semibold text-gray-500">
            No events found !
          </p>
        </div>
      }
    </div>
  );
};

export default Events;
