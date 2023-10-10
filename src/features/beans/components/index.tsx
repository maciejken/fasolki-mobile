import { selectAllBeans, selectBeansStatus } from "../selectors";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { fetchAllBeans, updateAmount } from "..";
import { Status } from "src/types";
import { Beans, BeansUpdate } from "../types";
import BeansList from "./BeansList";
import { View, Text, TouchableHighlight } from "react-native";

function BeansConnector({ navigation }: { navigation: any }) {
  const dispatch = useAppDispatch();

  const allBeans: Beans[] = useAppSelector(selectAllBeans);
  const beansStatus: Status = useAppSelector(selectBeansStatus);

  const handleUpdateItemAmount = ({ id, amount }: BeansUpdate) => {
    dispatch(updateAmount({ id, amount }));
  };
  return (
    <View>
      <TouchableHighlight onPress={() =>
        navigation.navigate('Settings')}>
          <View><Text>Settings</Text></View>
      </TouchableHighlight>
      <BeansList
        items={allBeans}
        status={beansStatus}
        fetchAll={() => {
          dispatch(fetchAllBeans());
        }}
        updateItemAmount={handleUpdateItemAmount}
      />
    </View>

  );
}

export default BeansConnector;
