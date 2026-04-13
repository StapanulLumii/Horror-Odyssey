import type { Story } from "../engine";
import { defaultEndingNodes } from "../engine";

export const demoStory: Story = {
  startSceneId: "start",
  nodes: {
    ...defaultEndingNodes,
    start: {
      type: "scene",
      id: "start",
      text: "Ploaia bate în geamul biroului tău. Un dosar nou tocmai a aterizat pe masă. Un caz vechi de crimă, redeschis. Ce faci?",
      choices: [
        {
          id: "open",
          text: "Deschizi dosarul și citești.",
          effects: { perception: 5, sanity: -5 },
          next: "read_file",
        },
        {
          id: "ignore",
          text: "Îl ignori și torni un pahar.",
          effects: { courage: -5, sanity: 5 },
          next: "drink",
        },
      ],
    },
    read_file: {
      type: "scene",
      id: "read_file",
      text: "Dosarul descrie o fetiță dispărută acum 20 de ani. Ultima fotografie: un dulap negru, o ușă întredeschisă.",
      choices: [
        {
          id: "continue",
          text: "Mergi la fața locului.",
          next: "__death__",
        },
      ],
    },
    drink: {
      type: "scene",
      id: "drink",
      text: "Whiskey-ul arde. Nu rezolvă nimic. Dosarul te privește.",
      choices: [
        {
          id: "back",
          text: "Te întorci la dosar.",
          next: "read_file",
        },
      ],
    },
  },
};
