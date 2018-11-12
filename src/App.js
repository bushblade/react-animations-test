import React, { Component } from 'react'
import './App.css'
import { Transition, animated } from 'react-spring'

// components
import Box from './Box'
import Controls from './Controls'

// helpers
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
            <Transition
              native
              items={filtered}
              keys={item => item.id}
              unique={true}
              reset={true}
              from={{ opacity: 0, height: 0, width: 0 }}
              enter={{ opacity: 1, height: 'auto', width: 'auto' }}
              leave={{ opacity: 0 }}
              trail={10}>
              {item => props => (
                <animated.div style={{ ...props }}>
                  <Box color={item.color} id={item.id} deleteBox={deleteBox} />
                </animated.div>
              )}
            </Transition>
          </div>
        </div>
      </div>
    )
  }
}

export default App
