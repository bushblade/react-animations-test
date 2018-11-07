import React from 'react'

const Box = ({ color }) => {
  return (
    <div className="box-container">
      <div className="box" style={{ background: color }}>
        {' '}
      </div>
    </div>
  )
}

export default Box
