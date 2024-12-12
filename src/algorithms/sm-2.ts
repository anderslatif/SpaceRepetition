import { Flashcard } from '../types.js';

export function updateCardSM2(card: Flashcard, difficulty: number): void {
    if (difficulty < 2) {
        card.repetition = 0;
        card.interval = Math.max(2, card.interval * (0.5 + difficulty * 0.1));;
                                                // Add two minutes to Hard cards
        card.dueDate = Date.now() + difficulty * 1000 * 60 * 2; // deviating from sm-2
    } else {
        card.repetition += 1;
        if (card.repetition === 1) card.interval = 1 + (difficulty - 2) * 0.5;
        else if (card.repetition === 2) card.interval = 6;
        else {
            const intervalFactor = difficulty === 2 ? 1.0 : 1.6; // deviating from sm-2
            card.interval = Math.round(card.interval * card.easeFactor * intervalFactor);
        }
        card.easeFactor = Math.max(
            card.minEaseFactor,
            card.easeFactor + (0.15 - (3 - difficulty) * (0.1 + (3 - difficulty) * 0.05))
        );
        card.dueDate = Date.now() + card.interval * 24 * 60 * 60 * 1000;
    }
}
