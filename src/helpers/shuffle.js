const shuffle = arry => {
  arry.forEach((x, i) => {
    let rnd = Math.floor(Math.random() * arry.length),
      temp = arry[i]
    arry[i] = arry[rnd]
    arry[rnd] = temp
  })
  return arry
}

export default shuffle
