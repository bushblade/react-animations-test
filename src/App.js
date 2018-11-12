import React, { Component } from 'react'
import './App.css'
import { Flipper, Flipped } from 'react-flip-toolkit'

import Controls from './Controls'

import createBoxes from './helpers/createBoxes'
import shuffle from './helpers/shuffle'

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
          <Flipper className="boxes-wrapper" element="div" flipKey={keyString} spring="gentle">
            {filtered.map(({ id, color }) => (
              <Flipped key={id} flipId={id}>
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
