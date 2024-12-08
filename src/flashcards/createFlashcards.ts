import { Flashcard, LearningAlgorithm } from '../types.js';
import { defaultCardConfig } from "../util/defaultConfig.js"
import { updateAlgorithm } from "../algorithms/updateAlgorithm.js"


export function createFlashcards(cards: any, learningAlgorithm: LearningAlgorithm = "default", config?: object): Flashcard[] {
    const mergedConfig = { ...defaultCardConfig, ...config };

    if (Array.isArray(cards)) {
        return cards.map((card) => {
            if (typeof card === 'object' && card !== null) {
                return createFlashcard({ ...card, learningAlgorithm }, mergedConfig);
            } else {
                return createFlashcard({ value: card, learningAlgorithm  }, mergedConfig);
            }
        });
    } else if (typeof cards === 'object' && cards !== null) {
        // case: a single object is passed
        return [createFlashcard({ ...cards, learningAlgorithm}, mergedConfig)];
    } else {
        // case: a single value is passed
        return [createFlashcard({ value: cards, learningAlgorithm }, mergedConfig)];
    }
}

function createFlashcard(card: any, config: object): Flashcard {
  return {
    ...card,
    ...config,
    dueDate: card.dueDate ?? Date.now(),
    updateDifficulty(difficulty: number) {
      updateAlgorithm(this, difficulty, this.learningAlgorithm);
    },
    again() {
      this.updateDifficulty(0);
    },
    hard() {
      this.updateDifficulty(1);
    },
    good() {
      this.updateDifficulty(2);
    },
    easy() {
      this.updateDifficulty(3);
    },
  } as Flashcard;
}
