import { Flashcard, LearningAlgorithm } from "../types.js";
import { updateCardSM2 } from "./sm-2.js";

export function updateAlgorithm(card: Flashcard, difficulty: number, learningAlgorithm: LearningAlgorithm): void {
  if (typeof learningAlgorithm === "function") {
    learningAlgorithm(card, difficulty);
  } else {
    updateCardSM2(card, difficulty);
  }
}
