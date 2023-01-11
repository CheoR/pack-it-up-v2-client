import React, { useState } from "react";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Button, StyleSheet, Text, View } from "react-native";

import COLORS from "../constants/Colors";

{
  /* <MaterialCommunityIcons name="minus" size={24} color={COLORS.light.tint} />; */
}

import { gql, useMutation } from "@apollo/client";

export interface IMove {
  input: {
    count: number;
    name: string;
    description: string;
    user_id: string;
  }
}
// CreateMoveInput!) {
// IMove) {
const CREATE_MOVE = gql`
  mutation CreateMove($input: CreateMoveInput!) {
    createMove(input: $input) {
      _id
      name
      description
      user_id
    }
  }
`;

export default function Counter({ action, type }) {
  const [count, setCount] = useState(0);
  const [createMove, { data, loading, error }] = useMutation(CREATE_MOVE, {
    variables: {
      input: {
        count,
        name: "i am moo cow2",
        description: "i am oink2",
        user_id: "iamtokeniamtokeniamtokeniamtokeniamtoken",
      },
    },
    onCompleted: (data) => {
      // refresh data
      console.log(`created ${count} ${type.toLowerCase()}`);
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  if (loading) return <Text>"Submitting..."</Text>;
  if (error) return <Text>`Submission error! ${error.message}`</Text>;

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
          disabled={!count}
          title={`&#9744; Create ${type}`}
          color={COLORS.light.action}
          onPress={() =>
            createMove({
              variables: {
                input:
                  count,
                  name: `name: ${Math.floor(Math.random() * 1000)}`,
                  description: "oink i am description",
                  user_id:
                    "oink_userId1234userId1234userId1234userId1234userId1234",
                },
              },
            })
          } // action(count)}
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
