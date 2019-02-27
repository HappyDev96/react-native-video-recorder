import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import CameraView from '../CameraView/index.js';
import PreView from '../PreView/index.js'

const Routes = () => (
   <Router>
      <Scene key = "root">
         <Scene key = "camera" component = {CameraView} title = "Camera" initial = {true} />
         <Scene key = "preview" component = {PreView} title = "Preview" />
      </Scene>
   </Router>
)
export default Routes