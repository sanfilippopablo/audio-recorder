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

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)

class RecordingsList extends React.Component {
  render () {
    const { recordings } = this.props
    return (
      <List ripple={false}>
        {recordings.map((r) => (
          <ListItem
            theme={{itemContentRoot: styles.itemContentRoot}}
            caption={<span style={{textOverflow: 'ellipsis'}}>{r.title}</span>}
            legend={readableDuration(r.duration)}
            key={r.id}
            leftIcon={<IconButton icon='play_arrow' onClick={() => this.props.play(r.id)} />}
            rightIcon={<IconButton icon='clear' />}
          />
        ))}
      </List>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordingsList)
