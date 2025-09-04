import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  // load all existing events
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/events?page=1&limit=16");
      const data = await response.json();


      if (Array.isArray(data)) {
        setEvents(data);
      } else if (data.results) {
        setEvents(data.results);
      } else {
        setEvents([]);
      }
    } catch (err) {
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  //to know the categorie of events belong to design or tech or mischung;
  const getCategory = (event) => {
    if (event.title.toLowerCase().includes("ux") || event.title.toLowerCase().includes("design") || event.title.toLowerCase().includes("figma")) {
      return "design";
    }
    if (event.title.toLowerCase().includes("coding") || event.title.toLowerCase().includes("code") || event.title.toLowerCase().includes("design ops")) {
      return "tech";
    }
    return "general";
  };

  //different colors of different categories: design is pink; tech is blue; mischung is green;
  const getCategoryStyle = (category) => {
    switch (category) {
      case "design":
        return "bg-pink-100 border-pink-200";
      case "tech":
        return "bg-blue-100 border-blue-200";
      default:
        return "bg-green-100 border-green-200";
    }
  };


  return (
    <div className="p-6 space-y-10">

      <h2 className="text-2xl font-bold mb-6 text-blue-600">Our Product Event Series 2026 </h2>
      {/* Event List */}
      {loading ? (
        <p>Loading events...</p>
      ) : events.length === 0 ? (
        <p>No events available.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {events.slice(0, showAll ? events.length : 11).map((event) => (
            // click then change to EventDetail
            <Link
              key={event._id || event.id}
              to={`/eventDetail/${event._id || event.id}`}
              className="bg-base-200 shadow-sm rounded-xl hover:shadow-lg transition cursor-pointer">

              <div className={`card-xs p-4 h-fu1l rounded-lg ${getCategoryStyle(getCategory(event))}`}>

                <h3 className="text-md font-mono text-gray-900 line-clamp-1"><span className="">Event Serie: </span>{event.title || event.name}</h3>
                <p className="text-xs font-mono text-gray-500 mt-4">
                  Time: {event.date
                    ? new Date(event.date).toLocaleString()
                    : "No date provided"}
                </p>
                <p className="text-xs font-mono text-gray-500 mt-2 line-clamp-1">
                  Place: {event.location || "Unknown location"}
                </p>

                <p className="text-xs font-mono text-gray-500 mt-2 line-clamp-1">
                  Description: {event.description || event.details}
                </p>

                <div className="mt-6 flex justify-end">

                  <button className="btn btn-neutral btn-outline">
                    Know more
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <g clip-path="url(#clip0_6_13425)">
                        <path d="M5.87988 4.12L13.7599 12L5.87988 19.88L7.99988 22L17.9999 12L7.99988 2L5.87988 4.12Z" fill="currentColor" />
                      </g>
                      <defs>
                        <clipPath id="clip0_6_13425">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>

                </div>

              </div>
            </Link>

          ))}

          {/* more Event lists */}
          {events.length > 11 && !showAll && (
            <div className="card bg-gradient-to-r from-pink-200 to-green-200 shadow flex items-center justify-center cursor-pointer hover:bg-base-200 transition"
              onClick={() => setShowAll(true)}>
              <span className="text-2xl text-blue-400 *:font-semibold">Want more Events?</span>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default Home;

