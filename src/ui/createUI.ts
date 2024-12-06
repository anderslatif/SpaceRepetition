import { Flashcard } from "../types.js";

// todo remember to sanatize the front and back inputs

export function createUI(flashcards: Flashcard[], front: string, back: string): void {
    const card = document.createElement("div");
    card.classList.add("card");

    const frontEl = document.createElement("div");
    frontEl.classList.add("front");
    frontEl.textContent = front;

    const backEl = document.createElement("div");
    backEl.classList.add("back");
    backEl.textContent = back;

    card.appendChild(frontEl);
    card.appendChild(backEl);

    document.body.appendChild(card);
}