'use strict';
import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ActivityIndicator,
  CameraRoll,
  Button
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import { RNCamera } from 'react-native-camera';

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text>Waiting</Text>
  </View>
);

export default class CameraView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      recording: false,
      processing: false,
      url: null
    };
  }

  goToPreview = () => {
    Actions.preview({ url: this.state.url })
  }

  render() {

    const { recording, processing } = this.state;

    let button = (
      <TouchableOpacity
        onPress={this.startRecording.bind(this)}
        style={styles.capture}
      >
        <Text style={{ fontSize: 14 }}> RECORD </Text>
      </TouchableOpacity>
    );

    if (recording) {
      button = (
        <TouchableOpacity
          onPress={this.stopRecording.bind(this)}
          style={styles.capture}
        >
          <Text style={{ fontSize: 14 }}> STOP </Text>
        </TouchableOpacity>
      );
    }

    if (processing) {
      button = (
        <View style={styles.capture}>
          <ActivityIndicator animating size={18} />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
          >

          <View
            style={{ flex: 0, flexDirection: "row", justifyContent: "center" }}
          >
            {button}
          </View>


        </RNCamera>
      </View>
    );
  }

  takePicture = async function (camera) {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    console.log(data.uri);
  };

  async startRecording() {
    this.setState({ recording: true });
    // default to mp4 for android as codec is not set
    const options = {
      maxDuration: 120
    };
    
    await this.camera.recordAsync(options)
      .then(data => {
        console.log(data['uri']);
        this.setState({
          url: data['uri']
        });
        
        // let recordPromise = CameraRoll.saveToCameraRoll(data['uri']);
        // recordPromise.then(function (result) {
        //     console.log('Video saved successfully！');
        // })  
        // .catch(error => {
        //       console.log(error);
        // });
      });
    this.setState({ recording: false, processing: true });
    this.setState({ processing: false });
  }

  stopRecording() {
      this.camera.stopRecording();
      this.goToPreview();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});