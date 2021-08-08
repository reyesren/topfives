/* abstract */ class FollowersStore {
    follow(message) {}
    findFollowDataForUser(userID) {}
    allocateSpaceForUser(userID) {}
  }
  
  class InMemoryFollowersStore extends FollowersStore {
    constructor() {
      super();
      this.usersFollowData = {};
    }
  
    follow(data) {
      this.usersFollowData[data.to]["followers"].push(data.from);
      this.usersFollowData[data.from]["following"].push(data.to);
    }
    unfollow(self, usernameToUnfollow) {
      let index1 = this.usersFollowData[self]["following"].indexOf(usernameToUnfollow);
      let index2 = this.usersFollowData[usernameToUnfollow]["followers"].indexOf(self);
      if (index1 > -1) {
        this.usersFollowData[self]["following"].splice(index1, 1);
      }
      if(index2 > - 1) {
        this.usersFollowData[usernameToUnfollow]["followers"].splice(index2, 1);
      }
    }
  
    findFollowDataForUser(userID) {
      return this.usersFollowData[userID];
    }
    allocateSpaceForUser(userID) {
      if (!this.usersFollowData.hasOwnProperty(userID)) this.usersFollowData[userID] = {following: [], followers: []};
    }
  }

  const FOLLOWER_TTL = 24 * 60 * 60;
  class RedisFollowerStore extends FollowersStore {
    constructor(redisClient) {
      super();
      this.redisClient = redisClient;
    }
    follow(data) {
      this.redisClient
        .multi()
        .rpush(`followers:${data.to}`, data.from)
        .rpush(`following:${data.from}`, data.to)
        .expire(`followers:${data.to}`, FOLLOWER_TTL)
        .expire(`following:${data.from}`, FOLLOWER_TTL)
        .exec();
    }
    unfollow(self, usernameToUnfollow) {
      this.redisClient
        .multi()
        .lrem(`followers:${usernameToUnfollow}`, 1, self)
        .lrem(`following:${self}`, 1, usernameToUnfollow)
        .exec()
    }
    async findFollowDataForUser(userID) {
      const followers = await this.redisClient
        .lrange(`followers:${userID}`, 0, -1)
        .then((results) => {
         return results
        });
      const following = await this.redisClient
      .lrange(`following:${userID}`, 0, -1)
      .then((results) => {
       return results
      });
      return {followers, following}
    }
  }
  
  module.exports = {
    InMemoryFollowersStore,
    RedisFollowerStore
  };
  