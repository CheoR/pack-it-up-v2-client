import { Button, ScrollView, StyleSheet, Text, View } from "react-native";

import LoggedOutLayout from "../layout/LoggedOutLayout";
import SvgComponent from "../components/Rafiki";
import ROUTES from "../constants/Routes";
import Colors from "../constants/Colors";

export default function LandingScreen({ navigation }) {
  return (
    <LoggedOutLayout>
      <ScrollView contentContainerStyle={styles.screen}>
        <Text style={styles.header}>track what you pack, app</Text>
        <View style={styles.buttonGroup}>
          <Button
            title={ROUTES.Register}
            color={Colors.light.tabIconDefault}
            onPress={() => navigation.navigate(ROUTES.Register)}
          />
          <Button
            title={ROUTES.Login}
            color={Colors.light.tint}
            onPress={() => navigation.navigate(ROUTES.Login)}
          />
        </View>
        <SvgComponent />
        <View>
          <Text>Organize your life.</Text>
        </View>
      </ScrollView>
    </LoggedOutLayout>
  );
}

const styles = StyleSheet.create({
  buttonGroup: {
    height: 80,
    justifyContent: "space-between",
    margin: 24,
    width: "100%",
  },
  header: {
    color: Colors.light.tint,
    fontSize: 64,
  },
  screen: {
    alignItems: "center",
  },
});
