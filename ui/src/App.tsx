import "./App.css";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./queryClient";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { useFetchGameStateQuery } from "./queries";
import { Suspense } from "react";
import Landing from "./scenes/Landing";
import Table from "./scenes/Table";
import SocketProvider from "./context/SocketContext";
import Loader from "./components/Loader";
import Player from "./scenes/Player";

const Router = () => {
  const { data } = useFetchGameStateQuery();
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="home" element={<Landing isStarted={data.started} />} />
      {data.started && (
        <Route
          path="table"
          element={
            <SocketProvider>
              <Table />
            </SocketProvider>
          }
        />
      )}
      {data.started && <Route path="player/*" element={<Player />} />}
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
