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
    this.setState(({ boxes }) => ({ filtered: boxes.filter(box => box.color === color) }))
  }

  componentDidMount() {
    const initArrays = createBoxes()
    this.setState({ boxes: initArrays, filtered: initArrays })
  }

  render() {
    return (
      <div className="App">
        <Controls
          filter={this.filterBy}
          reset={this.resetColors}
          shuffleBoxes={this.shuffleBoxes}
        />
        <div className="container">
          <div className="boxes-wrapper">
            {this.state.filtered.map(({ id, color }) => (
              <Box key={id} color={color} id={id} deleteBox={this.deleteBox} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default App
