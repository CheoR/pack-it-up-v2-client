import React from "react";
import { View, StyleSheet } from "react-native";

import Icon from "./Icon";

export default function ColumnOne({ count, type }) {
  return (
    <View style={styles.column}>
      <Icon count={count} type={type} showType={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    width: 64,
  },
});
