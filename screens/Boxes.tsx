import React from "react";
import { useMutation, useQuery } from "@apollo/client";

import { Boxes, ColumnOne, ColumnThree, ColumnTwo } from "../types/types";
import ScrollAndCounter from "../components/ScrollAndCounter";
import { CREATE_BOX, GET_BOXES } from "../graphql/box";
import Loading from "../components/Loading";
import Row from "../components/Row";
import {
  defaultBoxCreate,
  defaultListViewIconOptions,
  defaultListViewIsEditable,
} from "../constants/Defaults";

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
          obj: { ...box, ...defaultListViewIconOptions },
        };

        let column2: ColumnTwo = {
          ...box,
          ...isEditable,
        };

        return <Row key={box._id} column1={column1} column2={column2} />;
      })}
    </ScrollAndCounter>
  );
}
