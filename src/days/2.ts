import { AnswerCollection } from "../types";
import { parseInput } from "../utils";

const instructions: [string, number][] = parseInput(__filename).map(
  (instruction) => {
    const [direction, amount] = instruction.split(" ");
    if (!direction || !amount) throw new Error("Direction or amount undefined");
    return [direction, +amount];
  }
);

const part1 = () => {
  const [horizontal, depth] = instructions.reduce(
    ([currentHorizontal, currentDepth], [direction, amount]) => [
      currentHorizontal + (direction === "forward" ? amount : 0),
      currentDepth +
        (direction === "up" ? -amount : direction === "down" ? amount : 0),
    ],
    [0, 0]
  );
  return horizontal * depth;
};

const part2 = () => {
  const [horizontal, depth] = instructions.reduce(
    ([currentHorizontal, currentDepth, aim], [instruction, amount]) => [
      currentHorizontal + (instruction === "forward" ? amount : 0),
      currentDepth + (instruction === "forward" ? amount * aim : 0),
      aim +
        (instruction === "up" ? -amount : instruction === "down" ? amount : 0),
    ],
    [0, 0, 0]
  );
  return horizontal * depth;
};

const answers: AnswerCollection = {
  part1,
  part2,
};

export default answers;
