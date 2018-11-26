import React, { useState, useEffect } from 'react'
import posed from 'react-pose'

const Btn = posed.button({
  visible: { opacity: 1, transition: ({ del }) => ({ delay: del * 100 }) },
  hidden: { opacity: 0 },
  hoverable: true,
  pressable: true,
  init: {
    scale: 1,
    boxShadow: '0 2px 12px 4px rgba(0, 0, 0, 0.12)'
  },
  hover: {
    scale: 1.08,
    transition: { duration: 200 },
    boxShadow: '0 2px 12px 4px rgba(0, 0, 0, 0.3)'
  },
  press: {
    scale: 1.05,
    transition: { duration: 200 },
    boxShadow: '0 2px 12px 4px rgba(0, 0, 0, 0.2)'
  }
})

const Heading = posed.h2({
  visible: { opacity: 1, transition: { delay: 700 }, pose: true },
  hidden: { opacity: 0 }
})

const initColors = [
  { color: 'paleturquoise', active: false },
  { color: 'aquamarine', active: false },
  { color: 'turquoise', active: false },
  { color: 'lightseagreen', active: false }
]

function Controls({ shuffleBoxes, sortBoxes, filterBy, allBoxes }) {
  const [colors, setColors] = useState(initColors)

  const [allColors, setAllColors] = useState(true)

  const [mounted, setMounted] = useState(false)

  const handleColorClick = color => {
    filterBy(color)
    setColors(
      colors.map(col => {
        return col.color === color
          ? { color: col.color, active: true }
          : { color: col.color, active: false }
      })
    )
    setAllColors(false)
  }

  const handleReset = () => {
    allBoxes()
    setColors(colors.map(({ color }) => ({ color, active: false })))
    setAllColors(true)
  }

  // second argument in useEffect important to limit re-render
  useEffect(() => setMounted(true), [mounted])

  const colorButtons = colors.map(({ color, active }, i) => {
    return (
      <Btn
        del={i + 1}
        pose={mounted ? 'visible' : 'hidden'}
        className={`btn ${active ? 'selected' : ''}`}
        key={color}
        onClick={() => handleColorClick(color)}>
        {color}
      </Btn>
    )
  })

  return (
    <header className="controls">
      <Heading pose={mounted ? 'visible' : 'hidden'}>react-pose</Heading>
      {colorButtons}
      <div className="reset">
        <Btn
          del={5}
          pose={mounted ? 'visible' : 'hidden'}
          className={`btn ${allColors ? 'selected' : ''}`}
          onClick={handleReset}>
          all colors
        </Btn>
        <Btn del={6} pose={mounted ? 'visible' : 'hidden'} className="btn" onClick={shuffleBoxes}>
          Shuffle
        </Btn>
        <Btn del={7} pose={mounted ? 'visible' : 'hidden'} className="btn" onClick={sortBoxes}>
          Sort
        </Btn>
      </div>
    </header>
  )
}

export default Controls
