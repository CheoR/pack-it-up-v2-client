import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer";

import LoginScreen, { LOGIN_USER } from "./Login";

const validLoginResp = {
  data: {
    loginUser: {
      accessToken: "accessTokenResponse",
      refreshToken: "refreshTokenResponse",
      user_id: "userIdResponse",
    },
  },
};

const mocks = [
  {
    request: {
      query: LOGIN_USER,
      variables: {
        email: "user@email.com",
        password: "userPassword",
      },
    },
    result: validLoginResp,
  },
];

describe("<LoginScreen />", () => {
  it("responds with user login", async () => {
    const tree = renderer.create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LoginScreen />
      </MockedProvider>
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
