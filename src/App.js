import React, { Component } from 'react'
import './App.css'
import { Flipper, Flipped } from 'react-flip-toolkit'
import anime from 'animejs'

import Controls from './Controls'

import createBoxes from './helpers/createBoxes'
import shuffle from './helpers/shuffle'

const appear = (element, index) => {
  anime({
    targets: element,
    opacity: [0, 1],
    delay: index * 20,
    duration: 150,
    easing: 'easeOutSine'
  })
}

const exit = (element, index, removeElement) => {
  anime({
    targets: element,
    opacity: 0,
    duration: 150,
    complete: removeElement,
    delay: index * 20,
    easing: 'easeOutSine'
  })
}

class App extends Component {
  state = {
    boxes: [],
    filtered: []
  }

  deleteBox = id => {
    this.setState(({ filtered }) => ({
      filtered: filtered.filter(box => box.id !== id)
    }))
  }

  shuffleBoxes = () => {
    this.setState(({ filtered }) => ({ filtered: shuffle(filtered) }))
  }

  resetColors = () => this.setState({ filtered: this.state.boxes })

  filterBy = color => {
    this.setState(({ boxes }) => {
      return { filtered: boxes.filter(box => box.color === color) }
    })
  }

  componentDidMount() {
    const initArrays = createBoxes()
    this.setState({ boxes: initArrays, filtered: initArrays })
  }

  render() {
    const {
      filterBy,
      resetColors,
      shuffleBoxes,
      deleteBox,
      state: { filtered }
    } = this

    const keyString = filtered.map(({ id }) => id).join('')

    return (
      <div className="App">
        <Controls filter={filterBy} reset={resetColors} shuffleBoxes={shuffleBoxes} />
        <div className="container">
          <Flipper className="boxes-wrapper" element="div" flipKey={keyString} spring="stiff">
            {filtered.map(({ id, color }) => (
              <Flipped key={id} flipId={id} onAppear={appear} onExit={exit}>
                <div className="box-container">
                  <div className="box" style={{ background: color }} onClick={() => deleteBox(id)}>
                    {' '}
                  </div>
                </div>
              </Flipped>
            ))}
          </Flipper>
        </div>
      </div>
    )
  }
}

export default App
