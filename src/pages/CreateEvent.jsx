import React from "react";
import { useActionState, useState } from "react";
import { createEvent } from "../data/events";
import { useEvents } from "../context";
import { sleep, validateCreateEventForm } from "../utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const { setEvents } = useEvents();
  const navigate = useNavigate();

  const submitAction = async (prevState, formData) => {
    const title = formData.get("title");
    const description = formData.get("description");
    const date = formData.get("date");
    const location = formData.get("location");
    const latitude = formData.get("latitude");
    const longitude = formData.get("longitude");

    const newEventData = {
      title,
      description,
      date,
      location,
      latitude,
      longitude,
    };
    const validationErrors = validateCreateEventForm(newEventData);
    console.log(validationErrors);

    if (Object.keys(validationErrors).length !== 0)
      return { error: validationErrors, success: false };
    try {
      await sleep(1000);

      console.log(newEventData);
      const newEvent = await createEvent(newEventData);
      // setEvents((prev) => [...prev, newEvent]);
      setForm({
        title: "",
        description: "",
        date: "",
        location: "",
        latitude: "8.404746955649602",
        longitude: "49.01438194665317",
      });
      toast.success("There's a new event in your pond!");
      navigate("/", { replace: true });
      return { error: null, success: true };
    } catch (error) {
      toast.error(error.message || "Something went wrong");
      return { error: null, success: false };
    }
  };
  const [{ title, description, date, location }, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    latitude: "8.404746955649602",
    longitude: "49.01438194665317",
  });
  const [state, formAction, isPending] = useActionState(submitAction, {
    error: null,
    success: false,
  });
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form
      action={formAction}
      className="my-5 md:w-1/2 mx-auto flex flex-col gap-3 items-center"
    >
      <div className="flex flex-col h-full w-full items-center mt-[100px] gap-[1rem]">
        <div className="flex flex-col items-left justify-center">
          <input
            className="input border-black text-black w-[30rem]"
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            placeholder="Title"
          />
          {state.error?.title && (
            <p className="text-red-500 text-sm mt-1">{state.error?.title}</p>
          )}
        </div>
        <div className="flex flex-col items-left justify-center">
          <input
            className="input border-black text-black w-[30rem]"
            type="text"
            name="description"
            value={description}
            onChange={handleChange}
            placeholder="Description"
          />
          {state.error?.description && (
            <p className="text-red-500 text-sm mt-1">
              {state.error?.description}
            </p>
          )}
        </div>
        <div className="flex flex-col items-left justify-center">
          <input
            className="input border-black text-black w-[30rem]"
            type="datetime-local"
            name="date"
            value={date}
            onChange={handleChange}
          />
          {state.error?.date && (
            <p className="text-red-500 text-sm mt-1">{state.error?.date}</p>
          )}
        </div>
        <div className="flex flex-col items-left justify-center">
          <input
            className="input border-black text-black w-[30rem]"
            type="text"
            name="location"
            value={location}
            onChange={handleChange}
            placeholder="Location"
          />
          {state.error?.location && (
            <p className="text-red-500 text-sm mt-1">{state.error?.location}</p>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-neutral w-[30rem]"
          disabled={isPending}
        >
          {isPending ? (
            <>
              Adding event... <span className="loading loading-spinner"></span>
            </>
          ) : (
            "Add Event"
          )}
        </button>
      </div>
    </form>
  );
};

export default CreateEvent;
