/* abstract */ class MessageStore {
  saveMessage(message) {}
  findMessagesForUser(userID) {}
}

class InMemoryMessageStore extends MessageStore {
  constructor() {
    super();
    this.messages = {};
  }

  saveMessage(message) {
    this.messages[message.to].push(message);
  }

  findMessagesForUser(userID) {
    return this.messages[userID];
  }
  removeMessageForUser(userID, message) {
    let index = this.messages[userID].findIndex((msg) => msg.content === message);
    if (index > -1) {
      this.messages[userID].splice(index, 1);
    }
  }
  seenAllMessages(userID) {
    this.messages[userID].forEach((message) => {
      if (message.to === userID) {
        message.hasSeen = true;
      }
    });
  }
  allocateSpaceForUser(userID) {
    if (!this.messages.hasOwnProperty(userID)) this.messages[userID] = [];
  }
}

const CONVERSATION_TTL = 24 * 60 * 60;

class RedisMessageStore extends MessageStore {
  constructor(redisClient) {
    super();
    this.redisClient = redisClient;
  }

  saveMessage(message) {
    const value = JSON.stringify(message);
    this.redisClient
      .multi()
      .rpush(`messages:${message.to}`, value)
      .set(`newMessages:${message.to}`, true)
      .expire(`messages:${message.to}`, CONVERSATION_TTL)
      .exec();
  }

  findMessagesForUser(userID) {
    return this.redisClient
      .lrange(`messages:${userID}`, 0, -1)
      .then((results) => {
        return results.map((result) => JSON.parse(result));
      });
  }

  async seenAllMessages(userID) {
    const messages = await this.redisClient
      .lrange(`messages:${userID}`, 0, -1)
      .then((results) => {
        return results.map((result) => JSON.parse(result));
      })
      console.log(messages);
      const indexes = []
       messages.forEach((message, index) => {
         if(message.hasSeen === false) {
           indexes.push(index);
         }
       });
      indexes.forEach((index) => {
        messages[index].hasSeen = true;
        this.redisClient
          .lset(`messages:${userID}`, index, JSON.stringify(messages[index]))
      });

     return this.findMessagesForUser(userID);
  }
  
  async removeMessageForUser(userID, message) {

    const messages = await this.redisClient
    .lrange(`messages:${userID}`, 0, -1)
    .then((results) => {
      return results.map((result) => JSON.parse(result));
    })
    let index = messages.findIndex((msg) => msg.content === message);
    console.log(index);
    if (index > -1) {
      await this.redisClient
      .multi()
      .lset(`messages:${userID}`, index, "DELETE") // change the value at that index so it's easy to find&delete
      .lrem(`messages:${userID}`, 1, "DELETE")
      .exec()
    }
  }
}


module.exports = {
  InMemoryMessageStore,
  RedisMessageStore
};
