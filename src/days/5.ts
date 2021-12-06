import { AnswerCollection } from "../types";
import { parseInput } from "../utils";

type Coord = [x: number, y: number];
type Pair = [Coord, Coord];

const coords = parseInput(__filename, false).map((coordLine) =>
  coordLine.split("->").map((pair) => pair.split(",").map((c) => +c))
) as Pair[];

let xMax = 0;
let yMax = 0;

coords.forEach(([[x1, y1], [x2, y2]]) => {
  xMax = Math.max(xMax, x1, x2);
  yMax = Math.max(yMax, y1, y2);
});

const computeDangerPoints = (includeDiagonals?: boolean) => {
  const cells = [...new Array(yMax + 1)].map(() =>
    [...new Array(xMax + 1)].map(() => 0)
  );
  coords.forEach(([[x1, y1], [x2, y2]]) => {
    if (x1 === x2) {
      for (let i = Math.min(y1, y2); i <= Math.max(y1, y2); i += 1) {
        cells![i]![x1] += 1;
      }
    } else if (y1 === y2) {
      for (let i = Math.min(x1, x2); i <= Math.max(x1, x2); i += 1) {
        cells![y1]![i] += 1;
      }
    } else if (includeDiagonals === true) {
      let j = 0;
      const up = y1 > y2;
      const left = x1 > x2;
      for (let i = x1; left ? i >= x2 : i <= x2; left ? (i -= 1) : (i += 1)) {
        cells![y1 + j]![i] += 1;
        j += up ? -1 : 1;
      }
    }
  });
  let dangerPoints = 0;
  cells.forEach((line) =>
    line.forEach((cell) => {
      if (cell >= 2) {
        dangerPoints += 1;
      }
    })
  );
  return dangerPoints;
};

const part1 = () => {
  return computeDangerPoints();
};

const part2 = () => {
  return computeDangerPoints(true);
};

const answers: AnswerCollection = {
  part1,
  part2,
};

export default answers;
