import React from "react";
import { Button, Text, View } from "react-native";

import LoggedInLayout from "../layout/LoggedInLayout";
import { clearTokens } from "../auth/tokens";

export default function SettingsScreen() {
  return (
    <LoggedInLayout>
      <View>
        <Text>Settings</Text>
        <Button title="Logout" onPress={clearTokens} />
      </View>
    </LoggedInLayout>
  );
}
