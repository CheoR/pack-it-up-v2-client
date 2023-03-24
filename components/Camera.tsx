import React, { useEffect, useState, useRef } from "react";
import { Image, Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { Camera as ExpoCamera, CameraType } from "expo-camera";

import { manipulateAsync } from "expo-image-manipulator";

import COLORS from "../constants/Colors";

export default function App({ setFormFields }) {
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | null
  >(null);
  const [image, setImage] = useState<string | null>(null);
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(ExpoCamera.Constants.FlashMode.off);
  // pictureSize crashes app
  const [imageSize, setImageSize] = useState("420x420");
  const cameraRef = useRef<ExpoCamera>(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await ExpoCamera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  async function takePicture() {
    if (cameraRef.current !== null) {
      let sizes = await cameraRef?.current?.getAvailablePictureSizesAsync(
        "1:1"
      );
      let size = "100x100";
      if (sizes?.length) size = sizes[0];
      // setImageSize(size);

      try {
        //  Note: Make sure to wait for the onCameraReady callback before calling this method.
        const { uri, base64 } = await cameraRef?.current?.takePictureAsync({
          base64: true,
          quality: 0,
        });
        const backupImg =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAAAA1BMVEXr7MqLt5XVAAAAC0lEQVR4AWOgKwAAAG4AAfBdB/0AAAAASUVORK5CYII=";
        // `https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg`

        // https://docs.expo.dev/versions/latest/sdk/imagemanipulator/#action
        // It is included if the base64 save option was truthy, and is a string containing
        //  the JPEG/PNG (depending on format) data of the image in Base64. Prepend that
        //   with 'data:image/xxx;base64,' to get a data URI, which you can use as the source
        //    for an Image element for example (where xxx is jpeg or png).

        const resizedPhoto = await manipulateAsync(
          uri,
          [{ resize: { width: 300 } }], // resize to width of 300 and preserve aspect ratio
          { compress: 0.95, base64: true } // any higher than 0.95 causes error: base64 too long
        );

        let img = backupImg;
        if (resizedPhoto.base64?.length) {
          img = "data:image/jpeg;base64,".concat(resizedPhoto.base64);
        }
        setImage(img);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function savePicture() {
    if (image) {
      try {
        alert("Picture saved! 🎉");
        setImage(null);
        setFormFields &&
          setFormFields((prevState) => {
            return {
              ...prevState,
              image_uri: image,
            };
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("no image");
    }
  }

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!image ? (
        <ExpoCamera
          style={styles.camera}
          type={type}
          ref={cameraRef}
          flashMode={flash}
          // pictureSize crashes app
          // pictureSize={"100x100"}
          // pictureSize={imageSize}
          // ratio="4:3"
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 30,
            }}
          >
            <Button
              title="Flip"
              onPress={() => {
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                );
              }}
            />
            <Button
              title="Flash"
              onPress={() =>
                setFlash(
                  flash === ExpoCamera.Constants.FlashMode.off
                    ? ExpoCamera.Constants.FlashMode.on
                    : ExpoCamera.Constants.FlashMode.off
                )
              }
            />
          </View>
        </ExpoCamera>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}

      <View style={styles.controls}>
        {image ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 50,
            }}
          >
            <Button title="Re-take" onPress={() => setImage(null)} />
            <Button title="Save" onPress={savePicture} />
          </View>
        ) : (
          <Button title="Take a picture" onPress={takePicture} />
        )}
      </View>
    </View>
  );
}

function Button({ title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000",
    padding: 8,
    borderRadius: 8,
    width: "100%",
    marginBottom: 8,
  },
  controls: {
    flex: 0.5,
  },
  button: {
    height: 40,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.light.tabIconDefault,
    paddingHorizontal: 8,
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: COLORS.light.action,
  },
  camera: {
    flex: 5,
    borderRadius: 20,
  },
  topControls: {
    flex: 1,
  },
});
