const applicationState = {
  requests: [],
};

const API = "http://localhost:8088";

export const fetchRequests = () => {
  return fetch(`${API}/requests`)
    .then((res) => res.json())
    .then((serviceRequests) => {
      // Store the external state in application state
      applicationState.requests = serviceRequests;
    });
};

export const getRequests = () => {
  const copyOfData = [...applicationState.requests];
  return copyOfData;
};

export const sendRequest = (userServiceRequest) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userServiceRequest),
  };

  return fetch(`${API}/requests`, fetchOptions)
    .then((response) => response.json())
    .then(() => {});
};
