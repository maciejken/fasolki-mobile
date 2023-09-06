import { createAction, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Status } from "src/types";
import { Beans, BeansState } from "./types";
import { EXPO_PUBLIC_INITIAL_BEANS_ID, EXPO_PUBLIC_HEADER_TITLE } from "@env";

export const initialState: BeansState = {
  id: EXPO_PUBLIC_INITIAL_BEANS_ID,
  label: EXPO_PUBLIC_HEADER_TITLE,
  amount: 0,
  status: "loading",
};

const beansSlice = createSlice({
  name: "beans",
  initialState,
  reducers: {
    setStatus: (state: BeansState, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
    fetchSuccess: (state: BeansState, action: PayloadAction<Beans>) => {
      state.amount = action.payload.amount;
      state.id = action.payload.id;
      state.label = action.payload.label;
    },
    updateSuccess: (state: BeansState, action: PayloadAction<Beans>) => {
      state.amount = action.payload.amount;
      state.id = action.payload.id;
      state.label = action.payload.label;
    },
  },
});

export const { setStatus, fetchSuccess, updateSuccess } = beansSlice.actions;
export const fetchBeans = createAction("beans/fetch");
export const updateAmount = createAction<number>("beans/updateAmount");

export default beansSlice.reducer;
