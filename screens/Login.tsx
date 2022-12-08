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
import Layout from "../layout/Layout";

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
        email: "rnuser@rn.com", // email.toLowerCase(),
        password: "rnuser1", // password,
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

  if (loading) return <BoxLogo />;

  return (
    <Layout>
      <View style={styles.screen}>
        {modalVisible && <Popup message={error?.message} />}
        <View style={styles.inputBlock}>
          <TextInput
            placeholder="Email"
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.action}>
          <Button
            title={ROUTES.Login}
            color={Colors.light.tint}
            onPress={() => createUser()}
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
    borderBottomColor: Colors.light.tint,
    borderBottomWidth: 8,
  },
  inputBlock: {
    width: "80%",
    height: 100,
    justifyContent: "space-between",
  },
  screen: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
