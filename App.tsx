import { Provider } from 'react-redux';
import { store } from "./src/app/store";
import { StyleSheet, View } from 'react-native';
import Beans from 'src/features/beans/components';

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Beans />
      </View>
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    backgroundColor: '#fff',
  },
});
