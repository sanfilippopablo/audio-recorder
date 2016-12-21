import React, { Component } from 'react'
import { Button } from 'react-toolbox/lib/button'
import AppBar from 'react-toolbox/lib/app_bar'
import RecordingsList from './Recordings'
import RecordingPanel from './RecordingPanel'
import styles from './App.scss'

// Import react-toolbox resets
import 'react-toolbox/lib/commons.scss'

export default class App extends Component {
  render() {
    const recs = [
      {id: 1, title: 'asd', duration: 124},
      {id: 2, title: 'asd', duration: 124},
      {id: 3, title: 'asd', duration: 124},
      {id: 4, title: 'asd', duration: 124},
      {id: 5, title: 'asd', duration: 124},
      {id: 6, title: 'asd', duration: 124},
      {id: 7, title: 'asd', duration: 124},
      {id: 8, title: 'asd', duration: 124},
      {id: 9, title: 'asd', duration: 124},
      {id: 10, title: 'asd', duration: 124},
    ]
    return (
      <div className={styles.app}>
        <AppBar title='Audio Recorder' />
        <div className={styles.content}>
          <RecordingsList recordings={recs} />
          <RecordingPanel />
        </div>
      </div>
    );
  }
}
