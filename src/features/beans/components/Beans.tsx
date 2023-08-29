import { Text } from "react-native";
import { BeansProps } from "../types";
import { useEffect } from "react";

export default function Beans({ amount, fetchBeans }: BeansProps) {
  useEffect(() => {
    if ("function" === typeof fetchBeans) {
      fetchBeans();
    }
  }, []);
  return <Text onPress={fetchBeans}>{amount}</Text>;
}
