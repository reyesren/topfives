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

module.exports = {
  InMemoryMessageStore,
};
