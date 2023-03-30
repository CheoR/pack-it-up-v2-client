import { Flex } from "react-native-flex-layout";
import Constants from "expo-constants";

import COLORS from "../constants/Colors";

export default function LoggedInLayout({ children }) {
  return (
    <Flex
      center
      fill
      justify="between"
      mt={Constants.statusBarHeight}
      ph={8}
      style={{ backgroundColor: COLORS.light.background }}
    >
      {children}
    </Flex>
  );
}
