import React from "react";
import { StyleSheet, Text, View } from "react-native";

import COLORS from "../constants/Colors";
import { Icon } from "../constants/Icon";

interface Loading {
  text: string;
}

export default function Loading({ text }: Loading) {
  return (
    <View style={styles.loading}>
      <Icon type="closedPackage" size={208} />
      <View style={styles.header}>
        <Text style={styles.text}>Loading . . {text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    alignItems: "center",
    width: "80%",
    paddingVertical: 8,
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: COLORS.light.text,
  },
});
