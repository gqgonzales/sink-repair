const applicationState = {
  requests: [],
  plumbers: [],
};

const mainContainer = document.querySelector("#container");

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
  return [...applicationState.requests];
};

export const fetchPlumbers = () => {
  return fetch(`${API}/plumbers`)
    .then((res) => res.json())
    .then((plumberSelect) => {
      // Store the external state in application state
      applicationState.plumbers = plumberSelect;
    });
};

export const getPlumbers = () => {
  return [...applicationState.plumbers];
};

export const sendRequest = (userServiceRequest) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userServiceRequest),
  };

  // Update your sendRequest() function's fetch call to dispatch the custom event after the POST operation has been completed.
  return fetch(`${API}/requests`, fetchOptions)
    .then((response) => response.json())
    .then(() => {
      mainContainer.dispatchEvent(
        new CustomEvent("stateChanged")
      );
    });
};

export const deleteRequest = (id) => {
  return fetch(`${API}/requests/${id}`, {
    method: "DELETE",
  }).then(() => {
    mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
  });
};

/* 
saveCompletion() - This will perform the POST request to save the completion object to the API
fetchCompletions() - This will retrieve all completion objects from the API
*/
