import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";
import { View, Text } from "react-native";

import COLORS from "../constants/Colors";

export default function SocialsIcons() {
  return (
    <View>
      <View
        style={{
          width: "50%",
          paddingVertical: 15,
          paddingHorizontal: 10,
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <FontAwesomeIcons
          name="facebook-square"
          size={24}
          color={COLORS.light.tint}
        />
        <FontAwesomeIcons
          name="linkedin-square"
          size={24}
          color={COLORS.light.tint}
        />
        <FontAwesomeIcons
          name="twitter-square"
          size={24}
          color={COLORS.light.tint}
        />
        <FontAwesomeIcons
          name="instagram"
          size={24}
          color={COLORS.light.tint}
        />
      </View>
      <View
        style={{
          paddingVertical: 15,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MaterialCommunityIcons
          name="copyright"
          size={16}
          color={COLORS.light.tint}
        />
        <Text>2022</Text>
      </View>
    </View>
  );
}
