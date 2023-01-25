import React, { useState } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { gql, useMutation, useQuery } from "@apollo/client";

import LoggedInLayout from "../layout/LoggedInLayout";
import ListItem from "../components/ListItem";
import Counter from "../components/Counter";
import Loading from "../components/Loading";

const GET_MOVES = gql`
  query GetMoves {
    getMovesByUserId {
      _id
      name
      description
    }
  }
`;
// const CREATE_MOVE = gql`
//   mutation CreateMove($input: CreateMoveInput!) {
//     createMove(input: $input) {
//       _id
//     }
//   }
// `;

// const createMove = (count: number) => {
//   const [createMove, { data, loading, error }] = useMutation(CREATE_MOVE, {
//     variables: {
//       input: count,
//     },
//     onCompleted: (data) => {
//       // refresh data
//       console.log(`created ${count} moves`);
//     },
//     onError: (error) => {
//       console.log(error.message);
//     },
//   });
// };

const createMove = () => console.log("oink");

export default function MovesScreen() {
  const { data, loading, error } = useQuery(GET_MOVES, {
    onCompleted: (data) => {
      // refresh data
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
  if (loading) return <Loading text="Moves" />;
  if (error) console.log("COULD NOT FETCH MOVES");
  return (
    <LoggedInLayout>
      <View style={styles.screen}>
        <Text>MovesScreen</Text>
        <View style={styles.scrollViewCntr}>
          <ScrollView contentContainerStyle={styles.list}>
            {data.getMovesByUserId.map((item) => (
              <View key={item._id} style={styles.listItemCntr}>
                {/* <ListItem count={1} showValues={false} type={"move"} />) */}
                <Text>Name</Text>
                <Text>{item.name}</Text>
                <Text>Description</Text>
                <Text>{item.description}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        <Counter action={createMove} type="Move" />
      </View>
    </LoggedInLayout>
  );
}

const styles = StyleSheet.create({
  list: {},
  listItemCntr: {
    marginBottom: 16,
  },
  screen: {
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
    width: "100%",
  },
  scrollViewCntr: {
    flex: 1,
    width: "100%",
  },
});
