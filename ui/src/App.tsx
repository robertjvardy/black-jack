import "./App.css";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./queryClient";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { useInitQuery } from "./queries";
import { Suspense } from "react";
import Landing from "./scenes/Landing";
import Board from "./scenes/Board";
import SocketProvider from "./context/SocketContext";
import Loader from "./components/Loader";

const Router = () => {
  const { data } = useInitQuery();
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="home" element={<Landing isStarted={data.started} />} />
      {data.started && (
        <Route
          path="board"
          element={
            <SocketProvider>
              <Board />
            </SocketProvider>
          }
        />
      )}
      {data.started && <Route path="play" element={<div>Play</div>} />}
    </Routes>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Router />
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
