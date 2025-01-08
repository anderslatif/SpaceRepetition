import { Flashcard, LearningAlgorithm } from '../types.js';
import { defaultCardConfig } from "../util/defaultConfig.js";
import { createFlashcards, createFlashcard } from '../flashcards/createFlashcards.js';
import { getNextCard } from '../flashcards/flashcardScheduler.js';

export default class Deck {
    private cards: Flashcard[];
    private lastCard: Flashcard | undefined;

    /**
     * Creates an instance of Deck.
     * @param {any} [cards] - Initial set of cards.
     * @param {LearningAlgorithm} [learningAlgorithm="default"] - The learning algorithm to use.
     * @param {object} [config] - Configuration object for the cards.
     */
    constructor(cards?: any, learningAlgorithm: LearningAlgorithm = "default", config?: object) {
        const mergedConfig = { ...defaultCardConfig, ...(config || {}) };
        this.cards = this.createFlashcards(cards, learningAlgorithm, mergedConfig);
    }

    /**
     * Creates flashcards from the given data.
     * @param {any} cards - Data to create flashcards from.
     * @param {LearningAlgorithm} learningAlgorithm - The learning algorithm to use.
     * @param {object} config - Configuration object for the cards.
     * @returns {Flashcard[]} - Array of created flashcards.
     */
    createFlashcards(cards: any, learningAlgorithm: LearningAlgorithm, config: object): Flashcard[] {
        return createFlashcards(cards, learningAlgorithm, config);
    }

    /**
     * Creates a single flashcard from the given data.
     * @param {any} card - Data to create a flashcard from.
     * @param {object} config - Configuration object for the card.
     * @returns {Flashcard} - Created flashcard.
     */
    createFlashcard(card: any, config: object): Flashcard {
        return createFlashcard(card, config);
    }

    /**
     * Adds a card to the deck.
     * @param {Flashcard} card - The card to add.
     */
    addCard(card: Flashcard): void {
        this.cards.push(card);
    }

    /**
     * Removes a card from the deck.
     * @param {Flashcard} card - The card to remove.
     * @returns {boolean} - True if the card was removed, false otherwise.
     */
    removeCard(card: Flashcard): boolean {
        const index = this.cards.indexOf(card);
        if (index > -1) {
            this.cards.splice(index, 1);
            return true;
        }
        return false;
    }

    /**
     * Gets all cards in the deck.
     * @returns {Flashcard[]} - Array of all cards in the deck.
     */
    getAllCards(): Flashcard[] {
        return this.cards;
    }

    /**
     * Gets the next card to review.
     * @returns {Flashcard | undefined} - The next card to review, or undefined if no card is due.
     */
    getNextCard() {
        let nextCard: Flashcard | undefined;
    
        let attempts = 0; 
        const maxAttempts = this.cards.length;
    
        do {
            nextCard = getNextCard(this.cards);
    
            if (!nextCard || attempts >= maxAttempts) break; // Break if nextCard is undefined or max attempts reached
    
            attempts++;
        } while (nextCard === this.lastCard);
    
        this.lastCard = nextCard;
        return nextCard;      
    }

    /**
     * Alias for getNextCard.
     * @returns {Flashcard | undefined} - The next card to review, or undefined if no card is due.
     */
    nextCard() {
        return this.getNextCard();
    }

    /**
     * Adds another deck's cards to this deck.
     * @param {Deck} deck - The deck to add.
     */
    addDeck(deck: Deck) {
        this.cards = this.cards.concat(deck.getAllCards());
    }

}