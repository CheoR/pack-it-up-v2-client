import React from "react";
import { StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import COLORS from "../constants/Colors";

export default function Actions() {
  return (
    <View style={styles.popup}>
      <View>
        <MaterialCommunityIcons
          name="plus"
          size={208}
          color={COLORS.light.tint}
        />
        <Text>Add</Text>
      </View>
      <View>
        <MaterialCommunityIcons
          name="square-edit-outline"
          size={208}
          color={COLORS.light.tint}
        />
        <Text>Edit</Text>
      </View>
      <View>
        <MaterialCommunityIcons
          name="delete-outline"
          size={208}
          color={COLORS.light.tint}
        />
        <Text>Delete</Text>
      </View>
      <View>
        <MaterialCommunityIcons
          name="camera-outline"
          size={208}
          color={COLORS.light.tint}
        />
        <Text>Camera</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  popup: {
    height: 168,
    justifyContent: "space-evenly",
    width: 104,
  },
});
