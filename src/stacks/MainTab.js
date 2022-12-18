import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import AppointmentsScreen from "../screens/AppointmentsScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import ProfileScreen from "../screens/ProfileScreen";

import CustomTabBar from "../components/CustomTabBar";

const Tab = createBottomTabNavigator();

export default () => (
  <Tab.Navigator
    tabBar={(props) => <CustomTabBar {...props} />}
    screenOptions={{ headerShown: false }}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Search" component={SearchScreen} />
    <Tab.Screen name="Appointments" component={AppointmentsScreen} />
    <Tab.Screen name="Favorite" component={FavoriteScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);
