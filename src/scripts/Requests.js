import { getRequests } from "./dataAccess.js";

export const Requests = () => {
  let requests = getRequests();

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
                    <button class="request__delete"
                id="request--${request.id}">
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
