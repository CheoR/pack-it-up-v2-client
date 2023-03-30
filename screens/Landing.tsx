import { Box, Button, Text } from "@react-native-material/core";
import { Flex } from "react-native-flex-layout";
import { ScrollView } from "react-native";

import LoggedOutLayout from "../layout/LoggedOutLayout";
import SvgComponent from "../components/Rafiki";
import ROUTES from "../constants/Routes";
import COLORS from "../constants/Colors";

export default function LandingScreen({ navigation }) {
  return (
    <LoggedOutLayout>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <Text variant="h4" style={{ color: COLORS.light.tint }}>
          track what you pack, app
        </Text>
        <SvgComponent />
        <Flex justify="between" h={80} m={24} w="100%">
          <Button
            title={ROUTES.Register}
            color={COLORS.light.tabIconDefault}
            onPress={() => navigation.navigate(ROUTES.Register)}
          />
          <Button
            title={ROUTES.Login}
            color={COLORS.light.tint}
            onPress={() => navigation.navigate(ROUTES.Login)}
          />
        </Flex>
        <Box>
          <Text>Organize your life.</Text>
        </Box>
      </ScrollView>
    </LoggedOutLayout>
  );
}
