import { ActivityIndicator, View } from "react-native";
import React, { useContext, useEffect } from "react";
import BarberLogo from "../../../assets/barber.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "../../Api";
import { UserContext } from "../../contexts/UserContext";

const PreloadScreen = ({ navigation }) => {
  const { dispatch: userDispatch } = useContext(UserContext);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token !== null) {
        let res = await Api.checkToken(token);
        if (res.token) {
          await AsyncStorage.setItem("token", res.token);

          userDispatch({
            type: "setAvatar",
            payload: {
              avatar: res.data.avatar,
            },
          });

          navigation.reset({
            routes: [{ name: "MainTab" }],
          });
        } else {
          navigation.navigate("Login");
        }
      } else {
        navigation.navigate("Login");
      }
    };
    checkToken();
  }, []);

  return (
    <View className="bg-[#63c2d1] flex-1 items-center justify-center">
      <BarberLogo width="100%" height="160" />
      <ActivityIndicator color="#fff" size="large" className="mt-12" />
    </View>
  );
};

export default PreloadScreen;
