"use client";
const storage = typeof window !== "undefined" ? window.localStorage : null;

interface SaveToLocalStorageProps<T> {
  key: string;
  value: T;
}

export const saveToLocalStorage = <T>({
  key,
  value,
}: SaveToLocalStorageProps<T>): void => {
  try {
    const jsonValue = JSON.stringify(value);
    storage?.setItem(key, jsonValue);
  } catch (e) {}
};

interface GetFromLocalStorageProps<T> {
  key: string;
  cb?: (value: T) => void;
}

export const getFromLocalStorage = <T>({
  key,
  cb = () => null,
}: GetFromLocalStorageProps<T>): void => {
  try {
    const value = storage?.getItem(key);
    if (value) {
      if (typeof cb === "function") cb(JSON.parse(value));
    }
  } catch (e) {}
};

interface DeleteFromLocalStorageProps {
  key: string;
}

export const deleteFromLocalStorage = ({
  key,
}: DeleteFromLocalStorageProps): void => {
  try {
    storage?.removeItem(key);
  } catch (e) {}
};
