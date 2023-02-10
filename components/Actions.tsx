import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Icon } from "../constants/Icon";

export default function Actions() {
  return (
    <View style={styles.popup}>
      <View>
        <Icon size={208} type="plusSign" />
        <Text>Add</Text>
      </View>
      <View>
        <Icon size={208} type="edit" />
        <Text>Edit</Text>
      </View>
      <View>
        <Icon size={208} type="delete" />
        <Text>Delete</Text>
      </View>
      <View>
        <Icon size={208} type="camera" />
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
