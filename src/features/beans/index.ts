import { createAction, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Status } from "src/types";
import { Beans, BeansState, BeansUpdate } from "./types";

export const initialState: BeansState = {
  allBeans: [],
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
    },
    updateAmount: (state: BeansState, action: PayloadAction<BeansUpdate>) => {
      state.allBeans = state.allBeans.map((item: Beans) => item.id === action.payload.id ? { ...item, isLoading: true }: item);
    }
  },
});

export const { setStatus, fetchAllSuccess, updateAmount } = beansSlice.actions;
export const fetchAllBeans = createAction("beans/fetchAll");

export default beansSlice.reducer;
