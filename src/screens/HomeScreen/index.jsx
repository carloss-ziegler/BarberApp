import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import SearchIcon from "../../../assets/search.svg";
import MyLocationIcon from "../../../assets/my_location.svg";

import Api from "../../Api";

import * as Location from "expo-location";
import BarberItem from "../../components/BarberItem";

const HomeScreen = ({ navigation }) => {
  const [searchInput, setSearchInput] = useState("");
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    getBarbers();
  }, []);

  async function getBarbers() {
    setLoading(true);
    setList([]);

    let res = await Api.getBarbers();
    if (res.error === "") {
      if (res.loc) {
        setSearchInput(res.loc);
      }

      setList(res.data);
    } else {
      alert("Erro: " + res.error);
    }

    setLoading(false);
  }

  async function handleLocationFinder() {
    setLocation(null);
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status === "granted") {
      setLoading(true);
      setSearchInput("");
      setList([]);

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
      getBarbers();
      setLoading(false);
    }
  }

  return (
    <View className="flex-1 bg-[#63c2d1]">
      <ScrollView className="flex-1 p-5 mt-5">
        <View className="flex-row justify-between items-center">
          <Text
            className="text-2xl font-bold text-white w-[250px]"
            numberOfLines={2}
          >
            Encontre o seu Barbeiro favorito
          </Text>
          <TouchableOpacity
            className="w-7 h-7"
            onPress={() => navigation.navigate("Search")}
          >
            <SearchIcon width="28" height="28" fill="#fff" />
          </TouchableOpacity>
        </View>

        <View className="bg-[#4eadbe] h-14 rounded-lg mt-7 flex-row items-center px-5">
          <TextInput
            value={searchInput}
            onChangeText={(text) => setSearchInput(text)}
            placeholderTextColor="#e5e5e5"
            className="flex-1 text-base text-white h-12"
            placeholder="Onde você está agora?"
          />
          <TouchableOpacity onPress={handleLocationFinder} className="h-6 w-6">
            <MyLocationIcon width="28" height="28" fill="#fff" />
          </TouchableOpacity>
        </View>

        {loading && (
          <ActivityIndicator className="mt-10" size="large" color="#fff" />
        )}

        <View className="my-7">
          {list.map((item, index) => (
            <BarberItem key={index} data={item} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
