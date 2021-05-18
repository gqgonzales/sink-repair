import {
  getRequests,
  deleteRequest,
  getPlumbers,
  saveCompletion,
  getCompletions,
} from "./dataAccess.js";

let completions = getCompletions();

export const Requests = () => {
  let requests = getRequests();
  let plumbers = getPlumbers();

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
                        <select class="plumbers" id="plumberChoices">
                        <option value="">Completed By</option>
                            ${plumbers.map((plumbers) => {
                              return `<option name="plumber" value="${requestObject.id}" id="${plumbers.id}">${plumbers.name}</option>`;
                            })}
                        </select>
                    <button class="request__delete"
                      id="request--${requestObject.id}">
                        Delete
                    </button>
                </li>
                `;
              })
              .join("\n")}
        </ul>
    `;

  return html;
};

const convertCompletionToListElement = (completion) => {
  return `
  <li class="completions">
  <strong>Service Order ${completion.id}</strong>, completed on ${completion.date_created}.
  </li>
  `;
};

const mainContainer = document.querySelector("#container");

mainContainer.addEventListener("change", (event) => {
  if (event.target.id === "plumberChoices") {
    const plumberId = event.target.id;
    const requestId = event.target.value;

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

// The "Delete" event listner
mainContainer.addEventListener("click", (click) => {
  if (click.target.id.startsWith("request--")) {
    const [, requestId] = click.target.id.split("--");
    deleteRequest(parseInt(requestId));
  }
});

// Some kind of sort goes here
