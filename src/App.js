import React, { Component } from 'react'
import AppBar from 'react-toolbox/lib/app_bar'
import RecordingsList from './Recordings'
import RecordingPanel from './RecordingPanel'
import styles from './App.scss'

console.log(styles)

// Import react-toolbox resets
import 'react-toolbox/lib/commons.scss'

export default class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <AppBar title='Audio Recorder' />
        <div className={styles.content}>
          <RecordingsList />
          <RecordingPanel />
        </div>
      </div>
    );
  }
}
