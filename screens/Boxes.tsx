import React from "react";

import { Box, ColumnOne, ColumnThree, ColumnTwo } from "../types/types";
import ScrollAndCounter from "../components/ScrollAndCounter";
import { CREATE_BOX, GET_BOXES } from "../graphql/box";
import { withMutation, withQuery } from "../HOC/HOC";
import Row from "../components/Row";
import {
  defaultBoxCreate,
  defaultListViewIconOptions,
  defaultListViewIsEditable,
} from "../constants/Defaults";

function BoxesScreen({ createObj, data }) {
  return (
    <ScrollAndCounter
      mutation={createObj}
      rest={defaultBoxCreate}
      screen="Boxes"
      type="box"
    >
      {data.getBoxesByUserId.map((box: Box) => {
        let column1: ColumnOne = {
          ...box,
          ...defaultListViewIconOptions,
        };

        let column2: ColumnTwo<Box> = {
          ...box,
          ...defaultListViewIsEditable,
        };
        let column3: ColumnThree<Box> = {
          ...box,
          showIcon: true,
        };

        return (
          <Row
            key={box._id}
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
  withQuery(BoxesScreen, GET_BOXES, "Boxes"),
  CREATE_BOX,
  GET_BOXES,
  "Boxes"
);
