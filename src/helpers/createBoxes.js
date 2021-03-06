import uuid from 'uuid'

const colors = 'paleturquoise,aquamarine,turquoise,lightseagreen'.split(',')

function createBoxes() {
  const rndIndx = len => Math.floor(Math.random() * len)
  return Array(40)
    .fill(0)
    .map((x, i) => ({ id: uuid(), color: colors[rndIndx(colors.length)], number: (i += 1) }))
}

export default createBoxes
