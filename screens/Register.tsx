import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

import LoggedOutLayout from "../layout/LoggedOutLayout";
import Loading from "../components/Loading";
import { setTokens } from "../auth/tokens";
import COLORS from "../constants/Colors";
import ROUTES from "../constants/Routes";
import {
  Box,
  Button,
  Flex,
  Provider,
  Text,
  TextInput,
} from "@react-native-material/core";

const REGISTER_USER = gql`
  mutation RegisterUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      accessToken
      refreshToken
    }
  }
`;

function Screen({ navigation }) {
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
      <Flex fill items="center" justify="around" w="100%">
        <Flex h={300} justify="between" w="80%">
          <TextInput
            color={COLORS.light.action}
            label="Username"
            onChangeText={(text) =>
              setFormData((prevState) => ({ ...prevState, username: text }))
            }
            variant="standard"
          />
          <TextInput
            color={COLORS.light.action}
            label="First Name"
            onChangeText={(text) =>
              setFormData((prevState) => ({ ...prevState, firstName: text }))
            }
            variant="standard"
          />
          <TextInput
            color={COLORS.light.action}
            label="Last Name"
            onChangeText={(text) =>
              setFormData((prevState) => ({ ...prevState, lastName: text }))
            }
            variant="standard"
          />
          <TextInput
            color={COLORS.light.action}
            label="Email"
            onChangeText={(text) =>
              setFormData((prevState) => ({ ...prevState, email: text }))
            }
            variant="standard"
          />
          <TextInput
            color={COLORS.light.action}
            label="Password"
            onChangeText={(text) =>
              setFormData((prevState) => ({ ...prevState, password: text }))
            }
            secureTextEntry={true}
            variant="standard"
          />
          <TextInput
            color={COLORS.light.action}
            label="Confirm Password"
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
            variant="standard"
          />
        </Flex>
        <Box w="100%">
          <Button
            color={COLORS.light.tabIconDefault}
            onPress={() => registerUser()}
            title={ROUTES.Register}
          />
          <Flex items="center">
            <Text>
              Already Registered,{" "}
              <Text
                style={{ color: COLORS.light.action }}
                onPress={() => navigation.push(ROUTES.Login)}
              >
                Login!
              </Text>
            </Text>
          </Flex>
        </Box>
      </Flex>
    </LoggedOutLayout>
  );
}

export default RegisterScreen = ({ navigation }) => (
  <Provider>
    <Screen navigation={navigation} />
  </Provider>
);
