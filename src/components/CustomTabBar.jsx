import React, { useContext } from "react";
import { Image, TouchableOpacity, View } from "react-native";

import HomeIcon from "../../assets/home.svg";
import SearchIcon from "../../assets/search.svg";
import TodayIcon from "../../assets/today.svg";
import Account from "../../assets/account.svg";
import FavoriteIcon from "../../assets/favorite.svg";

import { UserContext } from "../contexts/UserContext";

export default ({ state, navigation }) => {
  const { state: user } = useContext(UserContext);

  const goTo = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View className="h-14 bg-[#4eadbe] flex-row">
      <TouchableOpacity
        onPress={() => goTo("Home")}
        className="flex-1 justify-center items-center"
      >
        <HomeIcon
          style={{ opacity: state.index === 0 ? 1 : 0.5 }}
          width="24"
          height="24"
          fill="#fff"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => goTo("Search")}
        className="flex-1 justify-center items-center"
      >
        <SearchIcon
          style={{ opacity: state.index === 1 ? 1 : 0.5 }}
          width="24"
          height="24"
          fill="#fff"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => goTo("Appointments")}
        className="justify-center items-center w-16 h-16 bg-white rounded-full border-[3px] border-[#4eadbe] -mt-5"
      >
        <TodayIcon width="32" height="32" fill="#4eadbe" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => goTo("Favorite")}
        className="flex-1 justify-center items-center"
      >
        <FavoriteIcon
          style={{ opacity: state.index === 3 ? 1 : 0.5 }}
          width="24"
          height="24"
          fill="#fff"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => goTo("Profile")}
        className="flex-1 justify-center items-center"
      >
        {user.avatar != "" ? (
          <Image
            source={{
              uri: user.avatar,
            }}
            className="w-6 h-6 rounded-full object-cover object-center"
          />
        ) : (
          <Account
            style={{ opacity: state.index === 4 ? 1 : 0.5 }}
            width="24"
            height="24"
            fill="#fff"
          />
        )}
      </TouchableOpacity>
    </View>
  );
};
