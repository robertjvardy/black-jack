import { QueryKey, useMutation, useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";
import queryClient from "./queryClient";
import { GameStateType } from "./shared/types";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const queryKeys: Record<string, QueryKey> = {
  init: ["init"],
};

const fetchGameState = async () => {
  const response = await apiClient.get<GameStateType>("/state");
  return response.data;
};

export const useFetchGameStateQuery = () =>
  useSuspenseQuery<GameStateType>({
    queryKey: queryKeys.init,
    queryFn: fetchGameState,
  });

const startGame = async () => {
  const response = await apiClient.post("/start");
  return response.data;
};

export const useStartGameMutation = () =>
  useMutation({
    mutationFn: startGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.init });
    },
  });
