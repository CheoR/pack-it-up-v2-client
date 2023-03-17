import React from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import Checkbox from "expo-checkbox";

import LoggedInLayout from "../layout/LoggedInLayout";
import COLORS from "../constants/Colors";
import { withQuery } from "../HOC/HOC";
import Row from "../components/Row";
import {
  ColumnOne,
  ColumnThree,
  ColumnTwo,
  Home,
  PossibleTypeObj,
} from "../types/types";
import {
  defaultListViewIconOptions,
  defaultListViewIsEditable,
} from "../constants/Defaults";

function HomeScreen({ data }) {
  const [isChecked, setIsChecked] = React.useState(false);

  const move = data.getHomeData.find(
    (obj: PossibleTypeObj) => obj._id === "move"
  );

  return (
    <LoggedInLayout>
      <View style={styles.screen}>
        <View style={styles.viewHeader}>
          <Text style={styles.viewHeaderText}>Summary</Text>
        </View>
        <View style={styles.listItems}>
          <FlatList
            data={data.getHomeData}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => {
              let column1: ColumnOne = {
                ...item,
                ...defaultListViewIconOptions,
              };
              let column2: ColumnTwo<Home> = {
                ...item,
                ...defaultListViewIsEditable,
              };
              let column3: ColumnThree<Home> = {
                ...item,
                iconType: "chevron",
                showIcon: true,
              };

              return (
                <Row
                  key={item._id}
                  column1={column1}
                  column2={column2}
                  column3={column3}
                />
              );
            }}
          />
        </View>
        <View style={styles.values}>
          <View style={styles.valueInput}>
            <Text>Total</Text>
            <TextInput editable={false}>${move.value.toFixed(2)}</TextInput>
          </View>
          <View style={styles.checkboxContainer}>
            {/* TODO: swap out checkbox and remove from packages */}
            <Checkbox
              style={styles.checkbox}
              value={move.isFragile}
              onValueChange={setIsChecked}
              disabled
              color={
                move.isFragile
                  ? COLORS.light.warning
                  : COLORS.light.tabIconSelected
              }
            />
            <Text style={styles.label}>Fragile</Text>
          </View>
        </View>
      </View>
    </LoggedInLayout>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    alignSelf: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  label: {
    margin: 8,
  },
  list: {
    height: "100%",
    justifyContent: "space-evenly",
  },
  listItems: {
    height: 600,
    width: "100%",
  },
  screen: {
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
    width: "100%",
  },
  values: { width: "100%" },
  viewHeader: {
    alignItems: "center",
    borderColor: COLORS.light.tabIconSelected,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    display: "flex",
    paddingVertical: 8,
    width: "80%",
  },
  viewHeaderText: {
    color: COLORS.light.text,
  },
  valueInput: {
    alignItems: "center",
    color: COLORS.light.text,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default withQuery(HomeScreen, "Home");
