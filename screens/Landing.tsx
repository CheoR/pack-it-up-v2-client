import { StyleSheet, Button, Text, View, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import ROUTES from "../constants/Routes";
import Colors from "../constants/Colors";

import SvgComponent from "../components/Rafiki";
import SocialsIcons from "../components/SocialsIcons";
import BoxLogo from "../components/BoxLogo";

export default function LandingScreen({ navigation, route }) {
  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 24,
        paddingHorizontal: 16,
        backgroundColor: Colors.light.background,
      }}
    >
      <BoxLogo />
      <Text style={styles.header}>track what you pack, app</Text>
      <Button
        title={ROUTES.Register}
        onPress={() => navigation.navigate(ROUTES.Register)}
      />
      <Button
        title={ROUTES.Login}
        onPress={() => navigation.navigate(ROUTES.Login)}
      />
      <SvgComponent />
      <View
        style={{
          width: "80%",
        }}
      >
        <Text>Organize your life.</Text>
      </View>
      <SocialsIcons />

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  landing: {
    flex: 1,
    backgroundColor: Colors.light.background,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 0,
  },
  header: {
    fontSize: 64,
    color: Colors.light.warning,
  },
});
