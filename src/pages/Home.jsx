import { useState, useEffect } from "react";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // load all existing events
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/events");
      const data = await response.json();
      setEvents(data.results || []);
    } catch (err) {
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-0 px-6 space-y-6">
      {/* Event List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Our Event List</h2>
        {loading ? (
          <p>Loading events...</p>
        ) : events.length === 0 ? (
          <p>No events available.</p>
        ) : (
          <div className="grid gap-4">
            {events.map((event) => (
              <div key={event.id} className="card bg-base-200 shadow p-4">
                <h3 className="text-lg font-bold">{event.title}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(event.date).toLocaleString()}
                </p>
                <p>{event.description}</p>
                <p className="text-sm text-gray-600">📍 {event.location}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
