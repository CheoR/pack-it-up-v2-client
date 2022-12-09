import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { gql, useMutation } from "@apollo/client";

import Colors from "../constants/Colors";
import ROUTES from "../constants/Routes";
import Layout from "../layout/Layout";

const REGISTER_USER = gql`
  mutation RegisterUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      _id
      email
      username
      token
    }
  }
`;

export default function RegisterScreen({ navigation }) {
  const [formData, setFormData] = React.useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER, {
    variables: {
      input: formData,
    },
    onCompleted: (data) => {
      navigation.navigate(ROUTES.Home, data);
    },
    onError: (error) => {
      console.log(error.message);
      // setModalVisible(true);
    },
  });

  return (
    <Layout>
      <View style={styles.screen}>
        <View style={styles.inputBlock}>
          <TextInput
            placeholder="Username"
            style={styles.input}
            onChangeText={(text) =>
              setFormData((prevState) => ({ ...prevState, username: text }))
            }
          />
          <TextInput
            placeholder="First Name"
            style={styles.input}
            onChangeText={(text) =>
              setFormData((prevState) => ({ ...prevState, firstName: text }))
            }
          />
          <TextInput
            placeholder="Last Name"
            style={styles.input}
            onChangeText={(text) =>
              setFormData((prevState) => ({ ...prevState, lastName: text }))
            }
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            onChangeText={(text) =>
              setFormData((prevState) => ({ ...prevState, email: text }))
            }
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            onChangeText={(text) =>
              setFormData((prevState) => ({ ...prevState, password: text }))
            }
            secureTextEntry={true}
          />
          <TextInput
            placeholder="Confirm Password"
            style={styles.input}
            // onChangeText={(text) =>
            //   setFormData((prevState) => ({
            //     ...prevState,
            //     confirmPassword: text,
            //   }))
            // }
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.action}>
          <Button
            title={ROUTES.Register}
            color={Colors.light.tabIconDefault}
            onPress={() => registerUser()}
          />
          <View style={styles.actionBlock}>
            <Text>
              Already Registered,{" "}
              <Text
                style={styles.actionBlockText}
                onPress={() => navigation.push(ROUTES.Login)}
              >
                Login!
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  action: {
    width: "100%",
  },
  actionBlock: {
    alignItems: "center",
  },
  actionBlockText: {
    color: Colors.light.action,
  },
  input: {
    borderBottomColor: Colors.light.tabIconDefault,
    borderBottomWidth: 8,
  },
  inputBlock: {
    justifyContent: "space-between",
    width: "80%",
    height: 300,
  },
  screen: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
