import React, { Component } from 'react'
import posed, { PoseGroup } from 'react-pose'
import './App.css'
import shuffle from './helpers/shuffle'
import createBoxes from './helpers/createBoxes'

import Box from './Box'
import Controls from './Controls'

const PoseBox = posed.div({
  preenter: {
    opacity: 0
  },
  enter: { opacity: 1, delay: ({ i }) => i * 5 },
  exit: { opacity: 0 }
})

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
            <PoseGroup animateOnMount={true} preEnterPose={'preenter'}>
              {filtered.map(({ id, color }, i) => (
                <PoseBox key={id} i={i}>
                  <Box color={color} id={id} deleteBox={deleteBox} />
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
