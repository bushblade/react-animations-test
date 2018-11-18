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
  flip: { transition: { type: 'spring', delay: 200, stiffness: 90, damping: 15, mass: 0.9 } },
  hoverable: true,
  init: { scale: 1 },
  hover: { scale: 1.1 }
})

class App extends Component {
  state = {
    boxes: [],
    filtered: [],
    dragBox: null,
    dragMode: false
  }

  dragBox = box => {
    console.log(box)
    this.setState({ dragBox: box, dragMode: true })
  }

  deleteBox = id => {
    this.setState(({ filtered }) => ({
      filtered: filtered.filter(box => box.id !== id)
    }))
  }

  allColors = () => this.setState({ filtered: this.state.boxes })

  sortBoxes = () =>
    this.setState(({ filtered }) => ({ filtered: filtered.sort((a, b) => a.number - b.number) }))

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
      allColors,
      shuffleBoxes,
      deleteBox,
      sortBoxes,
      dragBox,
      state: { filtered, dragMode }
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
                <PoseBox key={id} i={i}>
                  <Box
                    color={color}
                    id={id}
                    deleteBox={deleteBox}
                    number={number}
                    dragBox={dragBox}
                    dragMode={dragMode}
                  />
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
