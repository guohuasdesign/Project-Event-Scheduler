import { useState, useEffect } from "react";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
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

  // submit a new event
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isoDate = new Date(date).toISOString();
    const latitude = 49.01438194665317;
    const longitude = 8.404746955649602;

    try {
      const response = await fetch("http://localhost:3001/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          date: isoDate,
          location,
          latitude,
          longitude,
        }),
      });

      if (response.ok) {
        const newEvent = await response.json();
        alert("Event created successfully!");

        // update event list immediately
        setEvents((prev) => [newEvent, ...prev]);

        // reset form
        setTitle("");
        setDescription("");
        setDate("");
        setLocation("");
      } else {
        alert("Failed to create event.");
      }
    } catch (err) {
      console.error("Error creating event:", err);
      alert("Error connecting to API.");
    }
  };

  return (
    <div className="p-6 space-y-10">
      {/* Event Form */}
      <div>
        <h1 className="text-2xl font-bold mb-6 flex justify-center">
          Create a new Event
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center max-w-lg mx-auto"
        >
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
            <legend className="fieldset-legend text-lg font-semibold">
              Event details
            </legend>

            <label className="fieldset-label">Event Title</label>
            <input
              type="text"
              placeholder="Event Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-full"
              required
            />

            <label className="fieldset-label">Description</label>
            <textarea
              placeholder="Event Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea textarea-bordered w-full"
              required
            />

            <label className="fieldset-label">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input input-bordered w-full"
              required
            />

            <label className="fieldset-label">Location</label>
            <input
              type="text"
              placeholder="Event Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input input-bordered w-full"
              required
            />

            <button
              type="submit"
              className="btn btn-neutral btn-outline mt-4 rounded-xl"
            >
              Add Event
            </button>
          </fieldset>
        </form>
      </div>

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
