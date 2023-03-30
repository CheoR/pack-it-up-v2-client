import Constants from "expo-constants";
import { View } from "react-native";
import tw from "twrnc";

export default function LoggedInLayout({ children }) {
  return (
    <View
      style={tw`items-center bg-slate-100 flex-1 justify-between mt-[${Constants.statusBarHeight}px] px-2`}
    >
      {children}
    </View>
  );
}
