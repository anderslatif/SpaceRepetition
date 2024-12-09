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
    
    updateDifficulty(difficulty: number): void;
    again(): void;
    hard(): void;
    good(): void;
    easy(): void;
};

export type LearningAlgorithm = "sm-2" | "default" | "" | ((card?: Flashcard, difficulty?: any) => void);
