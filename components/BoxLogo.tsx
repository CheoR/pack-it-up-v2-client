import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../constants/Colors";

export default function BoxLogo() {
  return (
    <MaterialCommunityIcons
      name="package-variant-closed"
      size={208}
      color={Colors.light.tint}
    />
  );
}
