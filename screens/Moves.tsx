import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { gql, useMutation, useQuery } from "@apollo/client";

import LoggedInLayout from "../layout/LoggedInLayout";
import ColumnThree from "../components/ColumnThree";
import ColumnTwo from "../components/ColumnTwo";
import ColumnOne from "../components/ColumnOne";
import ListItem from "../components/ListItem";
import Counter from "../components/Counter";
import Loading from "../components/Loading";

export interface Move {
  input: {
    count: number;
    name: string;
    description: string;
  };
}

export const GET_MOVES = gql`
  query GetMoves {
    getMovesByUserId {
      _id
      name
      count
      user_id
      total
      isFragile
    }
  }
`;

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

export default function MovesScreen() {
  const { data, loading, error } = useQuery(GET_MOVES, {
    onError: (error) => console.log(`Query Move Error: ${error.message}`),
  });

  const [createMove] = useMutation(CREATE_MOVE, {
    // query: DocumentNode object parsed with gql
    // string: Query name
    refetchQueries: [{ query: GET_MOVES }, "GetHomeData"],
    onError: (error) => {
      console.log(`Create Move Error: ${error.message}`);
    },
  });

  if (loading) return <Loading text="Moves" />;
  if (error) console.log(`Move Error: ${error.message}`);

  return (
    <LoggedInLayout>
      <View style={styles.screen}>
        <View>
          <Text>Moves: {data.getMovesByUserId.length}</Text>
        </View>
        <View style={styles.scrollViewCntr}>
          <ScrollView>
            {data.getMovesByUserId.map((move) => (
              <ListItem key={move._id}>
                <ColumnOne
                  badge1={{
                    count: move.count,
                    type: "box",
                    showType: true,
                  }}
                />
                <ColumnTwo
                  description={move.descripion}
                  isFragile={move.isFragile}
                  name={move.name}
                  showValues={true}
                  value={move.total}
                />
                <ColumnThree
                  dropdown={[]}
                  iconType="chevron"
                  listView=""
                  obj={move}
                  objKey={move._id}
                  showIcon={true}
                />
              </ListItem>
            ))}
          </ScrollView>
        </View>
        <Counter
          mutation={createMove}
          type="Move"
          rest={{
            name: "Move",
            description: "",
          }}
        />
      </View>
    </LoggedInLayout>
  );
}

const styles = StyleSheet.create({
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
