export interface Flashcard {
    front: any,
    back: any,

    // algorithm settings
    interval: number;
    repetition: number;
    dueDate: number;
    learningAlgorithm: LearningAlgorithm;
    startingInterval: number;
    easeFactor: number;
    minEaseFactor: number;
    
    again(): void;
    hard(): void;
    good(): void;
    easy(): void;
    updateCard(quality: number): void;
};

export type LearningAlgorithm = "sm-2" | "default" | "";
