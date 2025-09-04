const API_URL = "http://localhost:3001/api/events";

const getAllEvents = async (abortCont) => {
  const res = await fetch(API_URL, {
    signal: abortCont.signal,
  });

  if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);

  const data = await res.json();

  return data;
};

const createEvent = async (event) => {
  const token = localStorage.getItem("token");

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify(event),
  });

  if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);

  const data = await res.json();

  return data;
};

export { getAllEvents, createEvent };
