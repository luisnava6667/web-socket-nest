import { connectToServer } from "./socket-client";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>

  <h2>Websocket - Client</h2>

  <input type="text" id="jwt-token" placeholder="Json Web Token" />
  <button id="btn-connect">Connect</button>
<br/>
  <span id="server-status">OffLine</span>
  <ul id="clients-ul">
  </ul>
  <form id="message-form">
  <input type="text" id="message-input" placeholder="Type your message" />
  </form>
  <h3>Messages</h3>
  <ul id="messages-ul">
  
  </ul>
  </div>
  `;

// connectToServer();
// <button type="submit" id="send-btn">Send</button>
// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
const jwtToken = document.querySelector<HTMLInputElement>("#jwt-token")!;
const btnConnect = document.querySelector<HTMLButtonElement>("#btn-connect")!;

btnConnect.addEventListener("click", () => {
  if (jwtToken.value.trim().length <= 0)
    return alert("Please enter a valid token");
  connectToServer(jwtToken.value.trim());
});
