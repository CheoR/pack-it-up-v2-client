import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import LoggedInLayout from "../layout/LoggedInLayout";
import Counter from "./Counter";

export default function ScrollAndCounter({
  children,
  mutation,
  rest,
  screen,
  type,
}) {
  return (
    <LoggedInLayout>
      <View style={styles.screen}>
        <View>
          <Text>{`${screen}: ${React.Children.count(children)}`}</Text>
        </View>
        <View style={styles.scrollViewCntr}>
          <ScrollView nestedScrollEnabled={true}>{children}</ScrollView>
        </View>
        <Counter mutation={mutation} rest={rest} type={type} />
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
