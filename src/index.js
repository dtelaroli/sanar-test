const { sort } = require("./lib");

let cachedUser;
const fetch = async () => {
  try {
    cachedUser = await this.fetchCurrentUser();
  } catch (e) {}
  return cachedUser;
}

const query = async (search) => {
  const user = await fetch();
  const friends = [];

  if (user && user.friends) {
    user.friends.forEach(friend => {
      if (friend.id && friend.name) {
        const nameSplit = friend.name.split(/\s/);
        const nameLower = friend.name.toLowerCase();
        const searchLower = search.toLowerCase();

        const positions = [];
        nameSplit.forEach(word => {
          const wordLower = word.toLowerCase();
          const index = wordLower.indexOf(searchLower);
          if (index > -1) {
            const wordOffset = nameLower.indexOf(wordLower);
            const from = wordLower.indexOf(searchLower);
            const to = from + searchLower.length;

            positions.push({
              wordOffset,
              from,
              to
            });
          }
        });

        if (positions.length > 0) {
          friends.push({
            friendId: friend.id,
            positions
          });
        }
      }
    });
  }

  return Promise.resolve(sort(friends));
}

export { query };
