import React, { useState } from "react";
import {
  Alert,
  Button,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { gql, useMutation } from "@apollo/client";

import LoggedOutLayout from "../layout/LoggedOutLayout";
import Loading from "../components/Loading";
import { setTokens } from "../auth/tokens";
import COLORS from "../constants/Colors";
import ROUTES from "../constants/Routes";

export const REGISTER_USER = gql`
  mutation RegisterUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      accessToken
      refreshToken
    }
  }
`;

export default function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [modalVisible, setModalVisible] = useState(false);

  const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER, {
    variables: {
      input: formData,
    },
    onCompleted: (data) => {
      setTokens(data.registerUser);
      navigation.navigate(ROUTES.LoggedIn, {
        screen: ROUTES.Home,
        params: data.registerUser,
      });
    },
    onError: (error) => {
      console.log(error.message);
      setModalVisible(true);
    },
  });

  function Popup({ message }) {
    return (
      <View
        style={{
          backgroundColor: "pink",
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Modal
          animationType="slide"
          // transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
          style={{
            backgroundColor: "lightblue",
          }}
        >
          <View
            style={{
              backgroundColor: "yellow",
              alignItems: "center",
            }}
          >
            <Text>{message}</Text>
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              style={{
                backgroundColor: "lightbrown",
                width: 500,
                borderColor: "blue",
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontWeight: "bold",
                  textAlign: "center",
                  borderColor: "red",
                }}
              >
                Hide Modal
              </Text>
            </Pressable>
          </View>
        </Modal>
      </View>
    );
  }

  if (loading) return <Loading text="Summary" />;

  return (
    <LoggedOutLayout>
      <View style={styles.screen}>
        {modalVisible && <Popup message={error?.message} />}
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
        </View>
        <View style={styles.action}>
          <Button
            color={COLORS.light.tabIconDefault}
            onPress={() => registerUser()}
            testID="register"
            title={ROUTES.Register}
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
    </LoggedOutLayout>
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
    color: COLORS.light.action,
  },
  input: {
    borderBottomColor: COLORS.light.tabIconDefault,
    borderBottomWidth: 8,
  },
  inputBlock: {
    height: 300,
    justifyContent: "space-between",
    width: "80%",
  },
  screen: {
    alignItems: "center",
    flex: 1,
    justifyContent: "space-around",
    width: "100%",
  },
});
