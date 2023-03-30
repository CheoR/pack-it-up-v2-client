import { Button, Text, TextInput, View } from "react-native";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import tw from "twrnc";

import LoggedOutLayout from "../layout/LoggedOutLayout";
import Loading from "../components/Loading";
import { setTokens } from "../auth/tokens";
import COLORS from "../constants/Colors";
import ROUTES from "../constants/Routes";

const REGISTER_USER = gql`
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
  const [confirmPassword, setConfirmPassword] = useState("");

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
      // setModalVisible(true);
    },
  });

  if (loading) return <Loading text="Summary" />;

  return (
    <LoggedOutLayout>
      <View style={tw`items-center flex-1 justify-around w-full`}>
        <View style={tw`h-[300px] justify-between w-4/5`}>
          <TextInput
            placeholder="Username"
            style={tw`border-b-neutral-500 border-b-8`}
            onChangeText={(text) =>
              setFormData((prevState) => ({ ...prevState, username: text }))
            }
          />
          <TextInput
            placeholder="First Name"
            style={tw`border-b-neutral-500 border-b-8`}
            onChangeText={(text) =>
              setFormData((prevState) => ({ ...prevState, firstName: text }))
            }
          />
          <TextInput
            placeholder="Last Name"
            style={tw`border-b-neutral-500 border-b-8`}
            onChangeText={(text) =>
              setFormData((prevState) => ({ ...prevState, lastName: text }))
            }
          />
          <TextInput
            placeholder="Email"
            style={tw`border-b-neutral-500 border-b-8`}
            onChangeText={(text) =>
              setFormData((prevState) => ({ ...prevState, email: text }))
            }
          />
          <TextInput
            placeholder="Password"
            style={tw`border-b-neutral-500 border-b-8`}
            onChangeText={(text) =>
              setFormData((prevState) => ({ ...prevState, password: text }))
            }
            secureTextEntry={true}
          />
          <TextInput
            placeholder="Confirm Password"
            style={tw`border-b-neutral-500 border-b-8`}
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
        <View style={tw`w-full`}>
          <Button
            title={ROUTES.Register}
            color={COLORS.light.tabIconDefault}
            onPress={() => registerUser()}
          />
          <View style={tw`items-center`}>
            <Text>
              Already Registered,{" "}
              <Text
                style={tw`text-orange-600`}
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
