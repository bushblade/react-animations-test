import React, { Component } from 'react'
import posed from 'react-pose'

const Btn = posed.button({
  visible: { opacity: 1, transition: ({ del }) => ({ delay: del * 100 }) },
  hidden: { opacity: 0 }
})

const Heading = posed.h2({
  visible: { opacity: 1, transition: { delay: 700 }, pose: true },
  hidden: { opacity: 0 }
})

class Controls extends Component {
  state = {
    colors: [
      { color: 'paleturquoise', active: false },
      { color: 'aquamarine', active: false },
      { color: 'turquoise', active: false },
      { color: 'lightseagreen', active: false }
    ],
    all: true,
    mounted: false
  }

  handleColorClick = color => {
    const { filter } = this.props
    filter(color)
    this.setState(({ colors, all }) => ({
      colors: colors.map(col => {
        return col.color === color
          ? { color: col.color, active: true }
          : { color: col.color, active: false }
      }),
      all: false
    }))
  }

  handleReset = () => {
    const { reset } = this.props
    reset()
    this.setState(({ colors, all }) => ({
      colors: colors.map(({ color }) => ({ color, active: false })),
      all: true
    }))
  }

  componentDidMount() {
    this.setState({ mounted: true })
  }

  render() {
    const {
      handleReset,
      handleColorClick,
      state: { mounted }
    } = this
    const { shuffleBoxes } = this.props
    return (
      <header className="controls">
        <Heading pose={this.state.mounted ? 'visible' : 'hidden'}>react-pose</Heading>
        {this.state.colors.map(({ color, active }, i) => (
          <Btn
            del={i + 1}
            pose={mounted ? 'visible' : 'hidden'}
            className={`btn ${active ? 'selected' : ''}`}
            key={color}
            onClick={() => handleColorClick(color)}>
            {color}
          </Btn>
        ))}
        <div className="reset">
          <Btn
            del={5}
            pose={mounted ? 'visible' : 'hidden'}
            className={`btn ${this.state.all ? 'selected' : ''}`}
            onClick={handleReset}>
            all colors
          </Btn>
          <Btn del={6} pose={mounted ? 'visible' : 'hidden'} className="btn" onClick={shuffleBoxes}>
            Shuffle
          </Btn>
        </div>
      </header>
    )
  }
}

export default Controls
