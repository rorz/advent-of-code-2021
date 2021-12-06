import prompt from "prompt";

import { displayAnswer } from "./utils";

// Days:
import day1 from "./days/1";
import day2 from "./days/2";
import day3 from "./days/3";
import day4 from "./days/4";
import day5 from "./days/5";

prompt.start();

prompt.get(
  [
    {
      name: "day",
      type: "number",
    },
    {
      name: "part",
      type: "number",
    },
  ],
  (_, result) => {
    const { day, part } = result as { day: number; part: number };
    switch (day) {
      case 1: {
        displayAnswer(day1, part);
        break;
      }
      case 2: {
        displayAnswer(day2, part);
        break;
      }
      case 3: {
        displayAnswer(day3, part);
        break;
      }
      case 4: {
        displayAnswer(day4, part);
        break;
      }
      case 5: {
        displayAnswer(day5, part);
        break;
      }
      default: {
        console.log(`No function for day ${day} / part ${part} found!`);
      }
    }
  }
);
