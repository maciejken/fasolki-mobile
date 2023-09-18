import { Status } from "src/types";
import { Beans, BeansUpdate } from "../types";

export interface BeansListProps extends Partial<Beans> {
  items: Beans[];
  status: Status;
  fetchAll?: () => void;
  updateItemAmount?: (update: BeansUpdate) => void;
}

export interface BeansItemProps {
  id: string;
  amount: number;
  isLoading: Boolean;
  label?: string;
  updatedDate?: string;
  sortIndex?: number;
  updateAmount?: (update: BeansUpdate) => void;
}
