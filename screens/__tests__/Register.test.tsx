import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MockedProvider } from "@apollo/client/testing";
import { act } from "react-test-renderer";
import "@testing-library/jest-dom";
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";

import RootNavigator from "../../navigation/RootNavigator";
import { GET_MOVES_DROPDOWN } from "../../graphql/move";
import { GET_HOME_DATA } from "../../graphql/home";
import { REGISTER_USER } from "../Register";

const EMAIL = "peggy2@pug.com";
const PASSWORD = "peggypug2";
const FIRSTNAME = "peggy1";
const LASTNAME = "peggy1last";
const USERNAME = "iampug";

const USER = {
  email: EMAIL,
  pasword: PASSWORD,
  username: USERNAME,
  firstName: FIRSTNAME,
  lastName: LASTNAME,
};
const validRegisterResp = {
  data: {
    registerUser: {
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
        value: 123.45,
      },
    ],
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
      query: REGISTER_USER,
      variables: {
        input: {
          email: "",
          password: "",
          username: "",
          firstName: "",
          lastName: "",
        },
      },
    },
    result: validRegisterResp,
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

// TODO: error on trying to create 2 or more users with same username

describe("<Register Screen />", () => {
  it("navigates to dashboard on successful registration", async () => {
    const component = (
      <NavigationContainer>
        <MockedProvider mocks={mocks} addTypename={false}>
          <RootNavigator />
        </MockedProvider>
      </NavigationContainer>
    );

    render(component);

    const toRegisterScreen = await screen.findByText("Register");
    fireEvent(toRegisterScreen, "press");

    const registerBtn = screen.getByTestId("register");
    const email = screen.getByPlaceholderText(/email/i);
    const password = screen.getByPlaceholderText(/^password$/i);
    const username = screen.getByPlaceholderText(/username/i);
    const firstName = screen.getByPlaceholderText(/first name/i);
    const lastName = screen.getByPlaceholderText(/last name/i);

    expect(email).toBeOnTheScreen();
    expect(password).toBeOnTheScreen();
    expect(username).toBeOnTheScreen();
    expect(firstName).toBeOnTheScreen();
    expect(lastName).toBeOnTheScreen();

    await act(async () => {
      fireEvent.changeText(email, USER.email);
      fireEvent.changeText(password, USER.pasword);
      fireEvent.changeText(username, USER.username);
      fireEvent.changeText(firstName, USER.firstName);
      fireEvent.changeText(lastName, USER.lastName);
      fireEvent.press(registerBtn);
    });

    await waitFor(() => {
      const totalValue = `${mockHomeData.data.getHomeData[0].value}`;
      const input = screen.getByTestId("moveValue");
      const displayedValue = input.props.children[1];

      expect(screen.getByText("Summary")).toBeOnTheScreen();
      expect(displayedValue).toBe(totalValue);
      expect(screen).toMatchSnapshot();
    });
  });
});
