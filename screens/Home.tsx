import React from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { gql, useQuery } from "@apollo/client";
import Checkbox from "expo-checkbox";

import { ColumnOne, isEditabe, PossibleTypeObj } from "../types/types";
import LoggedInLayout from "../layout/LoggedInLayout";
import Loading from "../components/Loading";
import COLORS from "../constants/Colors";
import Row from "../components/Row";
import {
  defaultListViewIconOptions,
  defaultListViewIsEditable,
} from "../constants/Defaults";

const GET_HOME_DATA = gql`
  query GetHomeData {
    getHomeData {
      _id
      count
      description
      isFragile
      name
      value
    }
  }
`;

const badges: ColumnOne = {
  badge1: {
    // need as const else get this error
    // Type 'string' is not assignable to type 'PossibleIcons'.
    size: 24 as const,
    showCount: false,
    showType: false,
    type: "item" as const,
  },
};

const isEditable: isEditabe = {
  canEdit: false,
  disableDropdown: true,
  showDropdown: false,
  showValues: false,
};

export default function HomeScreen() {
  const [isChecked, setIsChecked] = React.useState(false);

  const { data, loading, error } = useQuery(GET_HOME_DATA, {
    onError: (error) => console.log(`Query Home Data Error: ${error.message}`),
  });

  if (loading) return <Loading text="Data" />;
  if (error) console.log(`Home Error: ${error.message}`);

  console.log(data.getHomeData);
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
              let column1 = {
                obj: { ...item, ...defaultListViewIconOptions },
              };
              let column2 = {
                ...item,
                ...isEditable,
              };
              let column3 = {
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
