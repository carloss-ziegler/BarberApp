import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Stars from "./Stars";
import { useNavigation } from "@react-navigation/native";

const BarberItem = ({ data }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Barber", {
          id: data.id,
          avatar: data.avatar,
          stars: data.stars,
          name: data.name,
        })
      }
      className="bg-[#f5f5f5] shadow mb-5 rounded-lg p-4 flex-row"
    >
      <Image className="w-20 h-20 rounded" source={{ uri: data.avatar }} />

      <View className="ml-5 flex-col justify-between w-32">
        <Text className="text-base font-semibold">{data.name}</Text>
        <Stars stars={data.stars} showNumber={true} />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Barber", {
              id: data.id,
              avatar: data.avatar,
              stars: data.stars,
              name: data.name,
            })
          }
          className="rounded py-2 px-1 items-center justify-center border border-[#4eadbe]"
        >
          <Text className="text-[#268596] text-sm">Ver Perfil</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default BarberItem;
