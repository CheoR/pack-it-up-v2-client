import { View, Text } from "react-native";
import React from "react";
import LoggedInLayout from "../layout/LoggedInLayout";

export default function SettingsScreen() {
  return (
    <LoggedInLayout>
      <View>
        <Text>Settings</Text>
      </View>
    </LoggedInLayout>
  );
}
