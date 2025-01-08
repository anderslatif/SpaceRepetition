import { Flashcard, LearningAlgorithm } from "../types.js";
import { updateCardSM2 } from "./sm-2.js";
import { fenestralLacuna } from "./fenestralLacuna.js";

export function learningAlgorithmSelector(card: Flashcard, difficulty: number, learningAlgorithm: LearningAlgorithm): void {
  if (typeof learningAlgorithm === "function") {
    learningAlgorithm(card, difficulty);
  } else if (learningAlgorithm === "fenestral-lacuna") {
    fenestralLacuna(card, difficulty);
  } else {
    updateCardSM2(card, difficulty);
  }
}
