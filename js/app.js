function rgb(r, g, b){
  const hexArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']

  if (r < 0) {r=0}
  if (g < 0) {g=0}
  if (b < 0) {b=0}
  if (r > 255) {r=255}
  if (g > 255) {g=255}
  if (b > 255) {b=255}

  
  let rFirst = hexArr[Math.floor(r/16)]
  let rSecond = hexArr[Math.floor(r%16)]
  
  let gFirst = hexArr[Math.floor(g/16)]
  let gSecond = hexArr[Math.floor(g%16)]
  
  let bFirst = hexArr[Math.floor(b/16)]
  let bSecond = hexArr[Math.floor(b%16)]

  console.log(rFirst, rSecond);
  console.log(gFirst, gSecond);
  console.log(bFirst, bSecond);

  return [rFirst, rSecond, gFirst, gSecond, bFirst, bSecond].join('')

}

class User {
  possibleRank = [-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8]
  rankIndex = 0
  progress = 0

  get rank() {
    return this.possibleRank[this.rankIndex]
  }
  
  checkProgress() {
    if (this.rank === 8) {
      this.progress = 0 
      return
    } 
    if (this.progress >= 100) {
      this.rankIndex++
      this.progress = this.progress - 100
    } else return
    this.checkProgress()
  }
  
  incProgress(difficulty) {
    if(!this.possibleRank.includes(difficulty)) throw new Error('invalid activity rank')
    if (this.rank === 8) return
    if (difficulty > this.rank) {
      this.progress += (10 * (this.possibleRank.indexOf(difficulty) - this.rankIndex) * (this.possibleRank.indexOf(difficulty) - this.rankIndex))
      this.checkProgress()
    } else if (difficulty === this.rank) {
      this.progress += 3
      this.checkProgress()
    } else if (this.possibleRank.indexOf(difficulty) === (this.rankIndex - 1)) {
      this.progress += 1
      this.checkProgress()
    } else return
  }

}

function validateBattlefield(field) {
  let count = 0
  let battleship = 0
  let cruiser = 0
  let destroyer = 0
  let submarine = 0

  const checkTally = ()=> {
    if (
      (battleship !== 1) ||
      (cruiser !== 2) ||
      (destroyer !== 3) ||
      (submarine !== 4)
    ) {return false} else return true
  }

  const submitCount = () => {
    if (count === 4) {battleship++}
    if (count === 3) {cruiser++}
    if (count === 2) {destroyer++}
    if (count === 1) {submarine++}
    count = 0
  }

  function tallySquareHorizontal(i, k) {
    field[i][k+count] = -1
    count++
    if (field[i][k + count] === 1) {
      tallySquareHorizontal(i, k)
    } else {
      submitCount()
    }
  }

  function tallySquareVertical(i, k) {
    field[i+count][k] = -1
    count++
    if (field[i+count][k] === 1) {
      tallySquareVertical(i, k)
    } else {
      submitCount()
    }
  }

  for (let i = 1; i < 9; i++) {

    for (let k = 1; k < 9; k++){
      
      let contactShips = 0

      if (
        (field[i][k] === 1)
      ) {
        if (field[i+1] && field[i + 1][k] === 1) contactShips++
        if (field[i+1] && field[i + 1][k + 1] === 1) contactShips++
        if (field[i+1] && field[i + 1][k - 1] === 1) contactShips++
        if (field[i][k + 1] === 1) contactShips++
      }

      if (contactShips > 1) return false

      if (
        field[i][k] === 1 &&
        field[i+1][k] !== 1 &&
        field[i-1][k] !== 1
      ) {
        tallySquareHorizontal(i, k)
      } else if (
      field[i][k] === 1 &&
      field[i][k+1] !== 1 &&
      field[i][k-1] !== 1
      ) {
        tallySquareVertical(i, k)
      }

    }
  }

  for (let k = 0; k < 10; k++){
    if (
      field[0][k] === 1 &&
      field[1][k] !== 1
    ) {
      tallySquareHorizontal(0, k)
    }
    if (
      field[9][k] === 1 &&
      field[8][k] !== 1
    ) {
      tallySquareHorizontal(9, k)
    }
  }

  for (let i = 0; i < 8; i++) {
    if (
      field[i][0] === 1 &&
      field[i][1] !== 1
    ) {
      tallySquareVertical(i, 0)
    }
    if (
      field[i][9] === 1 &&
      field[i][8] !== 1
    ) {
      tallySquareVertical(i, 9)
    }
  }
  return checkTally()
}

function isInteresting(number, awesomePhrases) {

  function allZeros(array) {
    if (array.slice(1).every(x => x === 0)) {
      console.log(array.slice(1, -1));
      return true
    } else return false
  }

  function sameDigit(array) {
    return array.every(x => x === array[0])
  }

  function isIncrementing(array) {
    if (array.slice(0, -1).includes(0)) return false

    if ((array.slice(-2)[0] === 9) && (array.slice(-1)[0] === 0)) {
      return array.slice(0, -2).every(x => x === array[(array.indexOf(x))+1] - 1)
    }

    return array.slice(0, -1).every(x => x === array[(array.indexOf(x))+1] - 1)
  }
  
  function isDecrementing(array) {
    return array.slice(0, -1).every(x => x === array[(array.indexOf(x))+1] + 1)
  }

  function isPalindrome(array) {
    for (let i = 0; i <= Math.floor(array.length/2); i++) {
      if (array[i] !== array[array.length - i - 1]) return false
    }
    return true
  }
  function qualifies(num) {
    let numArr = num.toString().split('').map(x => parseInt(x))
    if (numArr.length < 3) return false
    if (awesomePhrases.includes(num) || allZeros(numArr) || sameDigit(numArr) || isIncrementing(numArr) || isDecrementing(numArr) || isPalindrome(numArr)) {
      return true
    } else return false
  }

  if (qualifies(number)) {
    return 2
  } else if (qualifies(number+1) || qualifies(number+2)) {
    return 1
  } else return 0

}