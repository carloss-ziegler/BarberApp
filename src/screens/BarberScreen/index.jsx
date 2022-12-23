import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import Api from "../../Api";
import Stars from "../../components/Stars";
import FavoriteIcon from "../../../assets/favorite.svg";
import Back from "../../../assets/back.svg";
import { StatusBar } from "expo-status-bar";

const BarberScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [userInfo, setUserInfo] = useState({
    name: route.params.name,
    avatar: route.params.avatar,
    stars: route.params.stars,
    id: route.params.id,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBarberInfo = async () => {
      setLoading(true);
      let json = await Api.getBarber(userInfo.id);
      if (json.error == "") {
        setUserInfo(json.data);
      } else {
        alert(json.error);
      }
      setLoading(false);
    };
    getBarberInfo();
  }, []);

  return (
    <View className="flex-1 bg-[#f5f5f5]">
      <ScrollView className="flex-1">
        <StatusBar style="light" />
        <View>
          {userInfo.photos && userInfo.photos.length > 0 ? (
            <Image
              source={{ uri: userInfo.photos[0].url }}
              className="w-full h-[240px] bg-gray-300"
              resizeMode="cover"
            />
          ) : (
            <View className="w-full h-48 bg-[#62d2c1]" />
          )}
        </View>
        <View className="bg-[#f5f5f5] rounded-tl-[50px] -mt-12 min-h-[400px]">
          <View className="flex-row mx-8">
            <Image
              source={{ uri: userInfo.avatar }}
              className="w-28 h-28 rounded-xl -mt-10 mr-5 border-[4px] border-[#FFF]"
            />

            <View className="flex-1 justify-end">
              <Text className="text-lg font-semibold text-gray-600 mb-2">
                {userInfo.name}
              </Text>
              <Stars stars={userInfo.stars} showNumber />
            </View>

            <TouchableOpacity className="w-10 h-10 bg-white border border-[#999999] rounded-full items-center justify-center -mt-4">
              <FavoriteIcon width="24" height="24" fill="#ff0000" />
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicator color="#252525" size="large" className="mt-24" />
          ) : (
            <View className="mt-10">
              <View>
                <Text className="ml-5 font-semibold text-gray-500 text-lg">
                  Lista de serviços
                </Text>
              </View>

              <View></View>
            </View>
          )}
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={navigation.goBack}
        className="absolute top-10 left-6 items-center justify-center rounded-full bg-white opacity-80"
      >
        <Back width="36" height="36" fill="#62d2c1" />
      </TouchableOpacity>
    </View>
  );
};

export default BarberScreen;
