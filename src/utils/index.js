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

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export { validateSignIn, validateSignUp, sleep };
