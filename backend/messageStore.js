/* abstract */ class MessageStore {
  saveMessage(message) {}
  findMessagesForUser(userID) {}
}

class InMemoryMessageStore extends MessageStore {
  constructor() {
    super();
    this.messages = [];
  }

  saveMessage(message) {
    this.messages.push(message);
  }

  findMessagesForUser(userID) {
    return this.messages.filter(({ from, to }) => to === userID);
  }
  seenAllMessages(userID) {
    this.messages.forEach((message) => {
      if (message.to === userID) {
        message.hasSeen = true;
      }
    });
  }
}

module.exports = {
  InMemoryMessageStore,
};
