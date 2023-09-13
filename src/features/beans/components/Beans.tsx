import { ActivityIndicator, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { BeansProps } from "../types";
import { useEffect } from "react";

export default function Beans({
  label,
  amount,
  status,
  updatedDate,
  fetchAll,
  updateAmount
}: BeansProps) {
  const updateByValue = (amount: number) => {
    if ('function' === typeof updateAmount) {
      updateAmount(amount);
    }
  };

  const handleIncrement = () => {
    updateByValue(1);
  };

  const handleDecrement = () => {
    updateByValue(-1);
  };

  const handleIncrementLong = () => {
    updateByValue(5);
  };

  const handleDecrementLong = () => {
    updateByValue(-5);
  };

  const isLoading: boolean = status === 'loading';

  useEffect(() => {
    if ("function" === typeof fetchAll) {
      fetchAll();
    }
  }, []);
  
  return (
    <View style={styles.col}>
      <View style={styles.row}><Text style={styles.label}>{label}</Text></View>
      <View style={styles.row}>
        <TouchableHighlight style={styles.btn} onPress={handleDecrement} onLongPress={handleDecrementLong}>
          <View><Text style={styles.btnTxt}>-</Text></View>
        </TouchableHighlight>
        <View style={styles.content}>
          {isLoading && <ActivityIndicator color="#f06" />}
          {!isLoading && <Text style={styles.contentTxt} onPress={fetchAll}>{amount}</Text>}
        </View>
        <TouchableHighlight style={styles.btn} onPress={handleIncrement} onLongPress={handleIncrementLong}>
          <View><Text style={styles.btnTxt}>+</Text></View>
        </TouchableHighlight>
      </View>
      {isLoading &&  <View style={styles.row}><Text style={styles.info}>Pobieranie danych...</Text></View>}
      {!isLoading && updatedDate && <View style={styles.row}><Text style={styles.info}>Ostatnia zmiana: {updatedDate}</Text></View>}
    </View>
  );
}

const styles = StyleSheet.create({
  col: {
    alignItems: 'center'
  },
  row: {
    margin: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
  },
  btn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
  },
  btnTxt: {
    fontSize: 24,
  },
  content: {
    width: 100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  contentTxt: {
    fontSize: 24,
  },
  info: {
    color: '#888',
  }
})
