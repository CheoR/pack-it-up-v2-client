import { StyleSheet, Button, Text, View, ScrollView } from "react-native";

import SocialsIcons from "../components/SocialsIcons";
import SvgComponent from "../components/Rafiki";
import BoxLogo from "../components/BoxLogo";
import ROUTES from "../constants/Routes";
import Colors from "../constants/Colors";

export default function LandingScreen({ navigation, route }) {
  return (
    <ScrollView contentContainerStyle={styles.contentContainerStyle}>
      <BoxLogo />
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
      <View style={styles.tagline}>
        <Text>Organize your life.</Text>
      </View>
      <SocialsIcons />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: Colors.light.background,
  },
  buttonGroup: {
    flex: 1,
    width: "100%",
    margin: 24,
    justifyContent: "space-between",
    height: 80,
  },

  header: {
    fontSize: 64,
    color: Colors.light.tint,
  },
  tagline: {
    width: "80%",
    display: "flex",
    alignItems: "center",
  },
  landing: {
    flex: 1,
    backgroundColor: Colors.light.background,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 0,
  },
});
