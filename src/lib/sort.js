const findLower = friend => {
  return friend.positions.reduce((current, { from }) => (current < from ? current : from), 100000);
};

const sort = friends => {
  return friends.sort((prev, curr) => findLower(prev) - findLower(curr));
};

module.exports = sort;
