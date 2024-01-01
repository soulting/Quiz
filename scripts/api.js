const BASE_URL = "http://127.0.0.1:5000";

export const fetchData = async (endpoint, method = "GET", data = null) => {
  const url = `${BASE_URL}/${endpoint}`;

  const options = {
    method,
    headers: { "Content-Type": "application/json" },
    body: data ? JSON.stringify(data) : null,
  };

  const response = await fetch(url, options);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Something went wrong");
  }

  return result;
};
