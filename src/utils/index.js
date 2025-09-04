const validateSignIn = ({ email, password }) => {
  const newErrors = {};

  if (!email.trim()) {
    newErrors.email = "Email is required";
  }
  if (!password.trim()) {
    newErrors.password = "Password is required";
  }

  return newErrors;
};
const validateSignUp = ({ email, password }) => {
  const newErrors = {};

  if (!email.trim()) {
    newErrors.email = "Email is required";
  }
  if (!password.trim()) {
    newErrors.password = "Password is required";
  }

  return newErrors;
};

const validateCreateEventForm = ({ title, description, date, location }) => {
  const newErrors = {};

  if (!title.trim()) newErrors.title = "Title is required";

  if (!description.trim()) {
    newErrors.description = "Description is required";
  }

  if (!date) newErrors.date = "Date is required";

  if (!location.trim()) newErrors.location = "Location is required";

  return newErrors;
};

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export { validateSignIn, validateSignUp, sleep, validateCreateEventForm };
