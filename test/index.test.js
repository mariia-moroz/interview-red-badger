const assert = require("assert");
const { Robot, failedInstructions, solve } = require("../index");

describe("Martian Robots", function () {
  beforeEach(function () {
    failedInstructions.clear();
  });

  it("produces the sample output", function () {
    const input = `5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL`;

    const output = solve(input);

    assert.strictEqual(output, "1 1 E\n3 3 N LOST\n2 3 S");
  });

  it("turns left and right correctly", function () {
    const robot = new Robot(1, 1, "N");

    robot.turnLeft();
    assert.strictEqual(robot.getOrientation(), "W");

    robot.turnRight();
    robot.turnRight();
    assert.strictEqual(robot.getOrientation(), "E");
  });

  it("ignores a repeated dangerous move from the same position and orientation", function () {
    const firstRobot = new Robot(3, 3, "N");
    const secondRobot = new Robot(3, 3, "N");

    assert.strictEqual(firstRobot.followInstructions(5, 3, "F"), "3 3 N LOST");
    assert.strictEqual(secondRobot.followInstructions(5, 3, "F"), "3 3 N");
  });
});
