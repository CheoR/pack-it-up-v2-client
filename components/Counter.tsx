import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import { Counter as CI } from "../types/types";
import COLORS from "../constants/Colors";

export default function Counter({ mutation, type, rest }: CI) {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.counter}>
      <View style={styles.incrementDecrement}>
        <Button
          title="&#8331;"
          color={COLORS.light.tabIconDefault}
          onPress={() => {
            if (count <= 0) setCount(0);
            else setCount((count) => count - 1);
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
          disabled={!count}
          title={`Create ${type}`}
          color={COLORS.light.action}
          onPress={() => {
            mutation({
              variables: {
                input: {
                  count,
                  ...rest,
                },
              },
            });
            setCount(0);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  counter: {
    borderTopColor: COLORS.light.text,
    borderTopWidth: 4,
    marginTop: 16,
    width: "100%",
  },
  incrementDecrement: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
