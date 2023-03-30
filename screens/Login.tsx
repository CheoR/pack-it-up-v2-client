import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import tw from "twrnc";
import {
  Alert,
  Button,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import LoggedOutLayout from "../layout/LoggedOutLayout";
import Loading from "../components/Loading";
import { setTokens } from "../auth/tokens";
import COLORS from "../constants/Colors";
import ROUTES from "../constants/Routes";

export const LOGIN_USER = gql`
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
      setTokens(data.loginUser);
      navigation.navigate(ROUTES.LoggedIn, {
        screen: ROUTES.Home,
        params: data.loginUser,
      });
    },
    onError: (error) => {
      console.log(error.message);
      setModalVisible(true);
    },
  });

  function Popup({ message }) {
    return (
      <View style={tw`bg-red-200 h-full w-full flex justify-center`}>
        <Modal
          animationType="slide"
          // transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert(`Closing error ${message}`);
            setModalVisible(!modalVisible);
          }}
          style={tw`bg-blue-300`}
        >
          <View style={tw`bg-yellow-300 items-center`}>
            <Text>{message}</Text>
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              style={tw`bg-lime-100 w-[500px] border-blue-500`}
            >
              <Text style={tw`text-black font-bold text-center border-red-500`}>
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
      <View style={tw`items-center flex-1 justify-around w-full`}>
        {modalVisible && <Popup message={error?.message} />}
        <View style={tw`h-24 justify-between w-4/5`}>
          <TextInput
            placeholder="Email"
            style={tw`border-b-slate-800 border-b-8`}
            onChangeText={(text) =>
              setFormData((prevState) => ({ ...prevState, email: text }))
            }
          />
          <TextInput
            placeholder="Password"
            style={tw`border-b-slate-800 border-b-8`}
            onChangeText={(text) =>
              setFormData((prevState) => ({ ...prevState, password: text }))
            }
            secureTextEntry={true}
          />
        </View>
        <View style={tw`w-full`}>
          <Button
            testID="login"
            title={ROUTES.Login}
            color={COLORS.light.tint}
            onPress={() => loginUser()}
          />
          <View style={tw`items-center`}>
            <Text>
              No Account,{" "}
              <Text
                style={tw`text-orange-600`}
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
