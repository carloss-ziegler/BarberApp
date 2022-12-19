import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Stars from "./Stars";

const BarberItem = ({ data }) => {
  return (
    <TouchableOpacity className="bg-[#f5f5f5] shadow mb-5 rounded-lg p-4 flex-row">
      <Image className="w-20 h-20 rounded" source={{ uri: data.avatar }} />

      <View className="ml-5 flex-col justify-between w-32">
        <Text className="text-base font-semibold">{data.name}</Text>
        <Stars stars={data.stars} showNumber={true} />
        <TouchableOpacity className="rounded py-2 px-1 items-center justify-center border border-[#4eadbe]">
          <Text className="text-[#268596] text-sm">Ver Perfil</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default BarberItem;
