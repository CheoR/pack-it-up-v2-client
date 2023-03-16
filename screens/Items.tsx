import React from "react";

import { ColumnOne, ColumnThree, ColumnTwo, Item } from "../types/types";
import ScrollAndCounter from "../components/ScrollAndCounter";
import { CREATE_ITEM, GET_ITEMS } from "../graphql/item";
import { withMutation, withQuery } from "../HOC/HOC";
import Row from "../components/Row";
import {
  defaultItemCreate,
  defaultListViewIconOptions,
  defaultListViewIsEditable,
} from "../constants/Defaults";

function ItemsScreen({ createObj, data }) {
  return (
    <ScrollAndCounter
      mutation={createObj}
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

export default withMutation(
  withQuery(ItemsScreen, GET_ITEMS, "Items"),
  CREATE_ITEM,
  GET_ITEMS,
  "Items"
);
