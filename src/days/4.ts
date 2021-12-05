import { AnswerCollection } from "../types";
import { parseInput } from "../utils";

const bingoRaw = parseInput(__filename);

const drawnNumbers = bingoRaw
  .slice(0, 1)[0]
  ?.split(",")
  .map((n) => +n);

if (!drawnNumbers) throw new Error("Couldn't parse drawn numbers");

// const bingoBoards = bingoRaw.slice(2, -1).reduce((board, line) => {
//   //
// }, []);
// const boardInput = bingoRaw.slice(2, -1);
// const bingoBoards: number[][][] = [];

// let currentBoard: number[][] = [];

// for (const line of boardInput) {
//   if (line === "\n") {
//     continue;
//   }

//   if ()
// }

// type BoardTally = [string[][], string[]];
interface BoardTally {
  boards: string[][];
  currentBoard: string[];
}

type Board = {
  value: number;
  marked: boolean;
}[][];

// (tally: BoardTally, line) => {
//   const [boards, currentBoard] = tally as BoardTally;
//   if (line === "") {
//     return [[...boards, currentBoard], []];
//   }
//   return [boards, [...currentBoard, line]];

//   // return [[["hello"]], ["helloX"]];
// },
// [[], []]
let bingoBoards = bingoRaw
  .slice(2, -1)
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
        .filter((char) => char !== " ")
        .map((char) => ({ value: +char, marked: false }))
    )
  );

// https://stackoverflow.com/a/40575135/1180964
function transpose(matrix: Board) {
  if (!matrix[0]) throw new Error("Can't transpose");
  return Object.keys(matrix[0]).map((colNumber) =>
    matrix.map((rowNumber) => rowNumber[+colNumber])
  );
}

const part1 = () => {
  for (const number of drawnNumbers) {
    bingoBoards = bingoBoards.map((board) =>
      board.map((line) =>
        line.map(({ value, marked }) => ({
          value,
          marked: marked || value === number,
        }))
      )
    );
    for (const board of bingoBoards) {
      const rowMatch = board.filter((line) =>
        line.every(({ marked }) => !!marked)
      ).length;
      const inverseBoard = transpose(board);
      const colMatch = inverseBoard.filter(
        (line) =>
          line != null && line.every((cell) => cell != null && !!cell.marked)
      ).length;
      // const colMatch = board.flat().reduce(
      //   (columns: Board, cell, index) => {
      //     let newColumns = [...columns] as Board;
      //     newColumns[index % 5]?.push(cell);
      //   },
      //   [...new Array(5)].map(() => [...new Array(5)])
      // );
      // if (board[0] == null) throw new Error("Board broken.");
      // const inverseBoard = board[0].map((_, i) =>
      //   board.map((x) => x[i])
      // ) as Board;
      // const colMatch = inverseBoard.filter((line) =>
      //   line.every(({ marked }) => !!marked)
      // ).length;
      if (rowMatch || colMatch) {
        const unmarkedSum = board.reduce((tally, line) => {
          const innerTotal = line.reduce((innerTally, { value, marked }) => {
            if (!marked) {
              return innerTally + value;
            }
            return innerTally;
          }, 0);
          return tally + innerTotal;
        }, 0);
        return unmarkedSum * number;
      }
    }
  }
  return -1;
};

const part2 = () => {
  return 0;
};

const answers: AnswerCollection = {
  part1,
  part2,
};

export default answers;
