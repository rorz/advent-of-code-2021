import fs from "fs";
import path from "path";
import { AnswerCollection } from "../types";

const parseInput = (filename: string, example?: boolean) => {
  const file = path.resolve(
    __dirname,
    `../../${example === true ? "examples" : "input"}`,
    `${path.basename(filename).split(".")[0] as string}.txt`
  );
  const data = fs.readFileSync(file, "utf-8");
  return data.split("\n");
};

const displayAnswer = (answers: AnswerCollection, part: number) => {
  if (part !== 1 && part !== 2) throw new Error("Part must be either 1 or 2");
  const startTime = new Date().getTime();
  const result = part === 1 ? answers.part1() : answers.part2();
  const endTime = new Date().getTime();
  console.log(`🎄 Answer: ${result}`);
  console.log(`✨ Solution took ${endTime - startTime} milliseconds.`);
};

export { parseInput, displayAnswer };
