import React from "react";
// import { ScrollView, StyleSheet, Text, View } from "react-native";
import { gql, useMutation, useQuery } from "@apollo/client";

// import LoggedInLayout from "../layout/LoggedInLayout";
// import ColumnThree from "../components/ColumnThree";
// import ColumnTwo from "../components/ColumnTwo";
// import ColumnOne from "../components/ColumnOne";
// import ListItem from "../components/ListItem";
import Loading from "../components/Loading";
// import Counter from "../components/Counter";
// import ScrollData from "../components/ScrollData";
import ScrollAndCounter from "../components/ScrollAndCounter";
// import Row from "../components/Row";
import Row2 from "../components/Row/Row2";
import { GET_BOXES } from "./Boxes";
import { GET_MOVES } from "./Moves";
export interface ItemInput {
  input: {
    box_id: string;
    count: number;
    description: string;
    isFragile: boolean;
    name: string;
    value: number;
  };
}

// export const GET_PAGE_DATA = gql`
//   query GetItems {
//     getItemsByUserId {
//       _id
//       name
//       box_id
//       description
//       isFragile
//       value
//     }
//   }
//   query getBoxesDropdown {
//     getBoxesByUserId {
//       _id
//       name
//     }
//   }
// `;

// TODO: fetch subset of move data from cache
// export const GET_BOXES_DROPDOWN = gql`
//   query getBoxesDropdown {
//     getBoxesByUserId {
//       _id
//       name
//     }
//   }
// `;

const CREATE_ITEM = gql`
  mutation CreateItem($input: CreateItemInput!) {
    createItem(input: $input) {
      _id
      name
      box_id
      description
      isFragile
      user_id
    }
  }
`;
export const GET_ITEMS = gql`
  query GetItems {
    getItemsByUserId {
      _id
      name
      box_id
      description
      isFragile
      value
    }
  }
`;

const REMOVE_ITEM = gql`
  mutation RemoveItem($input: ItemIdInput!) {
    removeItem(input: $input) {
      ok
    }
  }
`;

const UPDATE_ITEM = gql`
  mutation ($input: ItemUpdateInput!) {
    updateItem(input: $input) {
      _id
      box_id
      description
      isFragile
      name
      value
    }
  }
`;

const defaultItemCreate = {
  // TODO: update to add a default box and/or
  // allow for unbounded items
  box_id: "63d58f28e9c4ff10994a0dca",
  description: "",
  name: "Item",
  value: 0,
  isFragile: false,
};

export default function ItemsScreen() {
  // TODO: reread polling vs refetch
  // https://www.apollographql.com/docs/react/data/queries/
  // const {
  //   data: dropdownData,
  //   loading: dropdownLoading,
  //   error: dropDownError,
  // } = useQuery(GET_BOXES_DROPDOWN, {
  //   onError: (error) => console.log(`Query Dropdown Error: ${error.message}`),
  // });

  const { data, loading, error } = useQuery(GET_ITEMS, {
    // onCompleted: (data) => {
    //   console.log(`item data`);
    //   console.log(data);
    // },
    onError: (error) => console.log(`Query Item Error: ${error.message}`),
  });

  const [createItem] = useMutation(CREATE_ITEM, {
    // TODO:
    // const [ createItem, { data, loading, error }]
    // review update funciton to avoid making extra query call
    // after mutation
    // update(cache, { data })
    refetchQueries: [{ query: GET_ITEMS }, "GetHomeData"],
    onError: (error) => {
      console.log(`Create Item Error: ${error.message}`);
    },
  });

  const [removeItem] = useMutation(REMOVE_ITEM, {
    refetchQueries: [
      {
        query: GET_ITEMS,
      },
      {
        query: GET_BOXES,
      },
      {
        query: GET_MOVES,
      },
      "GetHomeData",
    ],
    onError: (error) => {
      console.log(`Create Item Error: ${error.message}`);
    },
  });

  const [updateItem] = useMutation(UPDATE_ITEM, {
    // TODO:
    // const [ createItem, { data, loading, error }]
    // review update funciton to avoid making extra query call
    // after mutation
    // update(cache, { data })
    refetchQueries: [{ query: GET_ITEMS }, "GetHomeData"],
    onError: (error) => {
      console.log(`Create Item Error: ${error.message}`);
    },
  });

  // if (loading || dropdownLoading) return <Loading text="Items" />;
  if (loading) return <Loading text="Items" />;
  if (error) console.log(`Item Error: ${error.message}`);
  // console.log(dropdownData.getBoxesByUserId);
  // console.log(data.getItemsByUserId);
  return (
    <ScrollAndCounter
      screen="Items"
      mutation={createItem}
      rest={defaultItemCreate}
      type="item"
    >
      {data.getItemsByUserId.map((item) => {
        let column1 = {
          badge1: {
            type: "item",
            size: 24,
          },
        };
        let column2 = {
          ...item,
          defaultDropdownValue: item.box_id,
          type: "item",
        };
        let column3 = {
          obj: item,
          updateObj: updateItem,
          deleteObj: removeItem,
          // updateObj: (id) => console.log(`deleting ${id}`),
          columns: {
            ...column1,
            ...column2,
          },
        };
        return (
          //   <Row key={item._id} obj={item} rest={rest} type="item" />
          <Row2
            key={item._id}
            column1={column1}
            column2={column2}
            column3={column3}
          />
        );
      })}
    </ScrollAndCounter>
    // <ScrollData
    //   data={data.getItemsByUserId}
    //   dropdown={dropdownData.getBoxesByUserId}
    //   columns={{
    //     one: {
    //       showType: false,
    //     },
    //     two: {
    //       disableDropdown: true,
    //       showDropdown: true,
    //       showValues: true,
    //     },
    //     three: {
    //       disableDropdown: false,
    //       showIcon: true,
    //     },
    //   }}
    //   createObj={createItem}
    // rest={{
    //   // TODO: update to add a default box and/or
    //   // allow for unbounded items
    //   box_id: "63d58f28e9c4ff10994a0dca",
    //   description: "",
    //   name: "Item",
    //   value: 0,
    //   isFragile: false,
    // }}
    //   screen="Items"
    //   type="item"
    // />
    // ></ScrollData>
    // <LoggedInLayout>
    //   <View style={styles.screen}>
    //     <View>
    //       <Text>Items: {data.getItemsByUserId.length}</Text>
    //     </View>
    //     <View style={styles.scrollViewCntr}>
    //       <ScrollView nestedScrollEnabled={true}>
    //         {data.getItemsByUserId.map((item) => (
    //           <ListItem key={item._id}>
    //             <ColumnOne
    //               badge1={{ count: item.count, type: "item", showType: false }}
    //             />
    // <ColumnTwo
    //   defaultDropdownValue={item.box_id}
    //   description={item.description}
    //   disableDropdown={true}
    //   dropdown={dropdownData.getBoxesByUserId}
    //   isFragile={item.isFragile}
    //   name={item.name}
    //   showDropdown={true}
    //   showValues={true}
    //   value={item.value}
    // />
    // <ColumnThree
    //   disableDropdown={false}
    //   dropdown={dropdownData.getBoxesByUserId}
    //   iconType="chevron"
    //   listView="item"
    //   obj={item}
    //   objKey={item._id}
    //   showIcon={true}
    // />
    //           </ListItem>
    //         ))}
    //       </ScrollView>
    //     </View>
    //     <Counter
    //       mutation={createItem}
    //       type="Item"
    //       rest={{
    // // TODO: update to add a default box and/or
    // // allow for unbounded items
    // box_id: "63d58f28e9c4ff10994a0dca",
    // description: "",
    // name: "Item",
    // value: 0,
    // isFragile: false,
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
