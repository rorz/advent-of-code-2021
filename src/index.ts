import prompt from "prompt";

import day1 from "./1";
import { displayAnswer } from "./utils";

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
      default: {
        console.log(`No function for day ${day} / part ${part} found!`);
      }
    }
  }
);
