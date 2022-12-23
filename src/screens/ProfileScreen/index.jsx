import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Api from "../../Api";

const ProfileScreen = ({ navigation }) => {
  async function logout() {
    await Api.signOut();
    navigation.reset({
      routes: [{ name: "Login" }],
    });
  }

  return (
    <View className="flex-1 justify-center items-center">
      <TouchableOpacity onPress={logout}>
        <Text className="text-red-500">Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
