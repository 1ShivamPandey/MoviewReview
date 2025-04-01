import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import BottomTabs from './src/components/Navigation/BottomNavigation';
const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <BottomTabs></BottomTabs>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
