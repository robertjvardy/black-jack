import "./App.css";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./queryClient";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Suspense } from "react";
import Landing from "./scenes/Landing";
import Table from "./scenes/Table";
import SocketProvider, { useGameContext } from "./context/SocketContext";
import Loader from "./components/Loader";
import Player from "./scenes/Player";

const Router = () => {
  const { gameState } = useGameContext();
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="home" element={<Landing />} />
      {!gameState.started && (
        <Route path="*" element={<Navigate to="/home" />} />
      )}
      {gameState.started && (
        <>
          <Route path="table" element={<Table />} />
          <Route path="player/*" element={<Player />} />
        </>
      )}
    </Routes>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <SocketProvider>
            <Router />
          </SocketProvider>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
