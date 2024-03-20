import React from 'react';
import {StyleSheet} from 'react-native';
import {Provider as ReduxProvider} from 'react-redux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {store} from './src/store/store';

import RootNavigation from './src/components/navigation/RootNavigation';

function App() {
  return (
    <ReduxProvider store={store}>
      <GestureHandlerRootView style={styles.container}>
        <RootNavigation />
      </GestureHandlerRootView>
    </ReduxProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
