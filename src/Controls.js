import React, { Component } from 'react'

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
    const { handleReset, handleColorClick } = this
    const { shuffleBoxes } = this.props
    return (
      <header className="controls">
        <h2 pose={this.state.mounted ? 'visible' : 'hidden'}>react-spring</h2>
        {this.state.colors.map(({ color, active }, i) => (
          <button
            del={i + 1}
            pose={this.state.mounted ? 'visible' : 'hidden'}
            className={`btn ${active ? 'selected' : ''}`}
            key={color}
            onClick={() => handleColorClick(color)}>
            {color}
          </button>
        ))}
        <div className="reset">
          <button
            del={5}
            pose={this.state.mounted ? 'visible' : 'hidden'}
            className={`btn ${this.state.all ? 'selected' : ''}`}
            onClick={handleReset}>
            all colors
          </button>
          <button
            del={6}
            pose={this.state.mounted ? 'visible' : 'hidden'}
            className="btn"
            onClick={shuffleBoxes}>
            Shuffle
          </button>
        </div>
      </header>
    )
  }
}

export default Controls
