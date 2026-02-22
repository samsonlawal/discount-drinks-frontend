import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types";

// Define proper types for your task state
type memberState = {
  members: Array<User> | null;
};

const initialState: memberState = {
  members: [],
};

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    setMembers: (state, action: PayloadAction<Array<User> | null>) => {
      state.members = action.payload;
    },
  },
});

export const { setMembers } = memberSlice.actions;
export default memberSlice.reducer;
