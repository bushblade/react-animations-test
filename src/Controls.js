import React, { Component } from 'react'
import anime from 'animejs'

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
    const {
      refs,
      state: { colors }
    } = this

    anime({
      targets: refs['heading'],
      opacity: [0, 1],
      duration: 2000,
      delay: 800,
      easing: 'easeOutSine'
    })

    colors.forEach(({ color }, i) => {
      anime({
        targets: refs[`${color}-btn`],
        opacity: [0, 1],
        translateY: [-200, 0],
        delay: (i + 5) * 200,
        duration: 500,
        easing: 'easeOutElastic'
      })
    })

    anime({
      targets: [refs['all-colors-btn'], refs['shuffle-btn']],
      translateY: [-200, 0],
      rotate: [-180, 0],
      opacity: [0, 1],
      easing: 'easeOutElastic',
      elasticity: 100,
      duration: 500,
      delay: (target, i) => i * 200 + 1000
    })
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
        <h2 ref="heading">react-flip-toolkit and animeJS</h2>
        {colors.map(({ color, active }) => (
          <div className="btn-container" key={color} ref={`${color}-btn`}>
            <button
              className={`btn ${active ? 'selected' : ''}`}
              onClick={() => handleColorClick(color)}>
              {color}
            </button>
          </div>
        ))}
        <div className="reset">
          <div className="btn-container" ref="all-colors-btn">
            <button className={`btn ${this.state.all ? 'selected' : ''}`} onClick={handleReset}>
              all colors
            </button>
          </div>
          <div className="btn-container" ref="shuffle-btn">
            <button className="btn" onClick={shuffleBoxes}>
              Shuffle
            </button>
          </div>
        </div>
      </header>
    )
  }
}

export default Controls
