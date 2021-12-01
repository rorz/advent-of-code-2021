type Answer = string | number;

interface AnswerCollection {
  part1: () => Answer;
  part2: () => Answer;
}

export { Answer, AnswerCollection };
