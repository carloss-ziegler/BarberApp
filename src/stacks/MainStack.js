import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PreloadScreen from "../screens/PreloadScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import MainTab from "./MainTab";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Preload"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Preload" component={PreloadScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="MainTab" component={MainTab} />
    </Stack.Navigator>
  );
};

export default MainStack;
