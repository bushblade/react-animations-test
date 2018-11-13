import React from 'react'
import { Flipped } from 'react-flip-toolkit'
import anime from 'animejs'

const appear = (element, index) => {
  anime({
    targets: element,
    opacity: [0, 1],
    // rotate: [-359, 0],
    translateY: [-80, 0],
    delay: index * 20,
    duration: 300,
    // easing: 'easeOutSine',
    easing: 'easeOutElastic',
    elasciticity: 1000
  })
}

const exit = (element, index, removeElement) => {
  anime({
    transformOrigin: '0 0',
    targets: element,
    opacity: 0,
    duration: 200,
    // rotate: [0, -359],
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