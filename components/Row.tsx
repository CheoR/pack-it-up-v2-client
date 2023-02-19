import React from "react";
import { StyleSheet, View } from "react-native";

import COLORS from "../constants/Colors";

// import { Badge as BadgeType } from "./Badge";
import ColumnThree from "./ColumnThree";
import ColumnTwo from "./ColumnTwo";
import ColumnOne from "./ColumnOne";
// import Badge from "./Badge";

// interface Badges {
//   badge1: BadgeType;
//   badge2?: BadgeType;
// }

export default function Row({ obj, rest, type }) {
  return (
    <View style={styles.row}>
      <ColumnOne badge1={{ type: type, showType: rest.showType }} />
      <ColumnTwo
        description={obj.description}
        isFragile={obj.isFragile}
        name={obj.name}
        value={obj.value}
        defaultDropdownValue={rest.defaultDropdownValue}
        disableDropdown={rest.disableDropdown}
        showDropdown={rest.showDropdown}
        showValues={rest.showValues}
      />
      <ColumnThree
        disableDropdown={false}
        iconType="chevron"
        listView={type}
        obj={obj}
        objKey={obj._id}
        showIcon={true}
        type={type}
        dropdown={rest.dropdown}
        rest={{
          defaultDropdownValue: rest.defaultDropdownValue,
          disableDropdown: true,
          showDropdown: true,
          showType: false,
          showValues: true,
          updateObj: rest.updateObj,
          showIcon: false,
        }}
      />
    </View>
  );
}
// export default function Row(obj: any, badges: Badges) {
//   console.log(`row`);
//   console.log(obj);
//   return (
//     <View key={obj._id} style={styles.row}>
//       <View style={styles.column1}>
//         <Badge
//           count={badges.badge1.count}
//           size={badges.badge1.size}
//           showType={badges.badge1.showType}
//           type={badges.badge1.type}
//         />
//         {badges.badge2 && (
//           <Badge
//             count={badges.badge2.count}
//             size={badges.badge2.size}
//             showType={badges.badge2.showType}
//             type={badges.badge2.type}
//           />
//         )}
//       </View>
//       <View style={styles.column2}>
//         <Text>Column2</Text>
//       </View>
//       <View style={styles.column3}>
//         <Text>Column3</Text>
//       </View>
//     </View>
//   );
// }

const styles = StyleSheet.create({
  column1: {
    width: 64,
  },
  column2: {
    flex: 2,
    justifyContent: "space-between",
  },
  column3: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    width: 40,
  },
  row: {
    borderRadius: 6,
    elevation: 2,
    flexDirection: "row",
    height: 160,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: COLORS.light.tabIconDefault,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
  },
});

{
  /* <ListItem key={obj._id}>
  <ColumnOne
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
</ListItem>; */
}

// Object {
//   "__typename": "Item",
//   "_id": "63e5583af3ba57523ef5367d",
//   "box_id": "63dc13e9a0701458e545ecbe",
//   "description": "",
//   "isFragile": false,
//   "name": "shirts",
//   "value": 199.99,
// },
