import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define proper types for your task state
type memberState = {
  members: Array<any> | null;
};

const initialState: memberState = {
  members: [],
};

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    setMembers: (state, action: PayloadAction<Array<any> | null>) => {
      state.members = action.payload;
    },
  },
});

export const { setMembers } = memberSlice.actions;
export default memberSlice.reducer;
