import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  View,
} from "react-native";
import { Beans, BeansUpdate } from "../types";
import BeansItem from "./BeansItem";
import { BeansListProps } from "./types";
import { useEffect } from "react";

const BeansList: React.FC<BeansListProps> = ({
  items,
  status,
  fetchAll,
  updateItemAmount,
}) => {
  useEffect(() => {
    if ("function" === typeof fetchAll) {
      fetchAll();
    }
  }, []);

  const handleUpdateAmount = ({ id, amount }: BeansUpdate) => {
    if ("function" === typeof updateItemAmount) {
      updateItemAmount({ id, amount });
    }
  };

  const isInitialLoad: boolean = status === "loading" && items.length === 0;

  return (
    <View>
      {isInitialLoad && <ActivityIndicator color="#f06" />}
      {!isInitialLoad && (
        <View>
          <FlatList
            data={items}
            renderItem={({ item }: ListRenderItemInfo<Beans>) => (
              <BeansItem
                id={item.id}
                amount={item.amount}
                label={item.label}
                isLoading={!!(status === "loading" && item.isLoading)}
                updatedDate={item.updatedDate}
                updateAmount={handleUpdateAmount}
              />
            )}
          />
        </View>
      )}
    </View>
  );
};

export default BeansList;
