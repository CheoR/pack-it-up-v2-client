import React from "react";
import { View, Text } from "react-native";

import LoggedInLayout from "../layout/LoggedInLayout";

export default function ItemsScreen() {
  return (
    <LoggedInLayout>
      <View>
        <Text>ItemsScreen</Text>
      </View>
    </LoggedInLayout>
  );
}
