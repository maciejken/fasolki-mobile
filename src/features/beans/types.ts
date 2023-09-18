import { Status } from "src/types";

export interface Beans {
  amount: number;
  id: string;
  label?: string;
  isLoading?: boolean;
  updatedDate?: string;
  updatedBy?: string;
  sortIndex?: number;
}

export interface BeansState {
  allBeans: Beans[];
  status: Status;
}

export interface BeansUpdate {
  id: string;
  amount: number;
}