import { Flashcard, HumanReadableDueDate } from "../types.js";

import { learningAlgorithmSelector } from "../algorithms/algorithmSelector.js"


export default class Card implements Flashcard {
    interval: number;
    repetition: number;
    easeFactor: number;
    minEaseFactor: number;
    dueDate: number;
    learningAlgorithm: any;

    [key: string]: any; // Allow dynamic properties

    constructor(card: Flashcard, config: object) {
        const mergedCard = {
            ...config,
            ...card
        };

        this.interval = mergedCard.interval;
        this.repetition = mergedCard.repetition;
        this.easeFactor = mergedCard.easeFactor;
        this.minEaseFactor = mergedCard.minEaseFactor;
        this.dueDate = mergedCard.dueDate ?? Date.now();

        // Dynamically assign any other properties
        Object.keys(mergedCard).forEach(key => {
          if (!(key in this)) {
            this[key] = (mergedCard as Record<string, any>)[key];
          }
        });
    }
  
    updateDifficulty(difficulty: number): void {
      learningAlgorithmSelector(this, difficulty, this.learningAlgorithm);
    }
  
    again(): void {
      this.updateDifficulty(0);
    }
  
    hard(): void {
      this.updateDifficulty(1);
    }
  
    good(): void {
      this.updateDifficulty(2);
    }
  
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
        return difficulties.map(difficulty => this.getPotentialDueDate(difficulty));
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