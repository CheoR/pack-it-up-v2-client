import React from "react";

import { ColumnOne, ColumnThree, ColumnTwo, Move } from "../types/types";
import ScrollAndCounter from "../components/ScrollAndCounter";
import { withMutation, withQuery } from "../HOC/HOC";
import Row from "../components/Row";
import {
  defaultListViewIconOptions,
  defaultListViewIsEditable,
  defaultMoveCreate,
} from "../constants/Defaults";

function MovesScreen({ createObj, data }) {
  return (
    <ScrollAndCounter
      mutation={createObj}
      rest={defaultMoveCreate}
      screen="Moves"
      type="move"
    >
      {data.getMovesByUserId.map((move: Move) => {
        let column1: ColumnOne = {
          ...move,
          ...defaultListViewIconOptions,
        };
        let column2: ColumnTwo<Move> = {
          ...move,
          ...defaultListViewIsEditable,
        };

        let column3: ColumnThree<Move> = {
          ...move,
          showIcon: true,
        };

        return (
          <Row
            key={move._id}
            column1={column1}
            column2={column2}
            column3={column3}
          />
        );
      })}
    </ScrollAndCounter>
  );
}

export default withMutation(withQuery(MovesScreen, "Moves"), "Moves");
