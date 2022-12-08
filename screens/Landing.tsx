import { Button, ScrollView, StyleSheet, Text, View } from "react-native";

import SvgComponent from "../components/Rafiki";
import ROUTES from "../constants/Routes";
import Colors from "../constants/Colors";
import Layout from "../layout/Layout";

export default function LandingScreen({ navigation }) {
  return (
    <Layout>
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
    </Layout>
  );
}

const styles = StyleSheet.create({
  buttonGroup: {
    width: "100%",
    margin: 24,
    justifyContent: "space-between",
    height: 80,
  },
  header: {
    fontSize: 64,
    color: Colors.light.tint,
  },
  screen: {
    alignItems: "center",
  },
});
