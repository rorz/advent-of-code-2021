import { AnswerCollection } from "../types";
import { parseInput } from "../utils";

const bingoRaw = parseInput(__filename);

const drawnNumbers = bingoRaw
  .slice(0, 1)[0]
  ?.split(",")
  .map((n) => +n);

if (!drawnNumbers) throw new Error("Couldn't parse drawn numbers");

interface BoardTally {
  boards: string[][];
  currentBoard: string[];
}

type Board = {
  value: number;
  marked: boolean;
}[][];

let bingoBoards = [...bingoRaw, ""]
  .slice(2)
  .reduce(
    ({ boards, currentBoard }: BoardTally, line) => ({
      boards: !line ? [...boards, currentBoard] : boards,
      currentBoard: !line ? [] : [...currentBoard, line],
    }),
    { boards: [], currentBoard: [] }
  )
  .boards.map((board) =>
    board.map((line) =>
      line
        .split(" ")
        .filter((char) => char !== " " && char !== "")
        .map((char) => ({ value: +char, marked: false }))
    )
  );

// https://stackoverflow.com/a/40575135/1180964
const transpose = (matrix: Board) => {
  if (!matrix[0]) throw new Error("Can't transpose");
  return Object.keys(matrix[0]).map((col) => matrix.map((row) => row[+col]));
};

const unmarkedSum = (board: Board) =>
  board.reduce(
    (tally, line) =>
      tally +
      line.reduce(
        (innerTally, { value, marked }) => innerTally + (!marked ? value : 0),
        0
      ),

    0
  );

const computeWinner = (returnFirst: boolean): number => {
  const winningEntries: { index: number; number: number }[] = [];

  for (const number of drawnNumbers) {
    bingoBoards = bingoBoards.map((board) =>
      board.map((line) =>
        line.map(({ value, marked }) => ({
          value,
          marked: marked || value === number,
        }))
      )
    );
    for (const [index, board] of bingoBoards.entries()) {
      const rowMatch = board.filter((line) =>
        line.every(({ marked }) => !!marked)
      ).length;
      const inverseBoard = transpose(board);
      const colMatch = inverseBoard.filter((line) =>
        line.every((cell) => cell?.marked)
      ).length;
      if (rowMatch || colMatch) {
        if (returnFirst) {
          return unmarkedSum(board) * number;
        } else {
          if (!winningEntries.find((entry) => entry.index === index)) {
            winningEntries.push({ index, number });
          }
          if (winningEntries.length === bingoBoards.length) break;
        }
      }
    }
    if (winningEntries.length === bingoBoards.length) break;
  }

  const lastWinner = winningEntries.at(-1);
  if (!lastWinner) throw new Error("No last winner.");
  const lastBoard = bingoBoards[lastWinner.index];
  if (!lastBoard) throw new Error("Last board not found.");
  return unmarkedSum(lastBoard) * lastWinner.number;
};

const part1 = () => computeWinner(true);

const part2 = () => computeWinner(false);

const answers: AnswerCollection = {
  part1,
  part2,
};

export default answers;
