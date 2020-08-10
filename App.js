import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Connect from './component/Connect'
import Scan from './component/Scan'
import Networks from './component/Networks'
import Devices from './component/Devices'

const Stack = createStackNavigator()

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Connect" component={Connect}/>
        <Stack.Screen name="Scan" component={Scan}/>
        <Stack.Screen name="Networks" component={Networks}/>
        <Stack.Screen name="Devices" component={Devices}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
