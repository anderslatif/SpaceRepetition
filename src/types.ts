export interface Flashcard {
    front?: any,
    back?: any,

    // algorithm settings
    interval: number;
    repetition: number;
    dueDate: number;
    learningAlgorithm: LearningAlgorithm;
    easeFactor: number;
    minEaseFactor: number;
    
    updateDifficulty(difficulty: number): void;
    again(): void;
    hard(): void;
    good(): void;
    easy(): void;

    getPotentialDueDate(difficulty: number): number;
    getPotentialDueDates(difficulties: number[]): number[];
    getPotentialDueDatesHumanReadable(difficulties: number[]): HumanReadableDueDate[];
};

export type LearningAlgorithm = "sm-2" | "default" | "fenestral-lacuna" | "" | ((card?: Flashcard, difficulty?: any) => void);

export interface HumanReadableDueDate {
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
    timeString: string;
    prettyTime: string;
}

export interface UIConfig {
    frontMissingText: string;
    backMissingText: string;

    againButtonText: string;
    hardButtonText: string;
    goodButtonText: string;
    easyButtonText: string;

    noMoreCardsText: string;
}