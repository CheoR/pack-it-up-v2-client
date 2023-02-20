import React from "react";
import { useMutation, useQuery } from "@apollo/client";

import ScrollAndCounter from "../components/ScrollAndCounter";
import Loading from "../components/Loading";
import { GET_MOVES } from "../graphql/move";
import { GET_BOXES } from "../graphql/box";
import Row3 from "../components/Row/Row3";
import {
  CREATE_ITEM,
  GET_ITEMS,
  REMOVE_ITEM,
  UPDATE_ITEM,
} from "../graphql/item";
export interface ItemInput {
  input: {
    box_id: string;
    count: number;
    description: string;
    isFragile: boolean;
    name: string;
    value: number;
  };
}

const defaultItemCreate = {
  // TODO: update to add a default box and/or
  // allow for unbounded items
  box_id: "63d58f28e9c4ff10994a0dca",
  description: "",
  name: "Item",
  value: 0,
  isFragile: false,
};

export default function ItemsScreen() {
  // TODO: reread polling vs refetch
  // https://www.apollographql.com/docs/react/data/queries/
  // const {
  //   data: dropdownData,
  //   loading: dropdownLoading,
  //   error: dropDownError,
  // } = useQuery(GET_BOXES_DROPDOWN, {
  //   onError: (error) => console.log(`Query Dropdown Error: ${error.message}`),
  // });

  const { data, loading, error } = useQuery(GET_ITEMS, {
    // onCompleted: (data) => {
    //   console.log(`item data`);
    //   console.log(data);
    // },
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

  const [removeItem] = useMutation(REMOVE_ITEM, {
    refetchQueries: [
      {
        query: GET_ITEMS,
      },
      {
        query: GET_BOXES,
      },
      {
        query: GET_MOVES,
      },
      "GetHomeData",
    ],
    onError: (error) => {
      console.log(`Create Item Error: ${error.message}`);
    },
  });

  const [updateItem] = useMutation(UPDATE_ITEM, {
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

  // if (loading || dropdownLoading) return <Loading text="Items" />;
  if (loading) return <Loading text="Items" />;
  if (error) console.log(`Item Error: ${error.message}`);
  // console.log(dropdownData.getBoxesByUserId);
  console.log(data.getItemsByUserId);
  return (
    <ScrollAndCounter
      screen="Items"
      mutation={createItem}
      rest={defaultItemCreate}
      type="item"
    >
      {data.getItemsByUserId.map((item) => {
        let column1 = {
          badge1: {
            type: "item",
            size: 24,
          },
        };
        let column2 = {
          ...item,
          defaultDropdownValue: item.box_id,
          type: "item",
        };
        // console.log(`item `);
        // console.log(item);
        let column3 = {
          showIcon: true,
          iconType: "dots",
          obj: item,
          updateObj: updateItem,
          deleteObj: removeItem,
          columns: {
            ...column1,
            ...column2,
          },
        };
        return (
          <Row3
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
