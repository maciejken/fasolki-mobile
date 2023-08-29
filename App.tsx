import { Provider } from 'react-redux';
import { store } from "./src/app/store";
import { StyleSheet, Text, View } from 'react-native';
import Beans from 'src/features/beans/components';

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text>Fasolki</Text>
        <Beans />
      </View>
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
