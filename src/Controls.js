import React, { Component } from 'react'
import { Spring, Transition } from 'react-spring'

class Controls extends Component {
  state = {
    colors: [
      { color: 'paleturquoise', active: false, delay: 1 },
      { color: 'aquamarine', active: false, delay: 2 },
      { color: 'turquoise', active: false, delay: 3 },
      { color: 'lightseagreen', active: false, delay: 4 }
    ],
    all: true
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

  render() {
    const {
      handleReset,
      handleColorClick,
      state: { colors }
    } = this
    const { shuffleBoxes } = this.props
    return (
      <header className="controls">
        <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} config={{ delay: 400 }}>
          {props => <h2 style={props}>Filter boxes by colour</h2>}
        </Spring>

        <Transition
          items={colors}
          keys={item => item.color}
          from={{ opacity: 0, transform: 'translate3d(0,-40px,0)' }}
          enter={{ opacity: 1, transform: 'translate3d(0,0px,0)' }}
          trail={100}>
          {({ color, active }) => props => (
            <button
              style={props}
              className={`btn ${active ? 'selected' : ''}`}
              key={color}
              onClick={() => handleColorClick(color)}>
              {color}
            </button>
          )}
        </Transition>

        <div className="reset">
          <Spring
            from={{ opacity: 0, transform: 'translateX(-50px)' }}
            to={{ opacity: 1, transform: 'translateX(0)' }}
            config={{ delay: 600 }}>
            {props => (
              <button
                className={`btn ${this.state.all ? 'selected' : ''}`}
                style={props}
                onClick={handleReset}>
                all colors
              </button>
            )}
          </Spring>

          <Spring
            from={{ opacity: 0, transform: 'translateX(50px)' }}
            to={{ opacity: 1, transform: 'translateX(0)' }}
            config={{ delay: 500 }}>
            {props => (
              <button className="btn" onClick={shuffleBoxes} style={props}>
                Shuffle
              </button>
            )}
          </Spring>
        </div>
      </header>
    )
  }
}

export default Controls
