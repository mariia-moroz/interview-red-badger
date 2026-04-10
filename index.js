const fs = require("fs");
const ORIENTATIONS = ["N", "E", "S", "W"];

const INSTRUCTIONS = {
  RIGHT: "R",
  LEFT: "L",
  FORWARD: "F",
};

const failedInstructions = new Set();

class Robot {
  constructor(positionX, positionY, orientation, isLost = false) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.orientation = orientation;
    this.isLost = isLost;
  }

  getCoordinates() {
    return [this.positionX, this.positionY];
  }

  setCoordinates(positionX, positionY) {
    this.positionX = positionX;
    this.positionY = positionY;
  }

  getOrientation() {
    return this.orientation;
  }

  setOrientation(newOrientation) {
    this.orientation = newOrientation;
  }

  getCurrentPosition() {
    return `${this.getScentKey()}${this.isLost ? " LOST" : ""}`;
  }

  getScentKey() {
    return `${this.positionX} ${this.positionY} ${this.orientation}`;
  }

  turnRight() {
    const currentOrientationIndex = ORIENTATIONS.findIndex(
      orientation => orientation === this.orientation,
    );

    if (currentOrientationIndex < 0) {
      console.log("Unknown orientation type");
      return;
    }

    if (currentOrientationIndex < ORIENTATIONS.length - 1) {
      this.orientation = ORIENTATIONS[currentOrientationIndex + 1];
      return;
    }

    this.orientation = ORIENTATIONS[0];
  }

  turnLeft() {
    const currentOrientationIndex = ORIENTATIONS.findIndex(
      orientation => orientation === this.orientation,
    );

    if (currentOrientationIndex < 0) {
      console.log("Unknown orientation type");
      return;
    }

    if (currentOrientationIndex > 0) {
      this.orientation = ORIENTATIONS[currentOrientationIndex - 1];
      return;
    }

    this.orientation = ORIENTATIONS[ORIENTATIONS.length - 1];
  }

  moveForward(limitX, limitY) {
    let newCoordinateX;
    let newCoordinateY;

    switch (this.orientation) {
      case "N":
        newCoordinateX = this.positionX;
        newCoordinateY = this.positionY + 1;
        break;
      case "E":
        newCoordinateX = this.positionX + 1;
        newCoordinateY = this.positionY;
        break;
      case "S":
        newCoordinateX = this.positionX;
        newCoordinateY = this.positionY - 1;
        break;
      case "W":
        newCoordinateX = this.positionX - 1;
        newCoordinateY = this.positionY;
        break;
      default:
        console.log("Wrong orientation code");
        return;
    }

    if (
      newCoordinateX < 0 ||
      newCoordinateY < 0 ||
      newCoordinateX > limitX ||
      newCoordinateY > limitY
    ) {
      if (failedInstructions.has(this.getScentKey())) {
        return;
      }

      failedInstructions.add(this.getScentKey());
      this.isLost = true;
      return;
    }

    this.positionX = newCoordinateX;
    this.positionY = newCoordinateY;
  }

  followInstructions(limitX, limitY, instructions) {
    const instructionsArray = instructions.split("");

    for (const instruction of instructionsArray) {
      if (this.isLost) {
        break;
      }

      switch (instruction) {
        case INSTRUCTIONS.RIGHT:
          this.turnRight();
          break;
        case INSTRUCTIONS.LEFT:
          this.turnLeft();
          break;
        case INSTRUCTIONS.FORWARD:
          this.moveForward(limitX, limitY);
          break;
        default:
          console.log("Unknown instruction type");
          break;
      }
    }
    return this.getCurrentPosition();
  }
}

function parseInput(input) {
  const lines = input
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean);

  const [limitXText, limitYText] = lines[0].split(" ");
  const robots = [];

  for (let index = 1; index < lines.length; index += 2) {
    const [positionX, positionY, orientation] = lines[index].split(" ");
    const instructions = lines[index + 1];

    robots.push({
      robot: new Robot(Number(positionX), Number(positionY), orientation),
      instructions,
    });
  }

  return {
    limitX: Number(limitXText),
    limitY: Number(limitYText),
    robots,
  };
}

function solve(input) {
  failedInstructions.clear();

  const { limitX, limitY, robots } = parseInput(input);

  return robots
    .map(({ robot, instructions }) =>
      robot.followInstructions(limitX, limitY, instructions),
    )
    .join("\n");
}

function getInputFromFile(args, readFile = fs.readFileSync) {
  const inputFilePath = args[0] || "sample-input.txt";
  const fileContents = readFile(inputFilePath, "utf8");

  return fileContents.trim();
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const input = getInputFromFile(args);

  console.log(solve(input));
}

module.exports = {
  Robot,
  failedInstructions,
  getInputFromFile,
  solve,
};
