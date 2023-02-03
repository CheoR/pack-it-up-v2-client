import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { gql, useMutation, useQuery } from "@apollo/client";

import LoggedInLayout from "../layout/LoggedInLayout";
import ListItem from "../components/ListItem";
import Counter from "../components/Counter";
import Loading from "../components/Loading";

export interface IBoxInput {
  input: {
    count: number;
    description: string;
    name: string;
    move_id: string; // Types.ObjectId;
  };
}

export const GET_BOXES = gql`
  query GetBoxes {
    getBoxesByUserId {
      _id
      count
      description
      isFragile
      move_id
      name
      total
    }
  }
`;

const CREATE_BOX = gql`
  mutation CreateBox($input: CreateBoxInput!) {
    createBox(input: $input) {
      _id
      name
      move_id
      description
      user_id
    }
  }
`;

export default function BoxesScreen() {
  const { data, loading, error } = useQuery(GET_BOXES, {
    onError: (error) => console.log(`Query Box Error: ${error.message}`),
  });

  const [createBox] = useMutation(CREATE_BOX, {
    refetchQueries: [{ query: GET_BOXES }, "GetHomeData"],
    onError: (error) => {
      console.log(`Create Box Error: ${error.message}`);
    },
  });

  if (loading) return <Loading text="Boxes" />;
  if (error) console.log(`Box Error: ${error.message}`);

  return (
    <LoggedInLayout>
      <View style={styles.screen}>
        <View>
          <Text>Boxes: {data.getBoxesByUserId.length}</Text>
        </View>
        <View style={styles.scrollViewCntr}>
          <ScrollView>
            {data.getBoxesByUserId.map((box) => (
              <ListItem
                key={box._id}
                count={box.count}
                description={box.description}
                isFragile={box.isFragile}
                name={box.name}
                objKey={box._id}
                showValues={true}
                type={"item"}
                value={box.total}
              />
            ))}
          </ScrollView>
        </View>
        <Counter
          mutation={createBox}
          type="Box"
          rest={{
            // TODO: update to add a default Box and/or
            // allow for unbounded Boxes
            move_id: "63d2f72669850c57c9184e3c",
            description: "",
            name: "Box",
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
