import React from 'react'

const Box = ({ color, id, deleteBox }) => {
  return (
    <div className="box-container">
      <div className="box" style={{ background: color }} onClick={() => deleteBox(id)}>
        {' '}
      </div>
    </div>
  )
}

export default Box
