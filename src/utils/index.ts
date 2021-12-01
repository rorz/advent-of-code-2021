import fs from "fs";
import path from "path";
import { AnswerCollection } from "../types";

const parseInput = (directory: string) => {
  const file = path.resolve(
    __dirname,
    "../../input",
    path.basename(directory),
    "input.txt"
  );
  const data = fs.readFileSync(file, "utf-8");
  return data.split("\n");
};

const displayAnswer = (answers: AnswerCollection, part: number) => {
  if (part !== 1 && part !== 2) throw new Error("Part must be either 1 or 2");
  const result = part === 1 ? answers.part1() : answers.part2();
  console.log(`Answer: ${result}`);
};

export { parseInput, displayAnswer };
