import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { MockedProvider } from "@apollo/client/testing";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer";

import LoginScreen, { LOGIN_USER } from "./Login";

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
        email: "user@email.com",
        password: "userpassword",
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
    console.log(btn);
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
});
