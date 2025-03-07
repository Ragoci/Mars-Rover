const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {


  it("Throws error a name is NOT passsed into the constructor as the first parameter", function() {
    expect( function() { new Message();}).toThrow(new Error('Message type required.'));
  });

  it("Constructor sets command type", function() {
    let command = new Command('STATUS_CHECK');
    expect(command.commandType).toEqual('STATUS_CHECK');
  });

  it("Contains a commands array passed into the constructor as 2nd argument", function() { 
    let commands = [new Command('STATUS_CHECK'), new Command('MOVE', 20)];
    let message = new Message('Another message!', commands);
    expect(message.commands).toEqual(commands);
     
  });


});