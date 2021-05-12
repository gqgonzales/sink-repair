import {
  getRequests,
  deleteRequest,
  // getPlumbers,
} from "./dataAccess.js";

export const Requests = () => {
  let requests = getRequests();
  let plumbers = getPlumbers();

  let html = `
        <ul>
            ${requests
              .map((requestObject) => {
                return `
                <li>
                        ID: ${requestObject.id}
                        Description: ${requestObject.description}
                        Address: ${requestObject.address}
                        Budget: $${requestObject.budget}
                        Due Date: ${requestObject.neededBy}
                        <select class="plumbers" id="plumbers">
                          <option value="">Choose</option>
                          ${plumbers
                            .map((plumber) => {
                              return `<option value="${requestObject.id}--${plumber.id}">${plumber.name}</option>`;
                            })
                            .join("")}
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

mainContainer.addEventListener("click", (click) => {
  if (click.target.id.startsWith("request--")) {
    const [, requestId] = click.target.id.split("--");
    deleteRequest(parseInt(requestId));
  }
});

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
    const completion = {};

    /*
              Invoke the function that performs the POST request
              to the `completions` resource for your API. Send the
              completion object as a parameter.
           */
  }
});

// Some kind of sort goes here
