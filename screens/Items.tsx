import React from "react";
import { useMutation, useQuery } from "@apollo/client";

import { ColumnOne, ColumnThree, ColumnTwo, Item } from "../types/types";
import ScrollAndCounter from "../components/ScrollAndCounter";

// import { GET_MOVES } from "../graphql/move";
import Loading from "../components/Loading";
// import { GET_BOXES } from "../graphql/box";
import Row from "../components/Row";
import {
  defaultItemCreate,
  defaultListViewIconOptions,
  defaultListViewIsEditable,
} from "../constants/Defaults";
import {
  CREATE_ITEM,
  GET_ITEMS,
  // REMOVE_ITEM,
  // UPDATE_ITEM,
} from "../graphql/item";

export default function ItemsScreen() {
  // TODO: reread polling vs refetch
  // https://www.apollographql.com/docs/react/data/queries/
  const { data, loading, error } = useQuery(GET_ITEMS, {
    onError: (error) => console.log(`Query Item Error: ${error.message}`),
  });

  const [createItem] = useMutation(CREATE_ITEM, {
    // TODO:
    // const [ createItem, { data, loading, error }]
    // review update funciton to avoid making extra query call
    // after mutation
    // update(cache, { data })
    refetchQueries: [{ query: GET_ITEMS }, "GetHomeData"],
    onError: (error) => {
      console.log(`Create Item Error: ${error.message}`);
    },
  });

  // const [removeItem] = useMutation(REMOVE_ITEM, {
  //   refetchQueries: [
  //     {
  //       query: GET_ITEMS,
  //     },
  //     {
  //       query: GET_BOXES,
  //     },
  //     {
  //       query: GET_MOVES,
  //     },
  //     "GetHomeData",
  //   ],
  //   onError: (error) => {
  //     console.log(`Create Item Error: ${error.message}`);
  //   },
  // });

  // const [updateItem] = useMutation(UPDATE_ITEM, {
  //   // TODO:
  //   // const [ createItem, { data, loading, error }]
  //   // review update funciton to avoid making extra query call
  //   // after mutation
  //   // update(cache, { data })
  //   refetchQueries: [{ query: GET_ITEMS }, "GetHomeData"],
  //   onError: (error) => {
  //     console.log(`Create Item Error: ${error.message}`);
  //   },
  // });
  if (loading) return <Loading text="Items" />;
  if (error) console.info(`Item Error: ${error.message}`);

  return (
    <ScrollAndCounter
      mutation={createItem}
      rest={defaultItemCreate}
      screen="Items"
      type="item"
    >
      {data.getItemsByUserId.map((item: Item) => {
        let column1: ColumnOne = {
          ...item,
          ...defaultListViewIconOptions,
        };

        let column2: ColumnTwo<Item> = {
          ...item,
          ...defaultListViewIsEditable,
        };

        let column3: ColumnThree<Item> = {
          ...item,
          showIcon: true,
        };

        return (
          <Row
            key={item._id}
            column1={column1}
            column2={column2}
            column3={column3}
          />
        );
      })}
    </ScrollAndCounter>
  );
}
