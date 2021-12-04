import { AnswerCollection } from "../types";
import { parseInput } from "../utils";

const bitLines: number[][] = parseInput(__filename).map((bitLine) =>
  bitLine.split("").map((bit) => +bit)
);

if (bitLines[0] == null) throw new Error("Bit lines not set up.");

// https://stackoverflow.com/a/36164530/1180964
const inverseLines = bitLines[0].map((_, i) => bitLines.map((x) => x[i]));

const part1 = () => {
  const gammaArray = inverseLines.map((column) => {
    const ones = column.filter((bit) => bit === 1).length;
    const zeroes = column.filter((bit) => bit === 0).length;
    return ones > zeroes ? 1 : 0;
  });
  const gammaBinary = gammaArray.join("");
  const epsilonBinary = gammaArray.map((bit) => (bit === 1 ? 0 : 1)).join("");

  return parseInt(gammaBinary, 2) * parseInt(epsilonBinary, 2);
};

const getValueIndices = (oxygen: boolean) =>
  inverseLines.reduce(
    (candidateIndices, column) => {
      if (candidateIndices.length === 1) {
        return candidateIndices;
      }

      const [ones, zeroes] = column.reduce(
        ([oneIs, zeroIs]: [number[], number[]], bit, index) =>
          candidateIndices.includes(index)
            ? [
                bit === 1 ? [...oneIs, index] : oneIs,
                bit === 0 ? [...zeroIs, index] : zeroIs,
              ]
            : [oneIs, zeroIs],
        [[], []]
      );

      return (
        oxygen ? ones.length >= zeroes.length : ones.length < zeroes.length
      )
        ? ones
        : zeroes;
    },
    [...new Array(bitLines.length)].map((_, i) => i)
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

  return parseInt(oxygenBinary, 2) * parseInt(co2Binary, 2);
};

const answers: AnswerCollection = {
  part1,
  part2,
};

export default answers;
