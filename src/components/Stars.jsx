import { View, Text } from "react-native";
import React from "react";

import StarFull from "../../assets/star.svg";
import StarHalf from "../../assets/star_half.svg";
import StarEmpty from "../../assets/star_empty.svg";

const Stars = ({ stars, showNumber }) => {
  let s = [0, 0, 0, 0, 0];
  let floor = Math.floor(stars);
  let left = stars - floor;

  for (var i = 0; i < floor; i++) {
    s[i] = 2;
  }
  if (left > 0) {
    s[i] = 1;
  }

  return (
    <View className="flex-row">
      {s.map((i, k) => (
        <View key={k}>
          {i === 0 && <StarEmpty width="18" height="18" fill="#ff9200" />}
          {i === 1 && <StarHalf width="18" height="18" fill="#ff9200" />}
          {i === 2 && <StarFull width="18" height="18" fill="#ff9200" />}
        </View>
      ))}
      {showNumber && (
        <Text className="ml-1 text-xs font-semibold text-[#737373]">
          {stars}
        </Text>
      )}
    </View>
  );
};

export default Stars;
