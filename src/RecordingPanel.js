import React from 'react'
import { Motion, spring } from 'react-motion'
import { Button } from 'react-toolbox/lib/button'
import { Card } from 'react-toolbox/lib/card'
import FontIcon from 'react-toolbox/lib/font_icon'
import styles from './RecordingPanel.scss'

export default class RecordingPanel extends React.Component {
  render () {
    return (
      <div className={styles.root}>
        <Motion defaultStyle={{w: 0}} style={{w: spring(100)}}>
          {intStyle => (
            <div className={styles.recordingInfo} style={{width: `calc(${intStyle.w}% - 80px)`}}>
              <Card className={styles.card}>
                <div className={styles.infoWrapper}>
                  <div className={styles.recordingIcon}><FontIcon value='fiber_manual_record' /></div>
                  <div>Recording</div>
                  <div className={styles.time}>00:14</div>
                </div>
              </Card>
            </div>
          )}
        </Motion>
        <Button icon='mic' floating primary />
      </div>
    )
  }
}
