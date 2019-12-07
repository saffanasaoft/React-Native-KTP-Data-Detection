import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import RNTextDetector from "react-native-text-detector";

export default class CameraView extends React.Component {
    render() {
        return (
            <RNCamera
                ref={ref => {
                    this.camera = ref;
                }}
                googleVisionBarcodeType={0}
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.on}
            >
            <Image source={require('../../assets/FrameKTP.png')} />
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center', }}>
                <TouchableOpacity
                    onPress={this.takePicture.bind(this)}
                    style={styles.capture}>
                    <Text style={{ fontSize: 14 }}> AMBIL PHOTO </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.detectText}
                    style={styles.capture}>
                    <Text style={{ fontSize: 14 }}> EXTRACT </Text>
                </TouchableOpacity>
            </View>
            </RNCamera>
        );
    }

    takePicture = async function () {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options)
            console.log(data.uri);
        }
    };
    
    detectText = async () => {
    try {
      const options = {
        quality: 0.8,
        base64: true,
        skipProcessing: true,
      };
      const { uri } = await this.camera.takePictureAsync(options);
      const visionResp = await RNTextDetector.detectFromUri(uri);
      console.log('visionResp', visionResp);
    } catch (e) {
      console.warn(e);
    }
  };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
    }
});