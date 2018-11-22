import React from 'react'
import posed from 'react-pose'

const PoseBox = posed.div({
  hoverable: true,
  init: { scale: 1, boxShadow: '0 2px 12px 4px rgba(0, 0, 0, 0.1)' },
  hover: {
    scale: 1.1,
    boxShadow: '0 2px 12px 4px rgba(0, 0, 0, 0.3)',
    transiton: { duration: 100 }
  }
})

const Box = ({ color, id, deleteBox, number }) => {
  return (
    <div className="box-container">
      <PoseBox className="box" style={{ background: color }} onClick={() => deleteBox(id)}>
        {number}
      </PoseBox>
    </div>
  )
}

export default Box
