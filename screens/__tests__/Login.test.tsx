import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MockedProvider } from "@apollo/client/testing";
import LoginScreen, { LOGIN_USER } from "../Login";
import { act } from "react-test-renderer";
// import "@testing-library/jest-dom";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";

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

const mocks = [
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
    // error: new Error("An error occurred")
  },
];

describe("<LoginScreen />", () => {
  // const mockNavigation = jest.fn();
  const navigation = { navigate: jest.fn() };
  // const navigation = { navigate: () => jest.fn() };
  const handleSubmit = jest.fn();
  it("updates user input", async () => {
    const component = (
      <NavigationContainer>
        <MockedProvider mocks={mocks} addTypename={false}>
          <LoginScreen navigation={navigation} />
        </MockedProvider>
      </NavigationContainer>
    );

    const { getByPlaceholderText } = render(component);
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);

    await act(async () => {
      fireEvent.changeText(email, USER.email);
      fireEvent.changeText(password, USER.pasword);
    });
    await waitFor(() => {
      expect(email.props.value).toBe(EMAIL);
      expect(password.props.value).toBe(PASSWORD);
    });
  });

  it("handles valid input submission", async () => {
    const component = (
      <NavigationContainer>
        <MockedProvider mocks={mocks} addTypename={false}>
          <LoginScreen navigation={navigation} />
        </MockedProvider>
      </NavigationContainer>
    );

    const {
      debug,
      getByTestId,
      getByPlaceholderText,
      getByDisplayValue,
      getByLabelText,
    } = render(component);
    const loginBtn = screen.getByTestId("login");
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
      // fireEvent.press(loginBtn);
      fireEvent(loginBtn, "press");
    });
    await waitFor(() => {
      // expect(navigation.navigate).toBeCalledWith({
      //   input: {
      //     email: USER.email,
      //     password: USER.pasword,
      //   },
      // });
      // expect(navigation.navigate).toBeCalledWith("Summary"); // validLoginResp);
      // expect(navigation.navigate).toHaveBeenCalledWith(validLoginResp);

      expect(navigation.navigate).toHaveBeenCalledWith("LoggedIn", {
        params: {
          accessToken: "accessTokenResp",
          refreshToken: "refreshTokenResp",
          user_id: "userId",
        },
        screen: "Home",
      });
      // debug();
      // expect(screen.getByLabelText("Summary")).toBeInTheDocument();
      // cleanup();
    });
    expect(await screen.findByText("Summary")).toBeInTheDocument();
  });
});

// it("responds with user login", async () => {

// const tree = renderer.create(
//   <MockedProvider mocks={mocks} addTypename={false}>
//     <LoginScreen />
//   </MockedProvider>
// );
// console.log(tree.toJSON());
// expect(tree.toJSON()).toMatchSnapshot();

// describe("<LoginScreen />", () => {
//   it("renders the email and password input fields", () => {
//     render(
//       <MockedProvider mocks={mocks} addTypename={false}>
//         <LoginScreen navigation={undefined} />
//       </MockedProvider>
//     );
//     expect(screen.getByLabelText("Email or Username")).toBeInTheDocument();
//     expect(screen.getByLabelText("Password")).toBeInTheDocument();
//   });

//   it("shows an error message if the user enters invalid credentials", async () => {
//     render(
//       <MockedProvider mocks={mocks} addTypename={false}>
//         <LoginScreen navigation={jest.fn()} />
//       </MockedProvider>
//     );
//     fireEvent.change(screen.getByLabelText("Email or Username"), {
//       target: { value: "invalid@example.com" },
//     });
//     fireEvent.change(screen.getByLabelText("Password"), {
//       target: { value: "invalidPassword" },
//     });
//     fireEvent.click(screen.getByText("Log In"));
// expect(
//   await screen.findByText("Invalid email or password")
// ).toBeInTheDocument();
//   });

//   it("logs the user in and redirects to the dashboard when the user enters valid credentials", async () => {
//     render(
//       <MockedProvider mocks={mocks} addTypename={false}>
//         <LoginScreen />
//       </MockedProvider>
//     );
//     fireEvent.change(screen.getByLabelText("Email or Username"), {
//       target: { value: "valid@example.com" },
//     });
//     fireEvent.change(screen.getByLabelText("Password"), {
//       target: { value: "validPassword" },
//     });
//     fireEvent.click(screen.getByText("Log In"));
//     expect(
//       await screen.findByText("Welcome to Pack It Up")
//     ).toBeInTheDocument();
//   });
// });
