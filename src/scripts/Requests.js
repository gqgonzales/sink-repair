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
                </li>
                `;
              })
              .join("")}
        </ul>
    `;

  return html;
};
