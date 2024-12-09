import { createFlashcards } from './flashcards/createFlashcards.js';
import { getNextCard } from './flashcards/flashcardScheduler.js';
import { createUI } from './ui/createUI.js';

export { createFlashcards } from './flashcards/createFlashcards.js';
export { getNextCard } from './flashcards/flashcardScheduler.js';
export { createUI } from './ui/createUI.js';

const SpaceRepetition = {
  createFlashcards,
  getNextCard,
  createUI,
};

export default SpaceRepetition;