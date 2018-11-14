import React from 'react'
import { Flipped } from 'react-flip-toolkit'
import anime from 'animejs'

const appear = (element, index) => {
  anime({
    targets: element,
    opacity: [0, 1],
    // rotate: { value: '1turn', duration: 1000 },
    translateY: [-100, 0],
    delay: index * 20,
    duration: 500,
    // easing: 'easeOutSine',
    easing: 'easeOutElastic'
    // elasticity: 1000
  })
}

const exit = (element, index, removeElement) => {
  anime({
    transformOrigin: { value: '50% 50% 0', duration: 0 },
    targets: element,
    opacity: 0,
    duration: 500,
    rotate: '1turn',
    complete: removeElement,
    delay: index * 20,
    easing: 'easeOutSine'
  })
}

export default function Box({ id, deleteBox, color }) {
  return (
    <Flipped flipId={id} onAppear={appear} onExit={exit}>
      <div className="box-container">
        <div className="box" style={{ background: color }} onClick={() => deleteBox(id)}>
          {' '}
        </div>
      </div>
    </Flipped>
  )
}
