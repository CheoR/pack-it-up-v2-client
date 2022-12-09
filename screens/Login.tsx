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

import BoxLogo from "../components/BoxLogo";
import Colors from "../constants/Colors";
import ROUTES from "../constants/Routes";
import Layout from "../layout/Layout";

const LOGIN_USER = gql`
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
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [modalVisible, setModalVisible] = React.useState(false);

  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER, {
    variables: {
      input: formData,
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
            color={Colors.light.tint}
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
