"use client";
import * as React from "react";
import axios from "axios";
import env from "@/config/env";

function useAxiosDefaults({ accessToken }: { accessToken?: string }) {
  React.useEffect(() => {
    // Always set content type for POST
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios.defaults.withCredentials = true;

    // ✅ Only set Authorization if token exists
    if (accessToken) {
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
      delete axios.defaults.headers.common.Authorization;
    }
  }, [accessToken]);
}

export default useAxiosDefaults;
