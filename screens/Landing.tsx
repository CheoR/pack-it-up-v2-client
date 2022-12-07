import { StyleSheet, Button, Text, View, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import ROUTES from "../constants/Routes";
import Colors from "../constants/Colors";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";

import SvgComponent from "../components/Rafiki";
export default function LandingScreen({ navigation, route }) {
  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 24,
        backgroundColor: Colors.light.background,
      }}
    >
      <MaterialCommunityIcons
        name="package-variant-closed"
        size={208}
        color={Colors.light.tint}
      />

      <Text style={styles.header}>track what you pack, app</Text>
      <Button
        title={ROUTES.Register}
        onPress={() => navigation.navigate(ROUTES.Register)}
      />
      <Button
        title={ROUTES.Login}
        onPress={() => navigation.navigate(ROUTES.Login)}
      />
      {/* <Button
        title="Go to Details"
        onPress={() => {
          1. Navigate to the Details route with params
          navigation.navigate(ROUTES.Register, {
            itemId: 86,
            someVariable: "i am variable",
          });
        }}
      />

      <Button
        title="Create post"
        onPress={() => navigation.navigate(ROUTES.CreatePost)}
      />
      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
      <Button
        title="I am display route"
        onPress={() => {
          navigation.navigate(ROUTES.DisplayRoute, {
            itemId: 86,
            someVariable: "i am variable",
          });
        }}
      /> */}
      <SvgComponent />
      <View>
        <Text>Organize your life.</Text>
      </View>
      <View
        style={{
          width: "50%",
          paddingVertical: 15,
          paddingHorizontal: 10,
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <FontAwesomeIcons
          name="facebook-square"
          size={24}
          color={Colors.light.tint}
        />
        <FontAwesomeIcons
          name="linkedin-square"
          size={24}
          color={Colors.light.tint}
        />
        <FontAwesomeIcons
          name="twitter-square"
          size={24}
          color={Colors.light.tint}
        />
        <FontAwesomeIcons
          name="instagram"
          size={24}
          color={Colors.light.tint}
        />
      </View>
      <View
        style={{
          paddingVertical: 15,
          paddingHorizontal: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <MaterialCommunityIcons
          name="copyright"
          size={16}
          color={Colors.light.tint}
        />
        <Text>2022</Text>
      </View>
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
