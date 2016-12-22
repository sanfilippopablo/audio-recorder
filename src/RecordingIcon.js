import React from 'react'
import FontIcon from 'react-toolbox/lib/font_icon'

export default class RecordingIcon extends React.Component {

  constructor () {
    super()
    this.state = {
      interval: null,
      visible: true
    }
  }

  componentDidMount () {
    let interval = setInterval(() => {
      this.setState({visible: !this.state.visible})
    }, 500)
  }

  componentWillUnmount () {
    clearInterval(this.state.interval)
  }

  render () {
    return (
      <div style={{color: this.state.visible ? 'red' : 'transparent'}}>
        <FontIcon value='fiber_manual_record' />
      </div>
    )
  }
}
