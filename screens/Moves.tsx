import React from "react";
import { useMutation, useQuery } from "@apollo/client";

import { Move } from "../types/types";
import ScrollAndCounter from "../components/ScrollAndCounter";
import { defaultMoveCreate } from "../constants/Defaults";
import { CREATE_MOVE, GET_MOVES } from "../graphql/move";
import Loading from "../components/Loading";
import Row2 from "../components/Row/Row2";

const column1 = {
  badge1: {
    // need as const else get this error
    // Type 'string' is not assignable to type 'PossibleIcons'.
    type: "box" as const,
    size: 24 as const,
  },
  badge2: {
    type: "item" as const,
    size: 24 as const,
  },
};

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
        return <Row2 key={move._id} column1={column1} />;
      })}
    </ScrollAndCounter>
  );
}
