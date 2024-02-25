import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Camera} from 'expo-camera';

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isCameraActive, setIsCameraActive] = useState(false);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setCapturedImage(data.uri);
    }
  };

  const toggleCamera = () => {
    setIsCameraActive(prevState => !prevState);
  };

  const closeCamera = () => {
    setIsCameraActive(false);
    setCapturedImage(null);
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{flex: 1}}>
      {!isCameraActive && <Button title="Open Camera" onPress={toggleCamera} />}
      {isCameraActive && (
        <View style={{flex: 1}}>
          <Camera
            ref={ref => setCamera(ref)}
            style={styles.camera}
            type={type}
            ratio={'1:1'}
          />
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={closeCamera} />
            <TouchableOpacity
              style={styles.captureButton}
              onPress={takePicture}>
              <View style={styles.innerCaptureButton} />
            </TouchableOpacity>
            <Button
              title="Flip Image"
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back,
                );
              }}
            />
          </View>
          {capturedImage && (
            <View style={[styles.imagePreviewContainer, styles.position]}>
              <Image
                source={{uri: capturedImage}}
                style={styles.imagePreview}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'center',
    height: 80,
    bottom: 20,
    left: 10,
    right: 0,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 30,
    borderColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCaptureButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  imagePreviewContainer: {
    position: 'absolute',
    bottom: 100,
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: 'blue',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePreview: {
    width: 96,
    height: 96,
    borderRadius: 10,
  },
  position: {
    right: 15,
  },
});
