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
  
    findFollowDataForUser(userID) {
      return this.usersFollowData[userID];
    }
    allocateSpaceForUser(userID) {
      if (!this.usersFollowData.hasOwnProperty(userID)) this.usersFollowData[userID] = {following: [], followers: []};
    }
  }
  
  module.exports = {
    InMemoryFollowersStore,
  };
  