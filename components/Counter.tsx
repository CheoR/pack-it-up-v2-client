import React, { useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { Button, StyleSheet, Text, View } from "react-native";
import COLORS from "../constants/Colors";

{
  /* <MaterialCommunityIcons name="minus" size={24} color={COLORS.light.tint} />; */
}

export default function Counter({ type }) {
  const [count, setCount] = useState(0);
  return (
    <View style={styles.counter}>
      <View style={styles.counts}>
        <Button
          title="&#8331;"
          color={COLORS.light.tabIconDefault}
          onPress={() => {
            if (count <= 0) {
              setCount(0);
            } else {
              setCount((count) => count - 1);
            }
          }}
        />
        <Text>{count}</Text>
        <Button
          title="&#43;"
          color={COLORS.light.tabIconDefault}
          onPress={() => setCount((count) => count + 1)}
        />
      </View>
      <View>
        <Button
          title={`&#9744; Create ${type}`}
          color={COLORS.light.action}
          onPress={() => console.log(count)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  counter: {
    width: "100%",
  },
  counts: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
