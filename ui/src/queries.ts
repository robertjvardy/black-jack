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

const init = async () => {
  const response = await apiClient.get<GameStateType>("/init");
  return response.data;
};

export const useInitQuery = () =>
  useSuspenseQuery<GameStateType>({
    queryKey: queryKeys.init,
    queryFn: init,
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
