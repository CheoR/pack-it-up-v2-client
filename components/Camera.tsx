import React, { useEffect, useState, useRef } from "react";
import { Image, Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { Camera as ExpoCamera, CameraType } from "expo-camera";

import COLORS from "../constants/Colors";

export default function App({ setFormFields }) {
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | null
  >(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(ExpoCamera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await ExpoCamera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  async function takePicture() {
    if (cameraRef.current) {
      try {
        const data = await cameraRef?.current?.takePictureAsync();
        console.log(data);
        setImage(data.uri);
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
        console.log("saved successfully");
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
