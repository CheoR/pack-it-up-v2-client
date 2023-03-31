import { gql, useMutation } from "@apollo/client";
import { Alert } from "react-native";
import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogHeader,
  Flex,
  Provider,
  Text,
  TextInput,
} from "@react-native-material/core";

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

function Screen({ navigation }) {
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

  function Popup({ message }: { message: string }) {
    return (
      <Flex
        fill
        h="100%"
        justify="center"
        w="100%"
        style={{
          backgroundColor: "pink",
        }}
      >
        <Dialog
          onDismiss={() => {
            Alert.alert(`Closing error ${message}`);
            setModalVisible(!modalVisible);
          }}
          visible={modalVisible}
        >
          <DialogHeader title={`${message}`} />
          <DialogContent>
            <Text>Replace with better message.</Text>
          </DialogContent>
          <DialogActions>
            <Button
              compact
              onPress={() => setModalVisible(false)}
              title="Hide Modal"
              color={COLORS.light.warning}
              variant="text"
            />
          </DialogActions>
        </Dialog>
      </Flex>
    );
  }

  if (error) {
    console.log(error.message);
  }

  if (loading) return <Loading text="Summary" />;

  return (
    <LoggedOutLayout>
      <Flex fill items="center" justify="around" w="100%">
        {modalVisible && <Popup message={error?.message} />}
        <Flex h={100} justify="between" w="80%">
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
        </Flex>
        <Box w="100%">
          <Button
            testID="login"
            title={ROUTES.Login}
            color={COLORS.light.tint}
            onPress={() => loginUser()}
          />
          <Flex items="center">
            <Text>
              No Account,{" "}
              <Text
                style={{ color: COLORS.light.action }}
                onPress={() => navigation.push(ROUTES.Register)}
              >
                Register!
              </Text>
            </Text>
          </Flex>
        </Box>
      </Flex>
    </LoggedOutLayout>
  );
}

const LoginScreen = ({ navigation }) => (
  // fix: Error: usePortalContext must be used within a PortalContext
  <Provider>
    <Screen navigation={navigation} />
  </Provider>
);

export default LoginScreen;
