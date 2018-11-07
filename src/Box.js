import React from 'react'

const Box = ({ color, id, deleteBox }) => {
  return (
    <div className="box" style={{ background: color }} onClick={() => deleteBox(id)}>
      {' '}
    </div>
  )
}

export default Box
