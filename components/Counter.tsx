import React, { useState } from "react";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Button, StyleSheet, Text, View } from "react-native";

import COLORS from "../constants/Colors";

{
  /* <MaterialCommunityIcons name="minus" size={24} color={COLORS.light.tint} />; */
}

import { gql, useMutation } from "@apollo/client";

const CREATE_MOVE = gql`
  mutation CreateMove($input: CreateMoveInput!) {
    createMove(input: $input) {
      _id
    }
  }
`;

const createMove = (count: number) => {
  const [createMove, { data, loading, error }] = useMutation(CREATE_MOVE, {
    variables: {
      input: count,
    },
    onCompleted: (data) => {
      // refresh data
      console.log(`created ${count} moves`);
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
};

export default function Counter({ action, type }) {
  const [count, setCount] = useState(0);
  return (
    <View style={styles.counter}>
      <View style={styles.incrementDecrement}>
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
          onPress={() => action(count)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  counter: {
    marginTop: 16,
    width: "100%",
  },
  incrementDecrement: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
