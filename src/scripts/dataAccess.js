const applicationState = {
  requests: [],
  plumbers: [],
  completions: [],
};

const mainContainer = document.querySelector("#container");

const API = "http://localhost:8088";

// fetchRequests() - This will retrieve all request objects from the API
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

/* export const getRequests = () => {
  const isComplete = [applicationState.requests];
  isComplete.sort((current, next) => {
    return current.isComplete - next.isComplete;
  });
  return isComplete;
}; */

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

// fetchPlumbers() - This will retrieve all plumber objects from the API
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

// fetchCompletions() - This will retrieve all completion objects from the API
export const fetchCompletions = () => {
  return fetch(`${API}/completions`)
    .then((res) => res.json())
    .then((completionObject) => {
      // Store the external state in application state
      applicationState.completions = completionObject;
    });
};

export const getCompletions = () => {
  return [...applicationState.completions];
};

// saveCompletion() - This will perform the POST request to save the completion object to the API
export const saveCompletion = (completion) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(completion),
  };

  return fetch(`${API}/completions`, fetchOptions)
    .then((response) => response.json())
    .then(() => {
      mainContainer.dispatchEvent(
        new CustomEvent("stateChanged")
      );
    });
};

// Function responsible for removing a request from permanent state.
export const deleteRequest = (id) => {
  return fetch(`${API}/requests/${id}`, {
    method: "DELETE",
  }).then(() => {
    mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
  });
};
