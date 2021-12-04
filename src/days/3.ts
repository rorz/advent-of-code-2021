import { AnswerCollection } from "../types";
import { parseInput } from "../utils";

const bitLines: number[][] = parseInput(__filename).map((bitLine) =>
  bitLine.split("").map((bit) => +bit)
);

if (bitLines[0] == null) throw new Error("Bit lines not set up.");

let inverseLines: number[][] = [...new Array(bitLines[0].length)].map(() => []);

bitLines.forEach((bitLine) => {
  bitLine.forEach((bit, index) => {
    inverseLines[index]?.push(bit);
  });
});

const part1 = () => {
  const gammaArray = inverseLines.map((column) => {
    const ones = column.filter((bit) => bit === 1).length;
    const zeroes = column.filter((bit) => bit === 0).length;
    return ones > zeroes ? 1 : 0;
  });
  const gammaBinary = gammaArray.join("");
  const epsilonBinary = gammaArray.map((bit) => (bit === 1 ? 0 : 1)).join("");

  const epsilon = parseInt(gammaBinary, 2);
  const gamma = parseInt(epsilonBinary, 2);

  return gamma * epsilon;
};

const getValueIndices = (oxygen: boolean) =>
  inverseLines.reduce(
    (candidateIndices, column) => {
      if (candidateIndices.length === 1) {
        return candidateIndices;
      }

      const [oneIndices, zeroIndices] = column.reduce(
        ([oneIs, zeroIs]: [number[], number[]], bit, index) => {
          if (candidateIndices.includes(index)) {
            if (bit === 1) {
              return [[...oneIs, index], zeroIs];
            }
            return [oneIs, [...zeroIs, index]];
          }
          return [oneIs, zeroIs];
        },
        [[], []]
      );

      const ones = oneIndices.length;
      const zeroes = zeroIndices.length;

      if (oxygen ? ones >= zeroes : ones < zeroes) return oneIndices;
      return zeroIndices;
    },
    [...new Array(bitLines.length)].map((_, index) => index)
  );

const part2 = () => {
  const [oxygenIndex] = getValueIndices(true);
  const [co2Index] = getValueIndices(false);

  if (!oxygenIndex || !co2Index) {
    throw new Error("Indices not defined");
  }

  const oxygenBinary = bitLines[oxygenIndex]?.join("");
  const co2Binary = bitLines[co2Index]?.join("");
  if (!oxygenBinary || !co2Binary) throw new Error("Values not defined");

  const oxygen = parseInt(oxygenBinary, 2);
  const co2 = parseInt(co2Binary, 2);

  return oxygen * co2;
};

const answers: AnswerCollection = {
  part1,
  part2,
};

export default answers;
