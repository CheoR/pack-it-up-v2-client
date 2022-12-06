import { StyleSheet, Button, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import ROUTES from "../constants/Routes";

export default function LandingScreen({ navigation, route }) {
  return (
    <View style={styles.landing}>
      <Text>PackItUp</Text>
      <Button
        title={ROUTES.Register}
        onPress={() => navigation.navigate(ROUTES.Register)}
      />
      <Button
        title={ROUTES.Login}
        onPress={() => navigation.navigate(ROUTES.Login)}
      />
      <Button
        title="Go to Details"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
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
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  landing: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});
