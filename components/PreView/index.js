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
  CameraRoll
} from 'react-native';
import Video from 'react-native-video';

import { Actions } from 'react-native-router-flux';

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

export default class PreView extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  goToCameraView = () => {
    Actions.camera()
  }

  render() {

    return (
      <View style={styles.container}>
        <Video source={{uri: this.props.url}}   
            ref={(ref) => {
              this.player = ref
            }}
            controls={true}
            onBuffer={this.onBuffer}
            onError={this.videoError}
            style={styles.backgroundVideo} />
        </View>
    );
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
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});