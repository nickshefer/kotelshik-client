export const normalizePrice = price => {
  let arr = String(price).split('').reverse();
  let ranks = [];
  let rank = '';
  for (let i = 1; i <= arr.length; i++) {
    if (i % 3 === 0) {
      rank += arr[i - 1];
      rank = rank.split('').reverse().join('');
      ranks.push(rank);
      rank = '';
    } else {
      rank += arr[i - 1];
    }
  }
  rank = rank.split('').reverse().join('');
  ranks.push(rank);
  return ranks.reverse().join(' ');
};
