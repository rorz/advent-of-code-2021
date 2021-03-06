import { AnswerCollection } from "../types";
import { parseInput } from "../utils";

const input = parseInput(__filename).map((figure) => +figure);

const getTimesIncreased = (list: number[]) =>
  list.filter((figure, index, arr) => {
    if (index === 0) return false;
    
    let previousFigure = arr[index - 1] as number;
    if (figure > previousFigure) return true;
    return false;
  }).length;

const part1 = () => {
  return getTimesIncreased(input);
};

const part2 = () => {
  const windows = input.reduce((tally: number[], figure, index, arr) => {
    if (arr[index + 1] == null || arr[index + 2] == null) return tally;

    return [
      ...tally,
      figure + (arr[index + 1] as number) + (arr[index + 2] as number),
    ];
  }, []);
  return getTimesIncreased(windows);
};

const answers: AnswerCollection = {
  part1,
  part2,
};

export default answers;
