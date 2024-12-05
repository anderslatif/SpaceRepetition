import { Flashcard, LearningAlgorithm } from "../types.js";
import { updateCardSM2 } from "./sm-2.js";

export function updateAlgorithm(card: Flashcard, quality: number, learningAlgorithm: LearningAlgorithm): void {
    if (learningAlgorithm === "sm-2" || learningAlgorithm === "default" || learningAlgorithm === "") {
      updateCardSM2(card, quality);
    } else {
      throw new Error(`Unsupported learning algorithm: ${learningAlgorithm}`);
    }
}
