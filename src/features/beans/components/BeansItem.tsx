import { ActivityIndicator, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { BeansItemProps } from "./types";

export default function Beans({
  id,
  label,
  amount,
  isLoading,
  updatedDate,
  updateAmount,
}: BeansItemProps) {

  const updateByValue = (amount: number) => {
    if ('function' === typeof updateAmount) {
      updateAmount({ id, amount });
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
  
  return (
    <View style={styles.col}>
      <View style={styles.row}><Text style={styles.label}>{label}</Text></View>
      <View style={styles.row}>
        <TouchableHighlight style={styles.btn} onPress={handleDecrement} onLongPress={handleDecrementLong}>
          <View><Text style={styles.btnTxt}>-</Text></View>
        </TouchableHighlight>
        <View style={styles.content}>
          {isLoading && <ActivityIndicator color="#f06" />}
          {!isLoading && <Text style={styles.contentTxt}>{amount}</Text>}
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
    marginTop: 25,
    marginBottom: 25,
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
