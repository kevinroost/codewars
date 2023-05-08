"use strict";
const convertFrac = (lst) => {
    //function to simplify a touple
    function simplify(touple) {
        for (let i = touple[1] - 1; i > 1; i--) {
            if ((touple[0] % i == 0) && (touple[1] % i == 0))
                touple = [(touple[0] / i), (touple[1] / i)];
        }
        return touple;
    }
    // simplify each touple
    for (let j = 0; j < lst.length; j++) {
        lst[j] = simplify(lst[j]);
    }
    // create array of the denominators
    const arrOfDenoms = [];
    lst.forEach(touple => {
        arrOfDenoms.push(touple[1]);
    });
    // find lowest common multiple
    const lcm = (...arr) => {
        const gcd = (x, y) => (!y ? x : gcd(y, x % y));
        const _lcm = (x, y) => (x * y) / gcd(x, y);
        return [...arr].reduce((a, b) => _lcm(a, b));
    };
    //set each touple to new denominator
    for (let j = 0; j < lst.length; j++) {
        lst[j] = [lcm(...arrOfDenoms) / lst[j][1] * lst[j][0], lcm(...arrOfDenoms)];
    }
    //convert a touple to a string
    function toupleStr(touple) {
        return `(${touple[0].toString()},${touple[1].toString()})`;
    }
    return lst.map(touple => toupleStr(touple)).join('');
};
function isValidWalk(walk) {
    if (walk.length !== 10)
        return false;
    let nCount = 0;
    let wCount = 0;
    let eCount = 0;
    let sCount = 0;
    walk.forEach(walk => {
        switch (walk) {
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
                break;
        }
    });
    if ((nCount === sCount) && (wCount === eCount))
        return true;
    return false;
}
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
function createPhoneNumber(numbers) {
    let firstThree = numbers.slice(0, 3).join('');
    let secondThree = numbers.slice(3, 6).join('');
    let lastFour = numbers.slice(6).join('');
    return `(${firstThree}) ${secondThree}-${lastFour}`;
}
