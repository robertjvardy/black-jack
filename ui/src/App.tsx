import { useState } from "react";
import { io } from "socket.io-client";
import "./App.css";
import axios from "axios";

const socket = io("ws://localhost:8080/", {});

socket.on("connect", () => {
  console.log(`connect ${socket.id}`);
});

socket.on("disconnect", () => {
  console.log(`disconnect`);
});

function App() {
  const [count, setCount] = useState(0);

  const emitAction = () => {
    const start = Date.now();
    socket.emit("ping", () => {
      console.log(`pong (latency: ${Date.now() - start} ms)`);
    });
  };

  const handleApiCall = async () => {
    const response = await axios.get("http://localhost:8080/test");
    console.log(response.data);
  };

  return (
    <>
      <h1>Sockets project</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={emitAction}>Emit Action</button>
        <button onClick={handleApiCall}>Hit Api</button>
      </div>
    </>
  );
}

export default App;
