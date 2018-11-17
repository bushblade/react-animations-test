import React from 'react'

const Box = ({ color, id, deleteBox, number }) => {
  return (
    <div className="box-container">
      <div className="box" style={{ background: color }} onClick={() => deleteBox(id)}>
        {number}
      </div>
    </div>
  )
}

export default Box
