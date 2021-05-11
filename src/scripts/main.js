import { fetchRequests } from "./dataAccess.js";
import { SinkRepair } from "./SinkRepair.js";

const mainContainer = document.querySelector("#container");

const render = () => {
  fetchRequests().then(() => {
    mainContainer.innerHTML = SinkRepair();
  });
};

render();

// Now your main module has to listen for the custom event and invoke the render() function to build all the HTML again.
mainContainer.addEventListener("stateChanged", (customEvent) => {
  render();
});
