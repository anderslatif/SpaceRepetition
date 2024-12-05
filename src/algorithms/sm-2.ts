import { Flashcard } from '../types.js';

export function updateCardSM2(card: Flashcard, quality: number): void {
    if (quality < 2) {
      card.repetition = 0;
      card.interval = 1;
      card.dueDate = Date.now();
    } else {
      card.repetition += 1;
      if (card.repetition === 1) card.interval = 1;
      else if (card.repetition === 2) card.interval = 6;
      else card.interval = Math.round(card.interval * card.easeFactor);
    }
  
    card.easeFactor = Math.max(
      1.3,
      card.easeFactor + (0.1 - (3 - quality) * (0.1 + (3 - quality) * 0.04))
    );
    card.dueDate = Date.now() + card.interval * 24 * 60 * 60 * 1000;
}
