import { useState, useEffect } from "react";
import { getAllEvents } from "../data/events";
import { EventContext } from ".";

const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const eventData = await getAllEvents(abortController);
        setEvents(eventData);
      } catch (error) {
        if (error.name === "AbortError") {
          console.info("Fetch Aborted");
        } else {
          console.error(error);
          setError("Error bringing events.");
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      abortController.abort();
    };
  }, []);
  return (
    <EventContext value={{ events, setEvents, loading, error }}>
      {children}
    </EventContext>
  );
};

export default EventProvider;
