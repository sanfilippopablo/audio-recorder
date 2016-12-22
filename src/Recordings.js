import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { List, ListItem } from 'react-toolbox/lib/list'
import { IconButton } from 'react-toolbox/lib/button'
import { readableDuration } from './utils'
import { actionCreators } from './redux'
import styles from './Recordings.scss'

const mapStateToProps = (state) => ({
  recordings: state.recordings
})

class RecordingsList extends React.Component {
  render () {
    const { recordings } = this.props
    console.log(recordings)
    return (
      <List className={styles.list}>
        {recordings.map((r) => (
          <ListItem
            caption={r.title}
            legend={readableDuration(r.duration)}
            key={r.id}
            leftIcon={<IconButton icon='play_arrow' />}
            rightIcon={<IconButton icon='clear' />}
          />
        ))}
      </List>
    )
  }
}

export default connect(
  mapStateToProps
)(RecordingsList)
