import React from "react";
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

import SocialsIcons from "../components/SocialsIcons";
import BoxLogo from "../components/BoxLogo";
import Colors from "../constants/Colors";
import ROUTES from "../constants/Routes";

const CREATE_USER = gql`
  mutation LoginUser($input: LoginUserInput!) {
    loginUser(input: $input) {
      _id
      email
      username
      token
    }
  }
`;

export default function LoginScreen({ navigation }) {
  // TODO: fix
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [modalVisible, setModalVisible] = React.useState(false);

  const [createUser, { data, loading, error }] = useMutation(CREATE_USER, {
    variables: {
      input: {
        email: email.toLowerCase(),
        password: password,
      },
    },
    onCompleted: (data) => {
      navigation.navigate(ROUTES.Home, data);
    },
    onError: (error) => {
      console.log("onError called");
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

  if (loading) <BoxLogo />;

  return (
    <View style={styles.login}>
      {modalVisible && <Popup message={error?.message} />}
      <BoxLogo />

      <View style={styles.container}>
        <View style={styles.inputGroup}>
          <TextInput placeholder="Email" onChangeText={setEmail} />
          <TextInput
            placeholder="Password"
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </View>
      </View>
      <View style={{ width: "100%" }}>
        <Button
          title={ROUTES.Login}
          color={Colors.light.tint}
          onPress={() => createUser()}
        />
        <View style={{ alignItems: "center" }}>
          <Text>
            No Account,{" "}
            <Text
              style={{ color: Colors.light.action }}
              onPress={() => navigation.push(ROUTES.Register)}
            >
              Register!
            </Text>
          </Text>
        </View>
      </View>

      <SocialsIcons />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: 60,
    alignItems: "center",
  },
  inputGroup: {
    flex: 1,
    justifyContent: "space-between",
    width: "100%",
  },
  login: {
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: Colors.light.background,
  },
});
