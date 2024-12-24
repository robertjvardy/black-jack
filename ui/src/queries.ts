import axios from "axios";
import { API_ADDRESS } from "./shared/constants";

export const apiClient = axios.create({
  baseURL: API_ADDRESS,
});
