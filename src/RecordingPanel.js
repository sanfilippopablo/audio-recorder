import React from 'react'
import { Motion, spring } from 'react-motion'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from './redux'
import { readableDuration } from './utils'
import { Button } from 'react-toolbox/lib/button'
import { Card } from 'react-toolbox/lib/card'
import FontIcon from 'react-toolbox/lib/font_icon'
import RecordingIcon from './RecordingIcon'
import styles from './RecordingPanel.scss'

const mapStateToProps = (store) => ({
  recorder: store.recorder
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)

class RecordingPanel extends React.Component {

  get openedStyle () {
    return {
      width: spring(100),
      opacity: spring(1)
    }
  }

  get closedStyle () {
    return {
      width: spring(0),
      opacity: spring(0)
    }
  }

  get recordingInfo () {
    const { recorder: { recording, time }} = this.props
    const style = recording ? this.openedStyle : this.closedStyle
    return (
      <Motion style={style}>
        {interpolatedStyle => (
          <div className={styles.recordingInfo} style={{width: `calc(${interpolatedStyle.width}% - 80px)`, opacity: interpolatedStyle.opacity}}>
            <Card className={styles.card}>
              <div className={styles.infoWrapper}>
                <div><RecordingIcon /></div>
                <div>Recording</div>
                <div className={styles.time}>{readableDuration(time)}</div>
              </div>
            </Card>
          </div>
        )}
      </Motion>
    )
  }

  render () {
    const { recorder: { recording }, startRecording, stopRecording } = this.props
    const buttonIcon = recording ? 'stop' : 'mic'
    return (
      <div className={styles.root}>
        {this.recordingInfo}
        <Button icon={buttonIcon} floating primary onClick={recording ? stopRecording : startRecording} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordingPanel)
