import { Flashcard } from '../types.js';

/**
 * Updates the `dueDate` and `interval` of a flashcard based on the given difficulty.
 *
 * The function adjusts the interval of the card, adding a value based on the difficulty.
 * If the difficulty is 0, the interval is reset to 0. Otherwise, the interval accumulates
 * over time. The due date is updated to reflect the new interval in minutes.
 *
 * @param {Flashcard} card - The flashcard to update. It should have `dueDate` and `interval` properties.
 * @param {number} difficulty - The difficulty level of the card, ranging from 0 (hardest) to 3 (easiest).
 * 
 * @throws {Error} Throws an error if the difficulty level is not between 0 and 3.
 *
 * @example
 * const card = { dueDate: Date.now(), interval: 5 };
 * fenestralLacuna(card, 2);
 * // Updates card's interval to 7 (5 + 2) and adjusts dueDate accordingly.
 */
export function fenestralLacuna(card: Flashcard, difficulty: number): void {
    if (difficulty < 0 || difficulty > 3) {
		throw new Error('Invalid difficulty level. Must be between 0 and 3.');
	}

    if (!card.dueDate || card.dueDate <= Date.now()) {
		card.dueDate = Date.now();
        
        if (!card.interval) card.interval = 0;
	}

    if (difficulty === 0) {
        card.interval = 0;
    } else {
        card.interval += difficulty;
    }

	card.dueDate += card.interval * 1000 * 60;
}
