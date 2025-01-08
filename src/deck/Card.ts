import { Flashcard, LearningAlgorithm, HumanReadableDueDate } from "../types.js";

import { learningAlgorithmSelector } from "../algorithms/algorithmSelector.js"

export default class Card implements Flashcard {
    interval: number;
    repetition: number;
    easeFactor: number;
    minEaseFactor: number;
    dueDate: number;
    learningAlgorithm: any;

    [key: string]: any; // Allow dynamic properties

    /**
     * Creates an instance of Card.
     * @param {Flashcard} card - The flashcard data.
     * @param {object} config - Configuration object for the card.
     */
    constructor(card: Flashcard, config: object) {
        const mergedCard = {
            ...config,
            ...card
        };

        // Initialize explicitly declared properties with defaults
        this.interval = mergedCard.interval ?? 0;
        this.repetition = mergedCard.repetition ?? 0;
        this.easeFactor = mergedCard.easeFactor ?? 2.5;
        this.minEaseFactor = mergedCard.minEaseFactor ?? 1.3;
        this.dueDate = mergedCard.dueDate ?? Date.now();

        // Dynamically assign remaining properties
        Object.keys(mergedCard).forEach(key => {
            if (!this.hasOwnProperty(key)) {
                this[key] = (mergedCard as Record<string, any>)[key];
            }
        });
    }

    /**
     * Updates the difficulty of the card.
     * @param {number} difficulty - The difficulty rating.
     */
    updateDifficulty(difficulty: number): void {
        learningAlgorithmSelector(this, difficulty, this.learningAlgorithm);
    }

    /**
     * Marks the card as "again".
     */
    again(): void {
        this.updateDifficulty(0);
    }

    /**
     * Marks the card as "hard".
     */
    hard(): void {
        this.updateDifficulty(1);
    }

    /**
     * Marks the card as "good".
     */
    good(): void {
        this.updateDifficulty(2);
    }

    /**
     * Marks the card as "easy".
     */
    easy(): void {
        this.updateDifficulty(3);
    }

    getPotentialDueDate(difficulty: number): number {
        const potentialCard = new Card(this, {
            interval: this.interval,
            repetition: this.repetition,
            easeFactor: this.easeFactor,
            minEaseFactor: this.minEaseFactor,
            dueDate: this.dueDate
        });
        learningAlgorithmSelector(potentialCard, difficulty, this.learningAlgorithm);

        return potentialCard.dueDate;
    }

    getPotentialDueDates(difficulties: number[]): number[] {
        return difficulties.map((difficulty) => this.getPotentialDueDate(difficulty));
    }

    getPotentialDueDatesHumanReadable(difficulties: number[]): HumanReadableDueDate[] {
        const now = Date.now();
        const dueDates = this.getPotentialDueDates(difficulties);
         
        return dueDates.map(dueDate => {
            const diff = dueDate - now;
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor(diff / (1000 * 60 * 60) % 24);
            const minutes = Math.floor(diff / (1000 * 60) % 60);
            const seconds = Math.floor(diff / 1000 % 60);

            const timeString = `${days}d ${hours}h ${minutes}m ${seconds}s`;

            let prettyTime = "";
            if (days) prettyTime += `${days} days`;
            if (hours) prettyTime += ` ${hours} hours`;
            if (minutes) prettyTime += ` ${minutes} minutes`;
            if (seconds) prettyTime += ` ${seconds} seconds`;
            
            return {
                seconds,
                minutes,
                hours,
                days,
                timeString,
                prettyTime: prettyTime.trim() || "0 seconds"
            }
        });
    }

}