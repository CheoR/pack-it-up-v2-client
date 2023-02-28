import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import LoggedInLayout from "../layout/LoggedInLayout";
// import { PossibleIcons } from "../constants/Icon";
import ColumnThree from "./ColumnThree";
import ColumnTwo from "./ColumnTwo";
import ListItem from "./ListItem";
import Counter from "./Counter";
import Column1 from "./Column1";
// import Row from "./Row";

// interface ScreenData<
//   Columns extends {},
//   Data extends [],
//   DropdownData extends [],
//   Rest extends {}
// > {
//   data: Data[];
//   dropdown: DropdownData[];
//   columns: Columns;
//   createObj: () => void;
//   rest: Rest;
//   screen: string;
//   type: PossibleIcons;
// }

// interface Box<T> {
//   [key: string]: T;
// }

// interface Item<T> {
//   [key: string]: T;
// }

// interface Move<T> {
//   [key: string]: T;
// }

// type DataObj = Move | Box | Item;

// export function isItem(obj: DataObj): obj is Item {
//   return obj.type === "item";
// }

// export function isBox(obj: DataObj): obj is Box {
//   return obj.type === "box";
// }

function isItem(type: string) {
  return type === "item";
}

function isBox(type: string) {
  return type === "box";
}

// interface Columns extends Object {
//   one: object;
//   two: object;
//   three: object;
// }

// export default function ScrollData<
//   Columns,
//   Data extends [],
//   DropdownData extends [],
//   Rest extends {}
// >({
// data,
// dropdown,
// columns,
// createObj,
// screen,
// rest,
// type,
// }: ScreenData<Columns, Data, DropdownData, Rest>) {

// interface Data {
//   data: object[];
//   dropdown: object[];
//   columns: {};
//   createObj: () => void;
//   screen: string;
//   rest: {};
//   type: string;
// }

// TODO: convert to TS
export default function ScrollData({
  data,
  dropdown,
  columns,
  createObj,
  screen,
  rest,
  type,
}) {
  return (
    <LoggedInLayout>
      <View style={styles.screen}>
        <View>
          <Text>{`${screen}: ${data.length}`}</Text>
        </View>
        <View style={styles.scrollViewCntr}>
          <ScrollView nestedScrollEnabled={true}>
            {data.map((obj) => {
              let defaultDropdownValueId = undefined;
              if (isItem(type)) defaultDropdownValueId = obj.box_id;
              if (isBox(type)) defaultDropdownValueId = obj.move_id;

              // console.log(`obj: ${obj._id}
              // name: ${obj?.name}
              // descriptioon: ${obj?.description}
              // `);
              return (
                // <>
                //   <Row
                //     obj={obj}
                //     badge1={{
                //       count: obj.count,
                //       type: type,
                //       showType: columns.one.showType,
                //     }}
                //   />
                <ListItem key={obj._id}>
                  <Column1
                    badge1={{
                      count: obj.count,
                      type: type,
                      showType: columns.one.showType,
                    }}
                  />
                  <ColumnTwo
                    defaultDropdownValue={defaultDropdownValueId}
                    description={obj.description}
                    disableDropdown={columns.two.disableDropdown}
                    dropdown={dropdown}
                    isFragile={obj.isFragile}
                    name={obj.name}
                    showDropdown={columns.two.showDropdown}
                    showValues={columns.two.showValues}
                    value={obj.value}
                  />
                  <ColumnThree
                    disableDropdown={columns.three.disableDropdown}
                    dropdown={dropdown}
                    iconType="chevron"
                    listView={type}
                    obj={obj}
                    objKey={obj._id}
                    showIcon={columns.three.showIcon}
                    type={type}
                  />
                </ListItem>
                // </>
              );
            })}
          </ScrollView>
        </View>
        <Counter mutation={createObj} rest={rest} type={type} />
      </View>
    </LoggedInLayout>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
    width: "100%",
  },
  scrollViewCntr: {
    flex: 1,
    width: "100%",
  },
});
