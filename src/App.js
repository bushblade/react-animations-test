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
  exit: { opacity: 0 },
  flip: {
    transition: ({ fDelay }) => ({
      type: 'spring',
      delay: fDelay,
      stiffness: 90,
      damping: 15,
      mass: 0.9
    })
  }
})

class App extends Component {
  state = {
    boxes: [],
    filtered: [],
    fDelay: 0
  }

  deleteBox = id => {
    this.setState(({ filtered }) => ({
      filtered: filtered.filter(box => box.id !== id),
      fDelay: 300
    }))
  }

  allColors = () => this.setState({ filtered: this.state.boxes, fDelay: 300 })

  sortBoxes = () =>
    this.setState(({ filtered }) => ({
      filtered: filtered.sort((a, b) => a.number - b.number),
      fDelay: 0
    }))

  filterBy = color => {
    this.setState(({ boxes }) => ({
      filtered: boxes.filter(box => box.color === color),
      fDelay: 300
    }))
  }

  shuffleBoxes = () => {
    this.setState(({ filtered }) => ({ filtered: shuffle(filtered), fDelay: 0 }))
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
      allColors,
      shuffleBoxes,
      deleteBox,
      sortBoxes,
      state: { filtered, fDelay }
    } = this
    return (
      <div className="App">
        <Controls
          filter={filterBy}
          all={allColors}
          shuffleBoxes={shuffleBoxes}
          sortBoxes={sortBoxes}
        />
        <div className="container">
          <div className="boxes-wrapper">
            <PoseGroup animateOnMount={true} preEnterPose={'preenter'}>
              {filtered.map(({ id, color, number }, i) => (
                <PoseBox key={id} i={i} fDelay={fDelay}>
                  <Box color={color} id={id} deleteBox={deleteBox} number={number} />
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
