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

const user = new User()

console.log(user);
user.rankIndex = 15

console.log(user.rankIndex);
console.log(user.rank);
user.incProgress(8)
user.incProgress(8)
user.incProgress(8)

console.log(user);