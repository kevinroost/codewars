
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


console.log(convertFrac([[1, 2], [4, 5], [3, 4], [6, 9], [7, 10]]));