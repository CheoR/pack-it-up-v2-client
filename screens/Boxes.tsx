import React from "react";
// import { ScrollView, StyleSheet, Text, View } from "react-native";
import { gql, useMutation, useQuery } from "@apollo/client";

// import LoggedInLayout from "../layout/LoggedInLayout";
// import ListItem from "../components/ListItem";
// import Counter from "../components/Counter";
import Loading from "../components/Loading";
import ScrollData from "../components/ScrollData";
// import ColumnOne from "../components/ColumnOne";
// import ColumnTwo from "../components/ColumnTwo";
// import ColumnThree from "../components/ColumnThree";

export interface BoxInput {
  input: {
    count: number;
    description: string;
    name: string;
    move_id: string;
  };
}

export const GET_MOVES_DROPDOWN = gql`
  query getMovesDropdown {
    getMovesByUserId {
      _id
      name
    }
  }
`;

export const GET_BOXES = gql`
  query GetBoxes {
    getBoxesByUserId {
      _id
      count
      description
      isFragile
      move_id
      name
      value
    }
  }
`;

const CREATE_BOX = gql`
  mutation CreateBox($input: CreateBoxInput!) {
    createBox(input: $input) {
      _id
      name
      move_id
      description
      user_id
    }
  }
`;

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
    // <LoggedInLayout>
    //   <View style={styles.screen}>
    //     <View>
    //       <Text>Boxes: {data.getBoxesByUserId.length}</Text>
    //     </View>
    //     <View style={styles.scrollViewCntr}>
    //       <ScrollView>
    //         {data.getBoxesByUserId.map((box) => (
    //           <ListItem key={box._id}>
    //             <ColumnOne
    //               badge1={{
    //                 count: box.count,
    //                 type: "item",
    //                 showType: true,
    //               }}
    //             />
    //             <ColumnTwo
    //               description={box.description}
    //               isFragile={box.isFragile}
    //               name={box.name}
    //               showValues={true}
    //               value={box.value}
    //             />
    //             <ColumnThree
    //               dropdown={[]}
    //               iconType="chevron"
    //               listView="item"
    //               obj={box}
    //               objKey={box._id}
    //               showIcon={true}
    //             />
    //           </ListItem>
    //         ))}
    //       </ScrollView>
    //     </View>
    //     <Counter
    //       mutation={createBox}
    //       type="Box"
    //       rest={{
    //         // TODO: update to add a default Box and/or
    //         // allow for unbounded Boxes
    //         move_id: "63d2f72669850c57c9184e3c",
    //         description: "",
    //         name: "Box",
    //       }}
    //     />
    //   </View>
    // </LoggedInLayout>
  );
}

// const styles = StyleSheet.create({
//   screen: {
//     alignItems: "center",
//     flex: 1,
//     justifyContent: "space-between",
//     width: "100%",
//   },
//   scrollViewCntr: {
//     flex: 1,
//     width: "100%",
//   },
// });
