
const convertFrac = (lst: [number, number][]): string => {

  //function to simplify a touple
  function simplify (touple: [number, number]): [number, number] {
    for (let i = touple[1] - 1; i > 1; i--) {
      if ((touple[0]%i==0) && (touple[1]%i==0)) 
      touple = [(touple[0] / i), (touple[1] / i)]
    }
    return touple
  }

  // simplify each touple
  for (let j = 0; j < lst.length; j++) {
    lst[j] = simplify(lst[j])
  }
  
  // create array of the denominators
  const arrOfDenoms: number[] = []
  lst.forEach(touple => {
    arrOfDenoms.push(touple[1])
  })
  
  // find lowest common multiple
  const lcm = (...arr: number[]): number => {
    const gcd = (x: number, y: number): number => (!y ? x : gcd(y, x % y));
    const _lcm = (x: number, y: number): number => (x * y) / gcd(x, y);
    return [...arr].reduce((a, b) => _lcm(a, b));
  };
  
  //set each touple to new denominator
  for (let j = 0; j < lst.length; j++) {
    lst[j] = [lcm(...arrOfDenoms)/lst[j][1]*lst[j][0], lcm(...arrOfDenoms)]
  }

  //convert a touple to a string
  function toupleStr(touple: [number, number]): string {
    return `(${touple[0].toString()},${touple[1].toString()})`
  }
  
  return lst.map(touple => toupleStr(touple)).join('')
}

function isValidWalk(walk: string[]):boolean {
  if (walk.length !== 10) return false

  let nCount:number = 0
  let wCount:number = 0
  let eCount:number = 0
  let sCount:number = 0

  walk.forEach(walk => {
    switch(walk) {
      case 'n':
        nCount++;
        break;
      case 'w':
        wCount++;
        break;
      case 'e':
        eCount++;
        break;
      case 's':
        sCount++;
        break
    }
  })
  
  if ((nCount === sCount) && (wCount === eCount)) return true
  return false
}

const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

function createPhoneNumber(numbers: number[]): string {
  let firstThree: string = numbers.slice(0,3).join('')
  let secondThree: string = numbers.slice(3,6).join('')
  let lastFour: string = numbers.slice(6).join('')
  return `(${firstThree}) ${secondThree}-${lastFour}`
}

const josephus = <T>(items: T[], k: number): T[] => {
  const result: T[] = []
  let targetIndex:number = k - 1

  function counter() {

    for (let i = 1; i < k; i++) {
      if (targetIndex === items.length-1) {
        targetIndex = 0
      } else if (targetIndex >= items.length) {
        targetIndex = 1
      } else targetIndex++
    }
  }

  while (items.length > 1) {
    result.push(...items.splice(targetIndex,1))
    counter()
  }

  result.push(...items.splice(0,1))

  return result;
};

function findEvenIndex(arr: number[]): number{
  let n = -1
  for (let i = 0; i < arr.length; i++) {
    const leftSum = arr.slice(0, i).reduce((prev, next) => prev + next, 0)
    const rightSum = arr.slice(i+1).reduce((prev, next) => prev + next, 0)
    
    if (leftSum === rightSum) {
        n=i
        break
      }
  }
  return n
}


function josephusSurvivor(n: number, k: number): number {

  const items: number[] = []

  for (let i = 1; i <= n; i++) {
    items.push(i)
  }

  let targetIndex:number = k - 1

  function counter() {

    for (let i = 1; i < k; i++) {
      if (targetIndex === items.length-1) {
        targetIndex = 0
      } else if (targetIndex >= items.length) {
        targetIndex = 1
      } else targetIndex++
    }
  }

  while (items.length > 1) {
    items.splice(targetIndex,1)
    counter()
  }

  return items[0];
};


class Vector {
  arrayA: number[]
  constructor(a: number[]) {
    this.arrayA = a
  }
  compare(arrayB: Vector) {
    if (this.arrayA.length !== arrayB.arrayA.length) throw new Error('Vectors are not of equal length')
  }
  equals(arrayB: Vector) {
    // this.compare(arrayB)
    for (let i = 0; i < this.arrayA.length; i++) {
      if (this.arrayA[i] !== arrayB.arrayA[i]) return false
    }
    return true
  }
  add(arrayB: Vector): Vector {
    this.compare(arrayB)
    let result: number[] = []
    for (let i = 0; i < this.arrayA.length; i++) {
      result.push(this.arrayA[i] + arrayB.arrayA[i])
    }
    return new Vector(result)
  }
  subtract(arrayB: Vector): Vector {
    this.compare(arrayB)
    let result: number[] = []
    for (let i = 0; i < this.arrayA.length; i++) {
      result.push(this.arrayA[i] - arrayB.arrayA[i])
    }
    return new Vector(result)
  }
  dot(arrayB: Vector): number {
    this.compare(arrayB)
    let result: number = 0
    for (let i = 0; i < this.arrayA.length; i++) {
      result += (this.arrayA[i] * arrayB.arrayA[i])
    }
    return result
  }
  norm(): number {
    let result: number = 0
    for (let i = 0; i < this.arrayA.length; i++) {
      result += (this.arrayA[i] ** 2)
    }
    return Math.sqrt(result)
  }
  toString(): string {
    return `(${this.arrayA.join(',')})`
  }
}
