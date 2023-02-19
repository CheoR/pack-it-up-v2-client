import React from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { gql, useQuery } from "@apollo/client";
import Checkbox from "expo-checkbox";

import LoggedInLayout from "../layout/LoggedInLayout";
import ColumnThree from "../components/ColumnThree";
import ColumnTwo from "../components/ColumnTwo";
import ColumnOne from "../components/ColumnOne";
import ListItem from "../components/ListItem";
import Loading from "../components/Loading";
import COLORS from "../constants/Colors";

const GET_HOME_DATA = gql`
  query GetHomeData {
    getHomeData {
      data {
        _id
        count
        isFragile
        value
      }
    }
  }
`;
export default function HomeScreen() {
  const [isChecked, setIsChecked] = React.useState(false);

  const { data, loading, error } = useQuery(GET_HOME_DATA, {
    onError: (error) => console.log(`Query Home Data Error: ${error.message}`),
  });

  if (loading) return <Loading text="Data" />;
  if (error) console.log(`Home Error: ${error.message}`);

  const { data: DATA } = data.getHomeData;
  const items = DATA.find((obj) => obj._id === "item");

  return (
    <LoggedInLayout>
      <View style={styles.screen}>
        <View style={styles.viewHeader}>
          <Text style={styles.viewHeaderText}>Summary</Text>
        </View>
        <View style={styles.listItems}>
          <FlatList
            data={DATA}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <ListItem key={item._id}>
                <ColumnOne
                  badge1={{
                    count: item.count,
                    type: item._id,
                    showType: false,
                  }}
                />
                <ColumnTwo name={item._id} />
                <ColumnThree
                  iconType="chevron"
                  listView={item._id}
                  showIcon={true}
                  objKey={{ test: "test" }}
                  dropdown={[]}
                />
              </ListItem>
            )}
          />
        </View>
        <View style={styles.values}>
          <View style={styles.valueInput}>
            <Text>Total</Text>
            <TextInput editable={false}>${items.value.toFixed(2)}</TextInput>
          </View>
          <View style={styles.checkboxContainer}>
            {/* TODO: swap out checkbox and remove from packages */}
            <Checkbox
              style={styles.checkbox}
              value={items.isFragile}
              onValueChange={setIsChecked}
              disabled
              color={
                items.isFragile
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
