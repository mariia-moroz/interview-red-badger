# Martian Robots

Small Node.js solution for the Martian Robots problem. The focus here was to keep the implementation easy to read, easy to run, and easy for a cross-functional team to pick up quickly.

## Requirements

- Node.js
- npm

## Install

```bash
npm install
```

## Run

The app reads input from a file.

Use the default sample file:

```bash
node index.js
```

Use a specific input file:

```bash
node index.js sample-input.txt
```

Content of input file example:
```bash
5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL
```

## Test

```bash
npm test
```

## Approach

I approached this as a small, well-scoped coding task rather than a UI exercise. The goal was to solve the problem clearly, keep the logic easy to follow, and make it straightforward for someone else on the team to review, run, and discuss.

## Tech Choices

I used plain Node.js with no extra runtime dependencies because the task does not need a framework. Keeping everything in a single entry point makes the solution simple to understand, while separating the robot behaviour into a small class keeps the movement logic readable and testable.

Mocha is used for unit testing to cover the core behaviour: the sample scenario, turning logic, and the "scent" rule that prevents repeated losses. I wanted the tests to prove the important rules of the problem without adding unnecessary complexity.
