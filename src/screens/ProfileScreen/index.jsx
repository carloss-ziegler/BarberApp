import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <TouchableOpacity
        onPress={async () => {
          await AsyncStorage.removeItem("token");
        }}
      >
        <Text className="text-red-500">Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
