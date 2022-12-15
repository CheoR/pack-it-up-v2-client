import React from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import Checkbox from "expo-checkbox";

import LoggedInLayout from "../layout/LoggedInLayout";
import ListItem from "../components/ListItem";
import Colors from "../constants/Colors";

const DATA = [
  { id: "moves", count: 3, type: "move" },
  { id: "boxes", count: 2, type: "box" },
  { id: "items", count: 1, type: "item" },
];

export default function HomeScreen({ route }) {
  const { email, token, username } = route.params;

  const [isChecked, setIsChecked] = React.useState(true);

  return (
    <LoggedInLayout>
      <View style={styles.screen}>
        <View style={styles.viewHeader}>
          <Text style={styles.viewHeaderText}>Summary</Text>
        </View>
        {/* <View style={styles.listItems}>
          <ListItem count={1} type="move" />
          <ListItem count={2} type="box" />
          <ListItem count={3} type="item" />
        </View> */}
        <View style={styles.listItems}>
          <FlatList
            data={DATA}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ListItem count={item.count} type={item.type} />
            )}
          />
        </View>
        <View>
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
              color={isChecked ? Colors.light.tabIconSelected : undefined}
            />
            <Text style={styles.label}>Fragile</Text>
          </View>
        </View>
      </View>
    </LoggedInLayout>
  );
}

const styles = StyleSheet.create({
  listItems: {
    height: 550,
    justifyContent: "space-evenly",
    width: "100%",
  },
  screen: {
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
    width: "100%",
  },
  viewHeader: {
    alignItems: "center",
    backgroundColor: Colors.light.tabIconDefault,
    display: "flex",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    paddingVertical: 8,
    width: "80%",
  },
  valueInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 300,
  },
  viewHeaderText: {
    color: Colors.light.text,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});
