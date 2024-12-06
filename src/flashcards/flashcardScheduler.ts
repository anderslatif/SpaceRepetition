import { Flashcard } from "../types.js";

export function getNextCard(flashcards: Flashcard[]): Flashcard | undefined {
    const now: number = Date.now();
    const dueCards = flashcards.filter(card => card.dueDate <= now);

    if (dueCards.length === 0) return undefined;
  
    const randomIndex = Math.floor(Math.random() * dueCards.length);
    return dueCards[randomIndex];
}
