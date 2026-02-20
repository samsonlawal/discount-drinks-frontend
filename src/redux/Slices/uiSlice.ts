import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UIState = {
  currentUI: "tasks" | "team" | "dashboard" | "settings" | "";
};

const initialState: UIState = {
  currentUI: "tasks",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setCurrentUI: (
      state,
      action: PayloadAction<"tasks" | "team" | "dashboard" | "settings">,
    ) => {
      state.currentUI = action.payload;
    },
  },
});

export const { setCurrentUI } = uiSlice.actions;
export default uiSlice.reducer;
