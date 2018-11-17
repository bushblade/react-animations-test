import React, { Component } from 'react'
import './App.css'

import Box from './Box'
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
    this.setState(({ boxes }) => ({
      filtered: boxes.filter(box => box.color === color)
    }))
  }

  shuffleBoxes = () => {
    this.setState(({ filtered }) => ({ filtered: shuffle(filtered) }))
  }

  componentDidMount() {
    const initArrays = createBoxes()
    this.setState(() => {
      return { boxes: initArrays, filtered: initArrays }
    })
  }

  render() {
    const {
      filterBy,
      resetColors,
      shuffleBoxes,
      deleteBox,
      state: { filtered }
    } = this
    return (
      <div className="App">
        <Controls filter={filterBy} reset={resetColors} shuffleBoxes={shuffleBoxes} />
        <div className="container">
          <div className="boxes-wrapper">
            {filtered.map(({ id, color, number }) => (
              <Box key={id} color={color} id={id} deleteBox={deleteBox} number={number} dragable />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default App
