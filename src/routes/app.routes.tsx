import { createStackNavigator } from "@react-navigation/stack";
import { Home } from '../screens/Home';

const AppStack = createStackNavigator();

export const AppRoutes = () => {
  return (
    <AppStack.Navigator screenOptions={{headerShown:false}}>     
      <AppStack.Screen name="Home" component={Home} />
    </AppStack.Navigator>
  );
}