import React from "react";
import { View, Text } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";
import Colors from "../constants/Colors";

export default function SocialsIcons() {
  return (
    <>
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
          color={Colors.light.tint}
        />
        <FontAwesomeIcons
          name="linkedin-square"
          size={24}
          color={Colors.light.tint}
        />
        <FontAwesomeIcons
          name="twitter-square"
          size={24}
          color={Colors.light.tint}
        />
        <FontAwesomeIcons
          name="instagram"
          size={24}
          color={Colors.light.tint}
        />
      </View>
      <View
        style={{
          paddingVertical: 15,
          paddingHorizontal: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <MaterialCommunityIcons
          name="copyright"
          size={16}
          color={Colors.light.tint}
        />
        <Text>2022</Text>
      </View>
    </>
  );
}
