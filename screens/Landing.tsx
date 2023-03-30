import { Button, ScrollView, Text, View } from "react-native";
import tw from "twrnc";

import LoggedOutLayout from "../layout/LoggedOutLayout";
import SvgComponent from "../components/Rafiki";
import ROUTES from "../constants/Routes";
import COLORS from "../constants/Colors";

export default function LandingScreen({ navigation }) {
  return (
    <LoggedOutLayout>
      <ScrollView contentContainerStyle={tw`items-center`}>
        <Text style={tw`text-slate-800 my-4 text-7x1`}>
          track what you pack, app
        </Text>
        <SvgComponent />
        <View style={tw`h-20 justify-between m-6 w-full`}>
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
        </View>
        <View>
          <Text>Organize your life.</Text>
        </View>
      </ScrollView>
    </LoggedOutLayout>
  );
}
