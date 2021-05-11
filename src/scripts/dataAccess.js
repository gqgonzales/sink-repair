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

  // Update your sendRequest() function's fetch call to dispatch the custom event after the POST operation has been completed.
  return fetch(`${API}/requests`, fetchOptions)
    .then((response) => response.json())
    .then(() => {
      mainContainer.dispatchEvent(
        new CustomEvent("stateChanged")
      );
    });
};

// Now your main module has to listen for the custom event and invoke the render() function to build all the HTML again.
mainContainer.addEventListener("stateChanged", (customEvent) => {
  render();
});

export const deleteRequest = (id) => {
  return fetch(`${API}/requests/${id}`, {
    method: "DELETE",
  }).then(() => {
    mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
  });
};
