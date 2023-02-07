import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { gql, useMutation, useQuery } from "@apollo/client";

import LoggedInLayout from "../layout/LoggedInLayout";
import ColumnThree from "../components/ColumnThree";
import ColumnTwo from "../components/ColumnTwo";
import ColumnOne from "../components/ColumnOne";
import ListItem2 from "../components/ListItem2";
import ListItem from "../components/ListItem";
import Loading from "../components/Loading";
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

export const GET_PAGE_DATA = gql`
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
  query getBoxesDropdown {
    getBoxesByUserId {
      _id
      name
    }
  }
`;
export const GET_BOXES_DROPDOWN = gql`
  query getBoxesDropdown {
    getBoxesByUserId {
      _id
      name
    }
  }
`;

export const GET_ITEMS = gql`
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
  // TODO: reread polling vs refetch
  // https://www.apollographql.com/docs/react/data/queries/
  const {
    data: dropdownData,
    loading: dropdownLoading,
    error: dropDownError,
  } = useQuery(GET_BOXES_DROPDOWN, {
    onError: (error) => console.log(`Query Dropdown Error: ${error.message}`),
  });

  const { data, loading, error } = useQuery(GET_ITEMS, {
    onError: (error) => console.log(`Query Item Error: ${error.message}`),
  });

  const [createItem] = useMutation(CREATE_ITEM, {
    refetchQueries: [{ query: GET_ITEMS }, "GetHomeData"],
    onError: (error) => {
      console.log(`Create Item Error: ${error.message}`);
    },
  });

  if (loading || dropdownLoading) return <Loading text="Items" />;
  if (error) console.log(`Item Error: ${error.message}`);

  return (
    <LoggedInLayout>
      <View style={styles.screen}>
        <View>
          <Text>Items: {data.getItemsByUserId.length}</Text>
        </View>
        <View style={styles.scrollViewCntr}>
          <ScrollView nestedScrollEnabled={true}>
            {data.getItemsByUserId.map((item) => (
              // <ListItem
              //   key={item._id}
              //   count={0}
              //   description={item.description}
              //   isFragile={item.isFragile}
              //   name={item.name}
              //   objKey={item._id}
              //   showValues={true}
              //   type={"item"}
              //   value={item.value}
              //   dropdown={dropdownData}
              // />
              <ListItem2 key={item._id}>
                <ColumnOne count={0} type="item" />
                <ColumnTwo
                  description={item.description}
                  dropdown={dropdownData.getBoxesByUserId}
                  isFragile={item.isFragile}
                  name={item.name}
                  showValues={true}
                  value={item.value}
                />
                <ColumnThree
                  dropdown={dropdownData.getBoxesByUserId}
                  iconType="chevron"
                  listView="item"
                  objKey={item._id}
                  showIcon={true}
                />
              </ListItem2>
            ))}
          </ScrollView>
        </View>
        <Counter
          mutation={createItem}
          type="Item"
          rest={{
            // TODO: update to add a default box and/or
            // allow for unbounded items
            box_id: "63d58f28e9c4ff10994a0dca",
            description: "",
            name: "Item",
            value: 0,
            isFragile: false,
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
