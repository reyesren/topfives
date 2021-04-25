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
  
  module.exports = {
    InMemoryFollowersStore,
  };
  