import React from 'react'
import { List, ListItem } from 'react-toolbox/lib/list'
import { IconButton } from 'react-toolbox/lib/button'
import { readableDuration } from './utils'
import styles from './Recordings.scss'

export default class RecordingsList extends React.Component {
  render () {
    const { recordings } = this.props
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
