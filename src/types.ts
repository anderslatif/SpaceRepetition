export interface Flashcard {
    interval: number;
    repetition: number;
    dueDate: number;
    learningAlgorithm: LearningAlgorithm;
    startingInterval: number;
    intervalModifier: number;
    minInterval: number;
    maxInterval: number;
    easeFactor: number;
    easeFactorDecayRate: number;
    again(): void;
    hard(): void;
    good(): void;
    easy(): void;
    updateCard(quality: number): void;
};

export type LearningAlgorithm = "sm-2" | "default" | "";
