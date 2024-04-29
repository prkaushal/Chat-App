import React, { useEffect, useState } from "react";
import { user } from "./Login";
import "./Chat.css";
import socketIO from "socket.io-client";
import Message from "./Message";
import ReactScrollToBottom from "react-scroll-to-bottom";

let socket;
const ENDPOINT = "http://localhost:3000/";

const Chat = () => {
  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);

  const send = () => {
    const message = document.getElementById("chatInput").value;
    socket.emit("message", { message, id });
    document.getElementById("chatInput").value = "";
  };

  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      alert("connected");
      setId(socket.id);
      console.log("connected to server");
    });

    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });
    socket.on("userJoined", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });
    socket.on("leave", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    return () => {
      socket.emit("disconnected");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages , data]);
      console.log(data.user, data.message, data.id);
    });
    return () => {
      socket.off();
    };
  }, [messages]);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h2>CHAT APP</h2>
        </div>
        <ReactScrollToBottom className="chatbox">
          {messages.map((item, i) => (
            <Message message={item.message} user={item.id === id?'' : item.user} classs={item.id === id?'right' : 'left'} />
          ))}
        </ReactScrollToBottom>
        <div className="inputbox">
          <input type="text" onKeyPress={(event)=> event.key === 'Enter'? send() : null} id="chatInput" />
          <button className="sendBtn" onClick={send}>
            SEND
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
