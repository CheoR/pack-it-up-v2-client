import React from "react";

import { StyleSheet, Button, Text, View } from "react-native";
import ROUTES from "../constants/Routes";

export default function DisplayRouteScreen({ navigation, route }) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setCount((c) => c + 1)} title="CountUpdated" />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.register}>
      <Text>Display route Screen</Text>
      <Text>{route.params.name}</Text>
      <Text>Count: {count}</Text>

      <Button
        title="Go to Details... again"
        onPress={() => navigation.push(ROUTES.Register)}
      />
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate(ROUTES.Landing)}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  register: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "pink",
  },
});
