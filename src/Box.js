import React, { Fragment, Component } from 'react'

import DropZone from './DropZone'

class Box extends Component {
  render() {
    const { color, id, deleteBox, number, dragBox } = this.props
    return (
      <Fragment>
        <div
          className="box-container"
          draggable
          onDragStart={() => {
            dragBox({ color, id, number })
          }}>
          <div className="box" style={{ background: color }} onClick={() => deleteBox(id)}>
            {number}
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Box
