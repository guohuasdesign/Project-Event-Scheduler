const API_URL = "http://localhost:3001/api/auth";

const signIn = async (formData) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  if (!res.ok) throw new Error("Something went wrong!");

  const data = await res.json();

  return data;
};

const me = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Something went wrong!");

  const data = await res.json();

  return data;
};

export { signIn, me };
