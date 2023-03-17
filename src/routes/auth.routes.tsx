import React from "react";
import { Login } from "../screens/Login";
import { Register} from "../screens/Register";
import { createStackNavigator } from "@react-navigation/stack";

const AuthStack = createStackNavigator();

 export const AuthRoutes = () => (
    <AuthStack.Navigator screenOptions={{headerShown:false}}>
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="Register" component={Register} />
    </AuthStack.Navigator>
);