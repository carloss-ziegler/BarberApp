import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import Api from "../../Api";
import Stars from "../../components/Stars";
import FavoriteIcon from "../../../assets/favorite.svg";
import FavoriteFullIcon from "../../../assets/favorite_full.svg";
import Back from "../../../assets/back.svg";
import { StatusBar } from "expo-status-bar";
import BarberModal from "../../components/BarberModal";

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
  const [isFavorited, setIsFavorited] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getBarberInfo = async () => {
      setLoading(true);
      let json = await Api.getBarber(userInfo.id);
      if (json.error == "") {
        setUserInfo(json.data);
        setIsFavorited(json.data.favorite);
      } else {
        alert(json.error);
      }
      setLoading(false);
    };
    getBarberInfo();
  }, []);

  const handleFavorite = async () => {
    await Api.setFavorite(userInfo.id);
    setIsFavorited(!isFavorited);
  };

  const handleChooseService = (index) => {
    setSelectedService(index);
    setShowModal(true);
  };

  return (
    <View className="flex-1 bg-[#f5f5f5]">
      <ScrollView className="flex-1">
        <StatusBar style="dark" />
        <View>
          {userInfo.photos && userInfo.photos.length > 0 ? (
            <Image
              source={{ uri: userInfo.photos[0].url }}
              className="w-full h-[240px] bg-gray-300"
              resizeMode="cover"
            />
          ) : (
            <View className="w-full h-48 bg-[#4eadbe]" />
          )}
        </View>
        <View className="bg-[#f5f5f5] rounded-tl-[50px] -mt-12 min-h-[400px]">
          <View className="flex-row mx-8">
            <Image
              source={{ uri: userInfo.avatar }}
              className="w-28 h-28 rounded-xl -mt-10 mr-5 border-[2px] border-[#FFF]"
            />

            <View className="flex-1 justify-end">
              <Text className="text-lg font-semibold text-gray-600 mb-2">
                {userInfo.name}
              </Text>
              <Stars stars={userInfo.stars} showNumber />
            </View>

            <TouchableOpacity
              onPress={handleFavorite}
              className="w-10 h-10 bg-white border border-[#999999] rounded-full items-center justify-center -mt-4"
            >
              {isFavorited ? (
                <FavoriteFullIcon width="24" height="24" fill="#ff0000" />
              ) : (
                <FavoriteIcon width="24" height="24" fill="#ff0000" />
              )}
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

                {userInfo.services?.map((item, index) => (
                  <View
                    key={index}
                    className="mx-5 mt-4 flex-row items-center justify-between bg-white rounded shadow p-3"
                  >
                    <View>
                      <Text className="text-base font-medium">{item.name}</Text>
                      <Text className="text-sm text-gray-400 mt-1">
                        R${item.price}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => handleChooseService(index)}
                      className="bg-[#4eadbe]  p-2 rounded"
                    >
                      <Text className="text-white font-semibold text-sm">
                        Agendar
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>

              {userInfo.testimonials && userInfo.testimonials.length > 0 && (
                <View className="mt-5 p-5">
                  {userInfo.testimonials?.map((item, index) => (
                    <View key={index} className="mb-5">
                      <View className="flex-row items-center justify-between mb-2">
                        <View className="flex-row items-center space-x-1">
                          <Image
                            source={{
                              uri: "https://img.freepik.com/fotos-gratis/cliente-fazendo-o-corte-de-cabelo-em-um-salao-de-barbearia_1303-20889.jpg?w=360",
                            }}
                            className="bg-gray-300 h-12 w-12 rounded-xl"
                            resizeMode="cover"
                          />
                          <Text className="text-gray-600 text-sm font-semibold">
                            {item.name}
                          </Text>
                        </View>
                        <Stars stars={item.rate} />
                      </View>

                      <Text className="text-gray-500 font-medium text-xs mb-3">
                        {item.body}
                      </Text>

                      <View className="h-[1px] bg-[#33333333]" />
                    </View>
                  ))}
                </View>
              )}
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

      <BarberModal
        show={showModal}
        setShow={setShowModal}
        data={userInfo}
        service={selectedService}
      />
    </View>
  );
};

export default BarberScreen;
