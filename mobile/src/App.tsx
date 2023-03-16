import React from 'react';
import Home from './screens/Home';
import Login from './screens/Login';
import {AuthProvider} from './context/AuthContext';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {MainProvider} from './context';

const Stack = createStackNavigator();
const App = () => {
  return (
    <AuthProvider>
      <MainProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="Login">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
      </MainProvider>
    </AuthProvider>
  );
};

export default App;
