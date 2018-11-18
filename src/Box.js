import React, { Component } from 'react'

class Box extends Component {
  render() {
    const { color, id, deleteBox, number, dragBox, draggingBox, dropBefore, dropAfter } = this.props
    return (
      <div
        className="box-container"
        draggable
        onDragStart={() => {
          dragBox({ color, id, number })
        }}>
        <div className="box" style={{ background: color }} onClick={() => deleteBox(id)}>
          {number}
        </div>
        <div className="drop-zone">
          <div
            className="zone-a"
            onDragOver={e => e.preventDefault()}
            onDrop={e => {
              e.preventDefault()
              dropBefore(id)
            }}
          />
          <div
            className="zone-b"
            onDragOver={e => e.preventDefault()}
            onDrop={e => {
              e.preventDefault()
              dropAfter(id)
            }}
          />
        </div>
      </div>
    )
  }
}

export default Box
