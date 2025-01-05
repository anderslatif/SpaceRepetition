import { Flashcard, UIConfig } from "../types.js";

import { createFlashcard } from "../flashcards/createFlashcards.js";

export function prepareFlashcards(cards: any, config: UIConfig): Flashcard[] {

    if (!cards) return [];

    if (Array.isArray(cards)) {
        return cards.map((card) => {
            card.front = card.front ? card.front : (config?.frontMissingText || "Front Missing");
            card.back = card.back ? card.back : (config?.backMissingText || "Back Missing");
            return createFlashcard(card, config);
        });
    } else {
        // single flashcard
        const card = { ...cards };
        card.front = (config?.frontMissingText || "Front Missing. Define a key in the object titled `front`");
        card.back = (config?.backMissingText || "Back Missing. Define a key in the object titled `back`");

        return [createFlashcard(card, config)];
    }

}

function sanitize(input: string): string {
    return input
        .replace(/<[^>]*>/g, "") // Remove HTML tags
        .replace(/[^\w\s.-]/g, "") // Allow only alphanumeric, spaces, dots, and hyphens
        .trim(); // Remove leading/trailing whitespace
}
