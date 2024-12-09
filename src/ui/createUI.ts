// @ts-nocheck
import { Flashcard } from "../types.js";

interface CreateUIResult {
    template: string;
    startFlashcardsUI: Function;
}

export function createUI(flashcards: Flashcard[]): CreateUIResult {
    // sanitize the flashcards data
    const flashcardsData = JSON.stringify(flashcards, (key, value) =>
        typeof value === "function" ? value.toString() : value
    ).replace(/</g, "\\u003c");
    
    const template = cardReviewTemplate;
    
    return { template, startFlashcardsUI };
}

const cardReviewTemplate = `
    <div style="flex-grow: 1; display: flex; justify-content: center; align-items: center; overflow: hidden; padding: 0; margin: 0;">
        <div id="spacerepetition-ui-internal-card-container"
            style="     
                width: 100%; 
                height: 100%; 
                position: relative;
                transform-style: preserve-3d; 
                transition: transform 0.6s, top 0.6s;
                top: 0;">
            <div id="spacerepetition-ui-internal-card-front"
                style="
                    display: flex; 
                    justify-content: center; 
                    align-items: center; 
                    text-align: center;
                    width: 100%; 
                    height: 100%; 
                    position: absolute; 
                    backface-visibility: hidden; 
                    padding: 2rem;
                    border-radius: 16px; 
                    border: 1px solid rgba(0, 0, 0, 0.1); 
                    box-shadow: 0 12px 30px rgba(0, 0, 0, 1); 
                    font-size: calc(1rem + 4vw); 
                    background-color: white;">
            </div>
            <div id="spacerepetition-ui-internal-card-back"
                style="
                    display: flex; 
                    justify-content: center; 
                    align-items: center;
                    text-align: center; 
                    width: 100%; 
                    height: 100%; 
                    position: absolute; 
                    backface-visibility: hidden; 
                    transform: rotateY(180deg); 
                    padding: 2rem;
                    border-radius: 16px; 
                    border: 1px solid rgba(0, 0, 0, 0.1); 
                    box-shadow: 0 12px 30px rgba(0, 0, 0, 1); 
                    font-size: calc(1rem + 4vw); 
                    background-color: white;">
            </div>
        </div>
    </div>

    <div id="spacerepetition-ui-internal-review-row" 
        style="
            width: 100%; 
            display: flex; 
            min-height: 5vh; 
            position: fixed; 
            bottom: 0; 
            background-color: white; 
            box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1); 
            padding-bottom: 0.1rem;">
    </div>
`;



function startFlashcardsUI(flashcards) {
    const __internal__flashcards = flashcards;
    let currentCard;

    const cardContainer = document.getElementById("spacerepetition-ui-internal-card-container");
    const cardFront = document.getElementById("spacerepetition-ui-internal-card-front");
    const cardBack = document.getElementById("spacerepetition-ui-internal-card-back");
    const reviewButtonRowDiv = document.getElementById("spacerepetition-ui-internal-review-row");

    let flipped = false;

    window.showFront = () => {
        cardFront.innerHTML = currentCard.front;
        cardBack.innerHTML = currentCard.back;
        reviewButtonRowDiv.innerHTML = "";
        flipped = false;
        cardContainer.style.transform = "rotateY(0deg)";
    }
    
    function showBack() {
        flipped = true;
        cardContainer.style.transform = "rotateY(180deg)";
    
        let reviewButtonRow = "";
        reviewButtonRow += '<button onclick="updateCard(0)" style="flex: 1; background-color: red;">Again</button>';
        reviewButtonRow += '<button onclick="updateCard(1)" style="flex: 1; background-color: yellow;">Hard</button>';
        reviewButtonRow += '<button onclick="updateCard(2)" style="flex: 1; background-color: lime;">Good</button>';
        reviewButtonRow += '<button onclick="updateCard(3)" style="flex: 1; background-color: blue;">Easy</button>';

        reviewButtonRowDiv.innerHTML = reviewButtonRow;
    }

    window.updateCard = (difficulty) => {
        currentCard.updateDifficulty(difficulty);
        nextCard();
    }

    window.nextCard = () => {
        cardContainer.style.top = "-100%";
        setTimeout(() => {
            currentCard = SpaceRepetition.getNextCard(__internal__flashcards);
            if (currentCard) {
                showFront();
            } else {
                cardBack.innerHTML = "<h1>No more cards!</>";
                cardContainer?.removeEventListener("click", flipCard);
                reviewButtonRowDiv.innerHTML = "";
            }
            cardContainer.style.top = "0";
        }, 600);
    }

    window.flipCard = () => {
        if (!cardContainer.style.top || cardContainer.style.top === "0px") {
            if (flipped) {
                showFront();
            } else {
                showBack();
            }
        }
    }

    // Attach click event
    cardContainer.addEventListener("click", flipCard);

    nextCard();
}
