import React from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import Checkbox from "expo-checkbox";

import LoggedInLayout from "../layout/LoggedInLayout";
import ListItem from "../components/ListItem";
import COLORS from "../constants/Colors";
import DATA from "../data/home";

export default function HomeScreen({ route }) {
  const { email, token, username } = route.params;

  const [isChecked, setIsChecked] = React.useState(true);

  return (
    <LoggedInLayout>
      <View style={styles.screen}>
        <View style={styles.viewHeader}>
          <Text style={styles.viewHeaderText}>Summary</Text>
        </View>
        <View style={styles.listItems}>
          <FlatList
            data={DATA}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.flatList}
            renderItem={({ item }) => (
              <ListItem
                count={item.count}
                showValues={false}
                type={item.type}
              />
            )}
          />
        </View>
        <View style={styles.values}>
          <View style={styles.valueInput}>
            <Text>Total</Text>
            <TextInput editable={false}>$100</TextInput>
          </View>
          <View style={styles.checkboxContainer}>
            {/* TODO: swap out checkbox and remove from packages */}
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setIsChecked}
              disabled
              color={isChecked ? COLORS.light.tabIconSelected : undefined}
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
  flatList: {
    height: "100%",
    justifyContent: "space-evenly",
  },
  label: {
    margin: 8,
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
