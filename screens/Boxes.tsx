import React from "react";
import { useMutation, useQuery } from "@apollo/client";

import { CREATE_BOX, GET_BOXES } from "../graphql/box";
import { GET_MOVES_DROPDOWN } from "../graphql/move";
import ScrollData from "../components/ScrollData";
import Loading from "../components/Loading";

export interface BoxInput {
  input: {
    count: number;
    description: string;
    name: string;
    move_id: string;
  };
}

export default function BoxesScreen() {
  const {
    data: dropdownData,
    loading: dropdownLoading,
    error: dropDownError,
  } = useQuery(GET_MOVES_DROPDOWN, {
    // onCompleted: (data) => {
    //   console.log(`movees data`);
    //   console.log(data);
    // },
    onError: (error) => console.log(`Query Dropdown Error: ${error.message}`),
  });

  const { data, loading, error } = useQuery(GET_BOXES, {
    onError: (error) => console.log(`Query Box Error: ${error.message}`),
  });

  const [createBox] = useMutation(CREATE_BOX, {
    refetchQueries: [{ query: GET_BOXES }, "GetHomeData"],
    onError: (error) => {
      console.log(`Create Box Error: ${error.message}`);
    },
  });

  if (loading || dropdownLoading) return <Loading text="Boxes" />;
  if (error) console.log(`Box Error: ${error.message}`);

  return (
    <ScrollData
      data={data.getBoxesByUserId}
      dropdown={dropdownData.getMovesByUserId}
      columns={{
        one: {
          showType: true,
        },
        two: {
          disableDropdown: true,
          showDropdown: true,
          showValues: true,
        },
        three: {
          disableDropdown: false,
          showIcon: true,
        },
      }}
      createObj={createBox}
      rest={{
        // TODO: update to add a default box and/or
        // allow for unbounded items
        move_id: "63d2f72669850c57c9184e3c",
        description: "",
        name: "Box",
      }}
      screen="Items"
      type="box"
    />
  );
}
