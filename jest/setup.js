import "react-native-gesture-handler/jestSetup";
// import "@testing-library/jest-dom/extend-expect";
// import "@testing-library/jest-dom";
// TODO: look up why error on import in either this file or
// setupFilesAfterEnv.js or
// package.json setupFilesAfterEnv
// for now just import in test file

// include this line for mocking react-native-gesture-handler
// https://reactnavigation.org/docs/testing/
// https://react-native-async-storage.github.io/async-storage/docs/advanced/jest/
// https: jest.mock("@react-navigation/native-stack");

// include this section and the NativeAnimatedHelper section for mocking react-native-reanimated
// jest.mock("react-native-reanimated", () => {
//   const Reanimated = require("react-native-reanimated/mock");

//   // The mock for `call` immediately calls the callback which is incorrect
//   // So we override it with a no-op
//   Reanimated.default.call = () => {};

//   return Reanimated;
// });

// // Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
// jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
