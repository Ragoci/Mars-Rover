const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!

it('constructor sets position and default values for mode and generatorWatts', function() {
  let rover = new Rover(98382);
  expect(rover.position).toEqual(98382);
  expect(rover.mode).toEqual('NORMAL');
  expect(rover.generatorWatts).toEqual(110);
});

it('response returned by receiveMessage contains name of message', function() {
  let commands = new Command('MOVE', 1000 );
  let message = new Message('Test message with two commands', commands);
  let rover = new Rover(message.commands.value); 
  let response = rover.receiveMessage(message);
  expect(response.message).toEqual('Test message with two commands');
});

it('response returned by receiveMessage includes two results if two commands are   sent in the message', function() {
  let commands = [new Command('MOVE', 2000 ), new Command('STATUS_CHECK')];
  let message = new Message('Test message with two commands', commands);
  let rover = new Rover(message.commands.value);   
  let response = rover.receiveMessage(message);
  expect (response.results.length).toEqual(2);
});

it("Responds correctly to a status check command", function() {
  let commands =  [new Command ('STATUS_CHECK')];
  let message = new Message('A new command!', commands);
  let rover = new Rover(4321);
  let response = rover.receiveMessage(message);
  expect(response.results.roverStatus).toBeTrue;
  expect(response.results[0].roverStatus.mode).toEqual('NORMAL');
  expect(response.results[0].roverStatus.position).toEqual(4321);
  expect(response.results[0].roverStatus.generatorWatts).toEqual(110);
  });

it('responds correctly to mode change command', function() {
  let commands = [new Command ('MOVE', 3000), new Command ('MODE_CHANGE', 'LOW_POWER')];
  let message = new Message('A new command!', commands);
  let rover = new Rover(message.commands.value);
  let response = rover.receiveMessage(message);
  expect(rover.position).toEqual(3000);
  expect(response.results[1].complete).toEqual('true');
  expect(rover.mode).toEqual('LOW_POWER');
});

it('responds with false completed value when attempting to move in LOW_POWER mode', function() {
  let commands = [new Command ('MOVE', 100), new Command ('MODE_CHANGE', 'LOW_POWER'), new Command ('MOVE', 500)];
  let message = new Message('A new command!', commands);
  let rover = new Rover(message.commands.value);
  let response = rover.receiveMessage(message);
  expect(response.results[2].complete).toEqual('false');
  expect(rover.position).toEqual(100);
});

it('responds with position for move command', function () {
  let commands = [new Command ('MOVE', 5000), new Command ('MOVE', 9000)];
  let message = new Message('A new command!', commands);
  let rover = new Rover(message.commands.value);
  let response = rover.receiveMessage(message);
  expect(rover.position).toEqual(9000);
});

});
