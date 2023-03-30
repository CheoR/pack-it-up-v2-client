import { Flex } from "react-native-flex-layout";
import Constants from "expo-constants";

import SocialsIcons from "../components/SocialsIcons";
import COLORS from "../constants/Colors";
import { Icon } from "../constants/Icon";

export default function LoggedOutLayout({ children }) {
  return (
    <Flex
      center
      fill
      justify="between"
      mt={Constants.statusBarHeight}
      ph={8}
      style={{ backgroundColor: COLORS.light.background }}
    >
      <Icon type="closedPackage" size={208} />
      {children}
      <SocialsIcons />
    </Flex>
  );
}
