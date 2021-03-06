const Cache = require("./cache");

/*
  recursive algorythm has the following structure:

  let n be number partitions of which we are trying to find
  let m be a maximum number used in partitions
  lep p(n, m) be a partitioning function that returns array of arrays
    e.g.
    p(3,1) = [[1,1,1]]
    p(3,3) = [[3], [2,1], [1,1,1]]

  "E" is a math operator invented by me =)
  x E y where x and y ara arrays means y.map(a => [x].concat(a))
    e.g.
    [2] E [[3,3],[1,1]] = [[2,3,3], [2,1,1]]
  "U" is another operator means "concat" two arrays
    e.g.
    [2] U [3,4] = [2,3,4]]

  for n>= 2m
    p(n,m) = m E p(n-m, m) U p(n, m-1)
  for n > m AND n < 2m
    p(n,m) = m E p(n-m, n-m) U p(n, m-1)
  for n = m
    p(n,m) = n U p(n, n-1)
  for m = 1
    p(n, 1) = [ [1,...,1] ] (1 repeated n times)

  //m E p(n-m, n-m) U p(n, m-1)
*/

function ones(numberOfOnes) {
  return Array.from({ length: numberOfOnes }, () => 1);
}

let cache = Cache.init();

//memory use can be optimized in two ways
//by assining number of occurences for particular number so [1,1,1,1,1] becomes[{1:5}] (1 five times)
//by re-using same arrays and objects (immutableJS?)
function p(n, m) {
  var cacheKey = n.toString() + m.toString(); //ineffective key creation

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  if (m === 1) {
    let result = [ones(n)];
    cache.set(cacheKey, result);
    return result;
  }

  //p(n,m) = n U p(n, n-1)
  if (n === m) {
    let result = [[n]].concat(p(n, n - 1));
    cache.set(cacheKey, result);
    return result; //n U p(n, n-1)
  }

  //p(n,m) = m E p(n-m, m) U p(n, m-1)
  if (n >= 2 * m) {
    let result = p(n - m, m)
      .map(x => [m].concat(x)) //m E p(n-m, m)
      .concat(p(n, m - 1)); //... U p(n, m-1)

    cache.set(cacheKey, result);
    return result;
  }

  //p(n,m) = m E p(n-m, n-m) U p(n, m-1)
  if (n > m && n < 2 * m) {
    let result = p(n - m, n - m)
      .map(x => [m].concat(x)) //m E p(n-m, n-m)
      .concat(p(n, m - 1)); //... U p(n, m-1)

    cache.set(cacheKey, result);
    return result;
  }
}

module.exports = number => p(number, number);
