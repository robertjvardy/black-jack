import "./App.scss";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./queryClient";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Suspense } from "react";
import Landing from "./scenes/Landing";
import Table from "./scenes/Table";
import BaseProvider, { useBaseContext } from "./context/BaseContext";
import Loader from "./components/Loader";
import SeatAssignment from "./scenes/SeatAssignment";
import PlayerControls from "./scenes/PlayerControls";

const Router = () => {
  const { gameState } = useBaseContext();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="home" element={<Landing />} />

      {!gameState.started && (
        <Route path="*" element={<Navigate to="/home" />} />
      )}
      {gameState.started && (
        <>
          <Route path="home/seatAssignment" element={<SeatAssignment />} />
          <Route path="playerControls" element={<PlayerControls />} />
          <Route path="table" element={<Table />} />
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
          <BaseProvider>
            <Router />
          </BaseProvider>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
