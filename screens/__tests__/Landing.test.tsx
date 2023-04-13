import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "../../navigation/RootNavigator";
import { MockedProvider } from "@apollo/client/testing";
// import "@testing-library/jest-dom";

describe("<Landing />", () => {
  it("displays landing page", async () => {
    const component = (
      <NavigationContainer>
        <MockedProvider mocks={[]} addTypename={false}>
          <RootNavigator />
        </MockedProvider>
      </NavigationContainer>
    );

    render(component);

    const tagLine = await screen.findByText("Organize your life.");
    const register = await screen.findByText("Register");
    const login = await screen.findByText("Login");
    expect(tagLine).toBeOnTheScreen();
    expect(register).toBeOnTheScreen();
    expect(login).toBeOnTheScreen();
  });

  it("navigates from landing page to login page", async () => {
    const component = (
      <NavigationContainer>
        <MockedProvider mocks={[]} addTypename={false}>
          <RootNavigator />
        </MockedProvider>
      </NavigationContainer>
    );

    render(component);

    const loginBtn = await screen.findByText("Login");
    fireEvent(loginBtn, "press");
    // fireEvent.press(loginBtn);
    const emailInput = await screen.getByPlaceholderText("Email");
    const passwordInput = await screen.getByPlaceholderText("Password");

    expect(emailInput).toBeOnTheScreen();
    expect(passwordInput).toBeOnTheScreen();
  });

  it("navigates from landing page to login page", async () => {
    const component = (
      <NavigationContainer>
        <MockedProvider mocks={[]} addTypename={false}>
          <RootNavigator />
        </MockedProvider>
      </NavigationContainer>
    );

    render(component);

    const loginBtn = await screen.findByText("Register");
    fireEvent(loginBtn, "press");
    // fireEvent.press(loginBtn);
    const email = await screen.getByPlaceholderText("Email");
    const password = await screen.getByPlaceholderText("Password");
    const firstName = await screen.getByPlaceholderText("First Name");
    const lastName = await screen.getByPlaceholderText("Last Name");
    const userName = await screen.getByPlaceholderText("Username");

    expect(email).toBeOnTheScreen();
    expect(password).toBeOnTheScreen();
    expect(firstName).toBeOnTheScreen();
    expect(lastName).toBeOnTheScreen();
    expect(userName).toBeOnTheScreen();
  });
});
