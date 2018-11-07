import React, { Component } from 'react'
import './App.css'
import uuid from 'uuid'

import Box from './Box'
import Controls from './Controls'

const colors = 'paleturquoise,aquamarine,turquoise,lightseagreen'.split(',')

function createBoxes() {
  const rndIndx = len => Math.floor(Math.random() * len)
  return Array(40)
    .fill(0)
    .map((x, i) => ({ id: uuid(), color: colors[rndIndx(colors.length)] }))
}

class App extends Component {
  state = {
    boxes: [],
    filtered: []
  }

  componentDidMount() {
    const initArrays = createBoxes()
    this.setState({ boxes: initArrays, filtered: initArrays })
  }

  resetColors = () => this.setState({ filtered: this.state.boxes })

  filterBy = color => {
    this.setState(({ boxes }) => ({ filtered: boxes.filter(box => box.color === color) }))
  }

  render() {
    return (
      <div className="App">
        <Controls colors={colors} filter={this.filterBy} reset={this.resetColors} />
        <div className="container">
          <div className="boxes-wrapper">
            {this.state.filtered.map(({ id, color }) => (
              <Box key={id} color={color} id={id} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default App
