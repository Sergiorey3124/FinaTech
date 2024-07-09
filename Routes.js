import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Start from './Pantallas/Start';
import SignUp from './Pantallas/SignUp';



const Routes = () => {
const Stack = createStackNavigator();

return (
<NavigationContainer>
<Stack.Navigator initialRouteName={'Start'}>
<Stack.Screen name="Start" component={Start} options={{ headerShown: false }} />
<Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS, }} />

</Stack.Navigator>

</NavigationContainer>

);
};

export default Routes;