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
    draggingBox: null
  }

  dragBox = box => {
    this.deleteBox(box.id)
    this.setState(({ filtered }) => {
      return { draggingBox: box }
    })
  }

  dropBefore = targetId => {
    const { draggingBox, filtered } = this.state
    let indexOfTarget
    this.state.filtered.forEach(({ id }, i) => {
      if (id === targetId) indexOfTarget = i
    })
    const newFiltered = [...filtered]
    newFiltered.splice(indexOfTarget, 0, draggingBox)
    this.setState(() => {
      return {
        filtered: newFiltered
      }
    })
  }

  dropAfter = targetId => {
    const { draggingBox, filtered } = this.state
    let indexOfTarget
    this.state.filtered.forEach(({ id }, i) => {
      if (id === targetId) indexOfTarget = i += 1
    })
    const newFiltered = [...filtered]
    newFiltered.splice(indexOfTarget, 0, draggingBox)
    this.setState(() => {
      return {
        filtered: newFiltered
      }
    })
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
      dropBefore,
      dropAfter,
      state: { filtered, draggingBox }
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
                    draggingBox={draggingBox}
                    dropBefore={dropBefore}
                    dropAfter={dropAfter}
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
