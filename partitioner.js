function ones(numberOfOnes) {
  return Array.from({length: numberOfOnes}, () => 1);
}

function p(n,m) {
  if (m === 1) {
    return [ones(n)];
  }

  if (n === m) {
    return  [[n]].concat(p(n, n-1));
  }

  if (n >= 2*m) {
    return p(n-m, m).map(x => [m].concat(x))
      .concat(p(n, m-1));
  }

  if (n > m && n < 2*m) {
    //m E p(n-m, n-m) U p(n, m-1)
    return p(n-m, n-m).map(x =>[m].concat(x)) //m E p(n-m, n-m)
      .concat(p(n, m-1)); //... U p(n, m-1)
  }
}

export default (number) => {
  return p(number, number);
}
