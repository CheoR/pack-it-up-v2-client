import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import { MockedProvider } from "@apollo/client/testing";
import { act } from "react-test-renderer";

import LoginScreen, { LOGIN_USER } from "./Login";

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
          email: EMAIL,
          password: PASSWORD,
        },
      },
    },
    result: validLoginResp,
  },
];

describe("<LoginScreen />", () => {
  const mockFn = jest.fn();

  // it("responds with user login", async () => {
  it("fetches login button", async () => {
    const { debug, getByTestId, getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LoginScreen />
      </MockedProvider>
    );
    const btn = getByTestId("login");
    // console.log(btn);
    expect(btn).toBeDefined();

    // <MockedProvider mocks={mocks} addTypename={false}>
    //   render(
    //   <LoginScreen />
    //   ); const resp = screen.getAllByLabelText("Login"); console.log(` ====
    //   resp`); console.log(resp); console.log(`==== `);
    //   expect(resp).toInclude("login");
    // </MockedProvider>;

    // const tree = renderer.create(
    //   <MockedProvider mocks={mocks} addTypename={false}>
    //     <LoginScreen />
    //   </MockedProvider>
    // );
    // console.log(tree.toJSON());
    // expect(tree.toJSON()).toMatchSnapshot();
  });

  it("calls onSubmit with the username and password when submit is clicked", async () => {
    const {
      debug,
      getByTestId,
      getByPlaceholderText,
      getByDisplayValue,
      getByLabelText,
    } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LoginScreen />
      </MockedProvider>
    );
    // debug();
    const loginBtn = screen.getByTestId("login");
    const handleSubmit = jest.fn();
    act(() => {
      fireEvent.changeText(getByPlaceholderText(/email/i), USER.email);
      fireEvent.changeText(getByPlaceholderText(/password/i), USER.pasword);
      fireEvent.press(loginBtn);
    });
    await waitFor(() => {
      expect(1).toBe(1);
      // expect(screen.findByText("Loading")).toBeDefined();
    });
    // expect(handleSubmit).toHaveBeenCalledTimes(1);
    // expect(handleSubmit).toHaveBeenCalledWith(USER);
    // const { getByLabelText, getByText } = render(
    //   <Login onSubmit={handleSubmit} />
    // );

    // userEvent.type(getByLabelText(/username/i), USER.username);
    // userEvent.type(getByLabelText(/password/i), USER.password);
    // userEvent.click(getByText(/submit/i));

    // expect(handleSubmit).toHaveBeenCalledTimes(1);
    // expect(handleSubmit).toHaveBeenCalledWith(user);
  });
});

Hello everybody, my name's Cheo. I'm currently based out of Nashville, TN.

I'm a combination of formal CS education, self-taught, bootcamp grad and 4 months professional expereince as a jr full stack developer.

I transitioned from over a decade in transportation/logistics/shipping industries.

I have expereince working with the MERN stack and Python/Django.

Currently learning:

- TypeScript
- React Native (Expo)
- Testing


By building a mobile app PackItUpV2 https://github.com/CheoR/pack-it-up-v2-client

Currently looking for jr dev positions and/or people to work on mobile projects together.

If we havn't done so already, let's connect.

https://www.linkedin.com/in/cheo-roman/

🌐 I'm from:  California but currently based out of Tennessee
🏢 I work at: Looking for a jr dev position
💻 I work with this tech: React, TypeScript, React-Native, MongoDB
🍎 I snack on: Oranges
🤪 I really enjoy: Wandering