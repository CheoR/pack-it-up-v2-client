import React from "react";
import { useMutation, useQuery } from "@apollo/client";

import ScrollAndCounter from "../components/ScrollAndCounter";
import { defaultBoxCreate } from "../constants/Defaults";
import { CREATE_BOX, GET_BOXES } from "../graphql/box";
import Loading from "../components/Loading";
import Row2 from "../components/Row/Row2";
import { Boxes, ColumnOne } from "../types/types";

const defaultColumnOne: ColumnOne = {
  badge1: {
    // need as const else get this error
    // Type 'string' is not assignable to type 'PossibleIcons'.
    type: "item" as const,
    size: 24 as const,
  },
};

export default function BoxesScreen() {
  const { data, loading, error } = useQuery(GET_BOXES, {
    onError: (error) => console.log(`Query Box Error: ${error.message}`),
  });

  const [createBox] = useMutation(CREATE_BOX, {
    refetchQueries: [{ query: GET_BOXES }, "GetHomeData"],
    onError: (error) => {
      console.log(`Create Box Error: ${error.message}`);
    },
  });

  if (loading) return <Loading text="Boxes" />;
  if (error) console.log(`Box Error: ${error.message}`);

  return (
    <ScrollAndCounter
      mutation={createBox}
      rest={defaultBoxCreate}
      screen="Boxes"
      type="box"
    >
      {data.getBoxesByUserId.map((box: Boxes) => {
        let column1: ColumnOne = {
          badge1: { ...defaultColumnOne.badge1, count: box.count },
        };
        return <Row2 key={box._id} column1={column1} />;
      })}
    </ScrollAndCounter>
  );
}
