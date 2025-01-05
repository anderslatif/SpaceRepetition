import { Flashcard, LearningAlgorithm } from '../types.js';

import { defaultCardConfig } from "../util/defaultConfig.js"

import { createFlashcards, createFlashcard } from '../flashcards/createFlashcards.js';
import { getNextCard } from '../flashcards/flashcardScheduler.js';

export default class Deck {
    private cards: Flashcard[];
    private lastCard: Flashcard | undefined;

    constructor(cards?: any, learningAlgorithm: LearningAlgorithm = "default", config?: object) {
        const mergedConfig = { ...defaultCardConfig, ...(config || {}) };

        this.cards = this.createFlashcards(cards, learningAlgorithm, mergedConfig);
    }

    createFlashcards(cards: any, learningAlgorithm: LearningAlgorithm, config: object): Flashcard[] {
        return createFlashcards(cards, learningAlgorithm, config);
    }

    createFlashcard(card: any, config: object): Flashcard {
        return createFlashcard(card, config);
    }

    addCard(card: Flashcard): void {
        this.cards.push(card);
    }

    removeCard(card: Flashcard): boolean {
        const index = this.cards.indexOf(card);
        if (index > -1) {
            this.cards.splice(index, 1);
            return true;
        }
        return false;
    }

    getAllCards(): Flashcard[] {
        return this.cards;
    }

    getNextCard() {
        let nextCard: Flashcard | undefined;
        do {
            nextCard = getNextCard(this.cards);
        } while (nextCard === this.lastCard || nextCard === undefined);
        this.lastCard = nextCard;
        return nextCard;      
    }

    // just an alias for getNextCard
    nextCard() {
        return this.getNextCard();
    }

    addDeck(deck: Deck) {
        this.cards = this.cards.concat(deck.getAllCards());
    }

}