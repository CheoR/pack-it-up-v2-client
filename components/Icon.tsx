import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet, Text, View } from "react-native";

import Colors from "../constants/Colors";

const icons = {
  move: (
    <MaterialCommunityIcons name="dolly" size={24} color={Colors.light.tint} />
  ),
  box: (
    <MaterialCommunityIcons
      name="package-variant-closed"
      size={24}
      color={Colors.light.tint}
    />
  ),
  item: (
    <MaterialCommunityIcons
      name="clipboard-text-outline"
      size={24}
      color={Colors.light.tint}
    />
  ),
};

export default function Icon({ count, type, showType = false }) {
  return (
    <View style={styles.box}>
      <View style={styles.iconBox}>
        <View style={styles.countCircle}>
          <Text style={styles.countText}>{count}</Text>
        </View>
        {icons[type]}
      </View>
      {showType && <Text style={styles.typeText}>{type.toUpperCase()}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    justifyContent: "space-between",
    width: 64,
  },
  iconBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  countCircle: {
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 2,
    height: 20,
    justifyContent: "center",
    left: 15,
    position: "relative",
    top: 10,
    width: 20,
  },
  countText: {
    fontSize: 12,
  },
  typeText: {
    textAlign: "center",
  },
});
