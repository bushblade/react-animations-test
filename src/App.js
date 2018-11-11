import React, { Component } from 'react'
import posed, { PoseGroup } from 'react-pose'
import './App.css'
import uuid from 'uuid'

import Box from './Box'
import Controls from './Controls'

const colors = 'paleturquoise,aquamarine,turquoise,lightseagreen'.split(',')

const getRandomPosition = amount => {
  const sign = Math.round(Math.random() * 2) % 2 === 1 ? '-' : '+'
  return `${sign}${Math.random() * amount}px`
}

const PoseBox = posed.div({
  hoverable: true,
  init: { scale: 1 },
  hover: { scale: 0.9 },
  transition: {
    type: 'spring'
  },
  preenter: {
    // x: () => getRandomPosition(100),
    // y: () => getRandomPosition(100),
    opacity: 0
  },
  enter: { x: 0, y: 0, opacity: 1, delay: ({ i }) => i * 10 },
  exit: { opacity: 0 }
})

function createBoxes() {
  const rndIndx = len => Math.floor(Math.random() * len)
  return Array(40)
    .fill(0)
    .map((x, i) => ({ id: uuid(), color: colors[rndIndx(colors.length)] }))
}

const shuffle = arry => {
  arry.forEach((x, i) => {
    let rnd = Math.floor(Math.random() * arry.length),
      temp = arry[i]
    arry[i] = arry[rnd]
    arry[rnd] = temp
  })
  return arry
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
    this.setState(() => ({ boxes: initArrays, filtered: initArrays }))
    this.shuffleBoxes()
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
            <PoseGroup animateOnMount={true} preEnterPose={'preenter'}>
              {this.state.filtered.map(({ id, color }, i) => (
                <PoseBox key={id} i={i}>
                  <Box color={color} id={id} deleteBox={this.deleteBox} />
                </PoseBox>
              ))}
            </PoseGroup>
          </div>
        </div>
      </div>
    )
  }
}

export default App
