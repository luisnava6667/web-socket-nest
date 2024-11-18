import { Manager, Socket } from "socket.io-client";

let socket: Socket;

export const connectToServer = (token: string) => {
  const manager = new Manager("http://localhost:3000/socket.io/socket.io.js", {
    extraHeaders: {
      authentication: token,
    },
  });

  socket?.removeAllListeners();

  socket = manager.socket("/");

  addListeners();
};

const addListeners = () => {
  const serverStatusLabel = document.querySelector("#server-status")!;

  const clientsUl = document.querySelector("#clients-ul")!;

  const messageInput =
    document.querySelector<HTMLInputElement>("#message-input")!;

  const messageForm = document.querySelector<HTMLFormElement>("#message-form")!;

  const messageUl = document.querySelector<HTMLUListElement>("#messages-ul")!;

  socket.on("connect", () => {
    serverStatusLabel.innerHTML = "Online";
  });

  socket.on("disconnect", () => {
    serverStatusLabel.innerHTML = "Disconnected";
  });

  socket.on("client-updated", (clients: string[]) => {
    let clientHtml = "";

    clients.forEach((client) => {
      clientHtml += `<li>${client}</li>`;
    });

    clientsUl.innerHTML = clientHtml;
  });

  messageForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (messageInput.value.trim().length <= 0) return;

    socket.emit("message-from-client", {
      id: "123",
      message: messageInput.value,
    });

    messageInput.value = "";
  });

  socket.on(
    "message-from-server",
    (payload: { fullName: string; message: string }) => {
      const newMessage = `<li>
    <strong>${payload.fullName}:<strong>
     <span>${payload.message}</span>
     </li>`;

      const li = document.createElement("li");

      li.innerHTML = newMessage;

      messageUl.appendChild(li);
    },
  );
};
