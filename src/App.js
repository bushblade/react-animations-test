import React, { useState, useEffect } from 'react'
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

const App = () => {
  const initArrays = createBoxes()
  const [boxes, setBoxes] = useState(initArrays)
  const [filtered, setFiltered] = useState(initArrays)
  const [fDelay, setFdelay] = useState(0)

  const deleteBox = id => {
    setFiltered(filtered.filter(box => box.id !== id))
    setFdelay(300)
  }

  const allBoxes = () => {
    setFiltered(boxes)
    setFdelay(300)
  }

  const sortBoxes = () => {
    setFiltered(filtered.sort((a, b) => a.number - b.number))
    setFdelay(0)
  }

  const filterBy = color => {
    setFiltered(boxes.filter(box => box.color === color))
    setFdelay(300)
  }

  const shuffleBoxes = () => {
    setFiltered(shuffle(filtered))
    setFdelay(0)
  }

  // useEffect(() => {
  //   setFiltered(initArrays)
  //   setBoxes(initArrays)
  // })

  return (
    <div className="App">
      <Controls
        filterBy={filterBy}
        allBoxes={allBoxes}
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

export default App
