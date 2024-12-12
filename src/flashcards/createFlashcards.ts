import { Flashcard, LearningAlgorithm } from '../types.js';
import { defaultCardConfig } from "../util/defaultConfig.js"
import Card from '../deck/Card.js';

export function createFlashcards(cards: any, learningAlgorithm: LearningAlgorithm = "default", config?: object): Flashcard[] {
    const mergedConfig = { ...defaultCardConfig, ...config };

    if (!cards) {
        return [];
    }

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

export function createFlashcard(card: any, config: object): Flashcard {
    return new Card(card, config);
}

