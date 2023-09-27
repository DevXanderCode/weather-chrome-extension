import { OpenWeatherTempScale } from "./api";

export interface LocalStorage {
  cities?: string[];
  options?: LocalStorageOptions;
}

export interface LocalStorageOptions {
  homeCity: string;
  tempScale: OpenWeatherTempScale;
}

export type LocalStorageKeys = keyof LocalStorage;

export function setStoredCities(cities: string[]): Promise<void> {
  const vals: LocalStorage = {
    cities,
  };
  return new Promise((resolve, reject) => {
    chrome.storage.local.set(vals, () => {
      resolve();
    });
  });
}

export function getStoredCities(): Promise<string[]> {
  const keys: LocalStorageKeys[] = ["cities"];

  return new Promise((resolve, reject) => {
    chrome.storage.local.get(keys, (result: LocalStorage) => {
      resolve(result?.cities ?? []);
    });
  });
}

export function getStoredOptions(): Promise<LocalStorageOptions> {
  const keys: LocalStorageKeys[] = ["options"];
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(keys, (result: LocalStorage) => {
      resolve(result?.options ?? { tempScale: "metric", homeCity: "" });
    });
  });
}

export function setStoredOptions(options: LocalStorageOptions): Promise<void> {
  const vals: LocalStorage = { options };

  return new Promise((resolve, reject) => {
    chrome.storage.local.set(vals, () => {
      resolve();
    });
  });
}
