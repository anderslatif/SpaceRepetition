export { createFlashcards } from './flashcards/createFlashcards.js';
export { getNextCard } from './flashcards/flashcardScheduler.js';
export { createUI } from './ui/createUI.js';


// todo delete
// import { Flashcard } from './types.js';
// import { createFlashcards } from './flashcards/createFlashcards.js';
// import { getNextCard } from './flashcards/flashcardScheduler.js';

// const flashcards: Flashcard[] = createFlashcards(
// [{
//     question: "1q?",
//     answer: "a!",
// },
// {
//     question: "2q?",
//     answer: "a!",
// }
// ]);



// const card = {
//     answer: "a!",
//     hello: () => console.log("hello")
// }

// const htmlString = `
// const card = $$$$card$$$$;
// `.replace(
//     "$$$$card$$$$",
//     JSON.stringify(card, (key, value) =>
//         typeof value === "function" ? value.toString() : value
//     )
// );

// console.log(htmlString);


// let nextCard = getNextCard(flashcards);
// nextCard?.good();
// nextCard = getNextCard(flashcards);
// nextCard?.good();
// nextCard = getNextCard(flashcards);

// console.log(nextCard);


// import { createUI } from './ui/createUI.js';

// const cards = [
//     { front: "<h1 style='color: red'>Front 1</h1>", back: "<p style='color: blue'>Back 1</p>" },
//     { front: "<h1 style='color: red'>Front 1</h1>", back: "<p style='color: blue'>Back 1</p>" },
//     { front: "<h1 style='color: red'>Front 1</h1>", back: "<p style='color: blue'>Back 1</p>" },
// ];
// const flashcards = createFlashcards(cards);
// const htmlString = createUI(flashcards);
// console.log(htmlString);