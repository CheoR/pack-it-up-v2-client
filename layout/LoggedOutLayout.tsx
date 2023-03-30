import Constants from "expo-constants";
import { View } from "react-native";
import tw from "twrnc";

import SocialsIcons from "../components/SocialsIcons";
import { Icon } from "../constants/Icon";

export default function LoggedOutLayout({ children }) {
  return (
    <View
      style={tw`items-center bg-slate-100 flex-1 justify-between mt-[${Constants.statusBarHeight}px] px-2`}
    >
      <Icon type="closedPackage" size={208} />
      {children}
      <SocialsIcons />
    </View>
  );
}
