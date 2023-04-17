import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MockedProvider } from "@apollo/client/testing";
import { act } from "react-test-renderer";
// import "@testing-library/jest-dom";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import RootNavigator from "../../navigation/RootNavigator";
import { GET_HOME_DATA } from "../../graphql/home";
import { LOGIN_USER } from "../Login";
import { GET_MOVES_DROPDOWN } from "../../graphql/move";

const EMAIL = "peggy@pug.com";
const PASSWORD = "peggypug";
const USER = {
  email: EMAIL,
  pasword: PASSWORD,
};
const validLoginResp = {
  data: {
    loginUser: {
      accessToken: "accessTokenResp",
      refreshToken: "refreshTokenResp",
      user_id: "userId",
    },
  },
};

const mockHomeData = {
  data: {
    getHomeData: [
      {
        _id: "move",
        count: 0,
        description: "mock description",
        isFragile: false,
        name: "mock stuff",
        value: 0,
      },
    ],
    // getHomeData: {
    // _id: "mockId",
    // count: 0,
    // description: "mock description",
    // isFragile: false,
    // name: "mock stuff",
    // value: 0.0,
    // },
    // getHomeData: {
    //   find: () => ({
    //     move: {
    //       _id: "move",
    //       count: 0,
    //       description: "mock description",
    //       isFragile: false,
    //       name: "mock stuff",
    //       value: 0,
    //     },
    //   }),
    // },
  },
};

const mockMovesDropdownData = {
  data: {
    getMovesByUserId: [
      {
        _id: "1",
        name: "mock move 1",
      },
      {
        _id: "2",
        name: "2 mock move",
      },
    ],
  },
};
const mocks = [
  {
    request: {
      query: LOGIN_USER,
      variables: {
        input: {
          email: "", // "peggy@pug.com",
          password: "", // "peggypug",
        },
      },
    },
    result: validLoginResp,
    // reread how to mock errors
    // https://www.apollographql.com/docs/react/development-testing/testing/
    // error: new Error("Login or redirect error occurred"),
  },
  {
    request: {
      query: GET_HOME_DATA,
    },
    result: mockHomeData,
  },
  {
    request: {
      query: GET_MOVES_DROPDOWN,
    },
    result: mockMovesDropdownData,
  },
];

const textInputMocks = [
  {
    request: {
      query: LOGIN_USER,
      variables: {
        input: {
          email: "",
          password: "",
        },
      },
    },
    result: validLoginResp,
    // reread how to mock errors
    // https://www.apollographql.com/docs/react/development-testing/testing/
    error: new Error("TextInput error occurred"),
  },
];

describe("<LoginScreen />", () => {
  it("fills in text input fields with user input", async () => {
    const component = (
      <NavigationContainer>
        <MockedProvider mocks={textInputMocks} addTypename={false}>
          <RootNavigator />
        </MockedProvider>
      </NavigationContainer>
    );

    const { getByPlaceholderText } = render(component);
    const toLoginScreen = await screen.findByText("Login");
    fireEvent(toLoginScreen, "press");

    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);

    // act function allows tests to wait for all pending React interactions to be
    // applied before we make our assertions
    // use act whenever there is some action that causes element tree to render,
    // particularly:
    // - initial render call - ReactTestRenderer.create call
    // - re-rendering of component -renderer.update call
    // - triggering any event handlers that cause component tree render
    // render, update and fireEvent methods already wrap their calls in sync act so
    // that you do not have to do it explicitly.
    await act(async () => {
      fireEvent.changeText(email, USER.email);
      fireEvent.changeText(password, USER.pasword);
    });
    await waitFor(() => {
      expect(email.props.value).toBe(EMAIL);
      expect(password.props.value).toBe(PASSWORD);
    });
  });

  it("redirects to dashboard on successful login", async () => {
    // const navigation = jest.fn();
    const navigation = { navigate: jest.fn() };
    // const navigation = { navigate: () => jest.fn() };

    const component = (
      <NavigationContainer>
        <MockedProvider mocks={mocks} addTypename={false}>
          <RootNavigator />
        </MockedProvider>
      </NavigationContainer>
    );

    const { debug } = render(component);
    const toLoginScreen = await screen.findByText("Login");
    fireEvent(toLoginScreen, "press");

    const loginBtn = screen.getByTestId("login");
    const email = screen.getByPlaceholderText(/email/i);
    const password = screen.getByPlaceholderText(/password/i);

    expect(email).toBeOnTheScreen();
    expect(password).toBeOnTheScreen();

    await act(async () => {
      fireEvent.changeText(email, USER.email);
      fireEvent.changeText(password, USER.pasword);
      // fireEvent.press(loginBtn);
      fireEvent(loginBtn, "press");
    });

    await waitFor(() => {
      debug();
      // expect(1).toBe(1);
      // expect(navigation.navigate).toHaveBeenCalledWith("LoggedIn", {
      //   params: {
      //     accessToken: "accessTokenResp",
      //     refreshToken: "refreshTokenResp",
      //     user_id: "userId",
      //   },
      //   screen: "Home",
      // });
      // cleanup();
      // expect(screen.findByText("Summary").toBeInTheDocument());
    });
  });
});

// describe("<LoginScreen />", () => {
//   it("shows an error message if the user enters invalid credentials", async () => {
//     render(
//       <MockedProvider mocks={mocks} addTypename={false}>
//         <LoginScreen navigation={navigation} />
//       </MockedProvider>
//     );
// fireEvent.changeText(email, USER.email + 'test');
// fireEvent.changeText(password, USER.pasword);
// // fireEvent.press(loginBtn);
// fireEvent(loginBtn, "press");
// expect(
//   await screen.findByText("Invalid email or password")
// ).toBeInTheDocument();
//   });
