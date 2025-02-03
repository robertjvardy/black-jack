import { localStorageSeatIndex, localStorageSeatKey } from "./constants";

// TODO call this when the user leave the page
export const resetLocalStorage = () => {
  localStorage.removeItem(localStorageSeatKey);
  localStorage.removeItem(localStorageSeatIndex);
};

export const storeSeatKey = (key: string) => {
  localStorage.setItem(localStorageSeatKey, key);
};
export const fetchSeatKey = () => localStorage.getItem(localStorageSeatKey);

export const storeSeatIndex = (index: number) => {
  localStorage.setItem(localStorageSeatIndex, index.toString());
};
export const fetchSeatIndex = () => localStorage.getItem(localStorageSeatIndex);
