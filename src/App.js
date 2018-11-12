import React, { Component } from 'react'
import './App.css'
import { Flipper, Flipped } from 'react-flip-toolkit'

import Controls from './Controls'

import createBoxes from './helpers/createBoxes'
import shuffle from './helpers/shuffle'

const appear = (element, index) => {
  let op = 0
  let interval = setInterval(() => {
    element.style.opacity = op
    op >= 0.9 ? clearInterval(interval) : (op += 0.1)
  }, 30)
}

const exit = (element, index, removeElement) => {
  let op = 1
  let interval = setInterval(() => {
    element.style.opacity = op
    if (op <= 0) {
      clearInterval(interval)
      removeElement()
    } else {
      op -= 0.1
    }
  }, 30)
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
