import React from "react";

import { ColumnOne, ColumnThree, ColumnTwo } from "../types/types";
import ScrollAndCounter from "../components/ScrollAndCounter";
import { CREATE_MOVE, GET_MOVES } from "../graphql/move";
import { withMutation, withQuery } from "../HOC/HOC";
import { Move } from "../types/types";
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

export default withMutation(
  withQuery(MovesScreen, GET_MOVES, "Moves"),
  CREATE_MOVE,
  GET_MOVES,
  "Moves"
);
