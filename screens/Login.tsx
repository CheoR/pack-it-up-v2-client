import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
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

import LoggedOutLayout from "../layout/LoggedOutLayout";
import Loading from "../components/Loading";
import { setTokens } from "../auth/tokens";
import COLORS from "../constants/Colors";
import ROUTES from "../constants/Routes";

const LOGIN_USER = gql`
  mutation LoginUser($input: LoginUserInput!) {
    loginUser(input: $input) {
      accessToken
      refreshToken
      user_id
    }
  }
`;

export default function LoginScreen({ navigation }) {
  // TODO: fix
  const [formData, setFormData] = useState({
    email: "peggy@pug.com", // "oink@oink.com",
    password: "peggypug", // "oinkoink",
  });
  const [modalVisible, setModalVisible] = useState(false);

  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER, {
    variables: {
      input: formData,
    },
    onCompleted: (data) => {
      navigation.navigate(ROUTES.LoggedIn, {
        screen: ROUTES.Home,
        params: data.loginUser,
      });
      setTokens(data.loginUser);
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
            Alert.alert(`Closing error ${message}`);
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

  if (error) {
    console.log(error.message);
  }

  if (loading) return <Loading text="Summary" />;

  return (
    <LoggedOutLayout>
      <View style={styles.screen}>
        {modalVisible && <Popup message={error?.message} />}
        <View style={styles.inputBlock}>
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
            title={ROUTES.Login}
            color={COLORS.light.tint}
            onPress={() => loginUser()}
          />
          <View style={styles.actionBlock}>
            <Text>
              No Account,{" "}
              <Text
                style={styles.actionBlockText}
                onPress={() => navigation.push(ROUTES.Register)}
              >
                Register!
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
    borderBottomColor: COLORS.light.tint,
    borderBottomWidth: 8,
  },
  inputBlock: {
    height: 100,
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
