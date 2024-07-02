import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import Start from './Pantallas/Start';



const Routes = () => {
const Stack = createStackNavigator();

return (
<NavigationContainer>
<Stack.Navigator initialRouteName={'Start'}>
<Stack.Screen name="Start" component={Start} options={{ headerShown: false }} />

</Stack.Navigator>

</NavigationContainer>

);
};

export default Routes;