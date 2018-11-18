import React from 'react'

const DropZone = ({ setDragMode }) => {
  return (
    <div
      className="drop-zone"
      onDragEnter={() => setDragMode(true)}
      onDragLeave={setDragMode(false)}
    />
  )
}

export default DropZone
