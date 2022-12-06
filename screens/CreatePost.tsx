import React from "react";

import { Button, TextInput } from "react-native";
import ROUTES from "../constants/Routes";

export default function CreatePostScreen({ navigation, route }) {
  const [postText, setPostText] = React.useState("");

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: "white" }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          // Pass and merge params back to home screen
          navigation.navigate({
            name: ROUTES.Landing,
            params: { post: postText },
            merge: true,
          });
        }}
      />
    </>
  );
}
