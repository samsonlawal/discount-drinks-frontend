import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveToLocalStorage } from "@/utils/localStorage/AsyncStorage";

type currentWorkspaceIdState = {
  currentWorkspaceId: string | null;
};

const initialState: currentWorkspaceIdState = {
  currentWorkspaceId: null,
};

const currentWorkspaceSlice = createSlice({
  name: "currentWorkspace",
  initialState,
  reducers: {
    setCurrentWorkspace: (state, action: PayloadAction<string | null>) => {
      state.currentWorkspaceId = action.payload;
      saveToLocalStorage({ key: "CurrentWorkspaceId", value: action.payload });
    },
    clearCurrentWorskpace: (state) => {
      state.currentWorkspaceId = null;
    },
  },
});

export const { setCurrentWorkspace } = currentWorkspaceSlice.actions;
export default currentWorkspaceSlice.reducer;
