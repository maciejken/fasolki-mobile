import { Status } from "src/types";

export interface Beans {
  amount: number;
  id: string;
  label?: string;
  updatedDate?: string;
  updatedBy?: string;
}

export interface BeansState {
  allBeans: Beans[];
  status: Status;
  currentBeansId?: string;
}

export interface BeansProps extends Partial<Beans> {
  status: Status;
  fetchAll?: () => void;
  updateAmount?: (value: number) => void;
}
