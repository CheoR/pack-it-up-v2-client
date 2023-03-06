import React from "react";
import { useMutation, useQuery } from "@apollo/client";

import { ColumnOne, ColumnThree, ColumnTwo } from "../types/types";
import ScrollAndCounter from "../components/ScrollAndCounter";
import { CREATE_MOVE, GET_MOVES } from "../graphql/move";
import Loading from "../components/Loading";
import { Move } from "../types/types";
import Row from "../components/Row";
import {
  defaultListViewIconOptions,
  defaultListViewIsEditable,
  defaultMoveCreate,
} from "../constants/Defaults";

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
    <ScrollAndCounter
      mutation={createMove}
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
