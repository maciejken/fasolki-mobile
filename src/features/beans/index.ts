import { createAction, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Status } from "src/types";
import { Beans, BeansState } from "./types";

export const initialState: BeansState = {
  allBeans: [],
  currentBeansId: undefined,
  status: "loading",
};

const beansSlice = createSlice({
  name: "beans",
  initialState,
  reducers: {
    setStatus: (state: BeansState, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
    fetchAllSuccess: (state: BeansState, action: PayloadAction<Beans[]>) => {
      const allBeans: Beans[] = action.payload;
      state.allBeans = allBeans;
      if (!state.currentBeansId) {
        state.currentBeansId = allBeans[0]?.id;
      }
    },
  },
});

export const { setStatus, fetchAllSuccess } = beansSlice.actions;
export const fetchAllBeans = createAction("beans/fetchAll");
export const updateAmount = createAction<number>("beans/updateAmount");

export default beansSlice.reducer;
