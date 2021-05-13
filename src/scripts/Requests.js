import {
  getRequests,
  deleteRequest,
  getPlumbers,
  saveCompletion,
  getCompletions,
} from "./dataAccess.js";

export const Requests = () => {
  let requests = getRequests();
  let plumbers = getPlumbers();
  let completions = getCompletions();

  let html = `
        <ul>
            ${requests
              .map((requestObject) => {
                return `
                <li class="request_object">
                        ID: ${requestObject.id}
                        Description: ${requestObject.description}
                        Address: ${requestObject.address}
                        Budget: $${requestObject.budget}
                        Due Date: ${requestObject.neededBy}
                        <select class="plumbers" id="plumbers">
                        <option value="">Completed By</option>
                            ${plumbers.map((plumbers) => {
                              return `<option value="${requestObject.id}--${plumbers.name}">${plumbers.name}</option>`;
                            })}
                        </select>
                    <button class="request__delete"
                      id="request--${requestObject.id}">
                        Delete
                    </button>
                </li>
                `;
              })
              .join("")}
        </ul>
    `;

  return html;
};

const mainContainer = document.querySelector("#container");

mainContainer.addEventListener("change", (event) => {
  if (event.target.id === "plumbers") {
    const [requestId, plumberId] =
      event.target.value.split("--");
    /*
              This object should have 3 properties
                 1. requestId
                 2. plumberId
                 3. date_created
          */
    const completion = {
      requestId,
      plumberId,
      date_created:
        new Date().toLocaleTimeString() +
        " " +
        new Date().toLocaleDateString(),
    };

    /*
              Invoke the function that performs the POST request
              to the `completions` resource for your API. Send the
              completion object as a parameter.
    */
    saveCompletion(completion);
  }
});

mainContainer.addEventListener("click", (click) => {
  if (click.target.id.startsWith("request--")) {
    const [, requestId] = click.target.id.split("--");
    deleteRequest(parseInt(requestId));
  }
});

// Some kind of sort goes here
