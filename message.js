class Message {
   constructor(name, commands){
     this.name = name;
     if (!name) {
       throw Error("Message type required.");
     }
     this.commands = commands;
  }
}

module.exports = Message;

// let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Comman('STATUS_CHECK')]
// let message = new Message('name', 'commands')


