import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import LoggedInLayout from "../layout/LoggedInLayout";
import Loading from "../components/Loading";
import ListItem from "../components/ListItem";
import Counter from "../components/Counter";
export interface IItemInput {
  input: {
    box_id: string; // Types.ObjectId;
    count: number;
    description: string;
    isFragile: boolean;
    name: string;
    // user_id: Types.ObjectId;
    value: number;
  };
}

const GET_ITEMS = gql`
  query GetItems {
    getItemsByUserId {
      _id
      name
      box_id
      description
      isFragile
      value
    }
  }
`;

const CREATE_ITEM = gql`
  mutation CreateItem($input: CreateItemInput!) {
    createItem(input: $input) {
      _id
      name
      box_id
      description
      isFragile
      user_id
    }
  }
`;

export default function ItemsScreen() {
  const { data, loading, error } = useQuery(GET_ITEMS, {
    onError: (error) => console.log(`Query Item Error: ${error.message}`),
  });

  const [createItem] = useMutation(CREATE_ITEM, {
    refetchQueries: [{ query: GET_ITEMS }, "GetItems"],
    onError: (error) => {
      console.log(`Create Item Error: ${error.message}`);
    },
  });

  if (loading) return <Loading text="Items" />;
  if (error) console.log(`Item Error: ${error.message}`);

  return (
    <LoggedInLayout>
      <View style={styles.screen}>
        <View>
          <Text>Items: {data.getItemsByUserId.length}</Text>
        </View>
        <View style={styles.scrollViewCntr}>
          <ScrollView>
            {data.getItemsByUserId.map((item) => (
              <ListItem
                key={item._id}
                count={0}
                showValues={false}
                type={"item"}
                name={item.name}
                description={item.description}
              />
            ))}
          </ScrollView>
        </View>
        <Counter
          mutation={createItem}
          type="Item"
          rest={{
            // TODO: update to add a default box and/or
            // allow for unbounded items
            box_id: "63d439187daf783fc6580e27",
            description: "",
            name: "Item",
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
