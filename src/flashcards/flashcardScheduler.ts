import { Flashcard } from "../types.js";

export function getNextCard(flashcards: Flashcard[]): Flashcard | undefined {
    const now: number = Date.now();
    return flashcards.filter(card => card.dueDate <= now).sort((a, b) => a.dueDate - b.dueDate)[0];
}
