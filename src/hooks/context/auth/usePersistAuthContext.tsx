"use client";
import { useEffect } from "react";
import env from "@/config/env";
import { useDispatch, useSelector } from "react-redux";
import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "@/utils/localStorage/AsyncStorage";
import { setAuthState } from "@/redux/Slices/authSlice";

const PERSIST_AUTH_KEY = env?.auth?.PERSIST_AUTH_KEY;
const INITIAL_APP_STATE = env?.auth?.INITIAL_APP_STATE;

const usePersistAppContext = () => {
  const dispatch = useDispatch();
  const appState = useSelector((state: any) => state.auth);

  useEffect(() => {
    getFromLocalStorage({
      key: PERSIST_AUTH_KEY,
      cb: (storedState: any) => {
        if (storedState) {
          dispatch(setAuthState(storedState));
        }
      },
    });
  }, [dispatch]);

  useEffect(() => {
    if (appState !== INITIAL_APP_STATE) {
      saveToLocalStorage({
        key: PERSIST_AUTH_KEY,
        value: appState,
      });
    }
  }, [appState]);

  return null;
};

export default usePersistAppContext;
