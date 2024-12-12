// @ts-nocheck
import { Flashcard, UIConfig } from "../types.js";

import { prepareFlashcards } from "./prepareFlashcards.js";


export function createUI(cards: any, config: UIConfig): void {
    
    const __internal__flashcards = prepareFlashcards(cards, config);

    let __internal__currentCard;

    document.body.style.cssText += "margin: 0; padding: 0; height: 100%; display: flex; flex-direction: column;";
    document.documentElement.style.cssText += "height: 100%; margin: 0;";
    document.body.insertAdjacentHTML('afterbegin', cardReviewTemplate);

    const cardContainer = document.getElementById("spacerepetition-ui-internal-card-container");
    const cardFront = document.getElementById("spacerepetition-ui-internal-card-front");
    const cardBack = document.getElementById("spacerepetition-ui-internal-card-back");
    const reviewButtonRowDiv = document.getElementById("spacerepetition-ui-internal-review-row");

    if (!cardContainer || !cardFront || !cardBack || !reviewButtonRowDiv) {
        throw new Error("Missing elements. Please insert the template provided by createUI in the DOM.");
    }

    let flipped = false;

    window.showFront = () => {
        if (!__internal__currentCard) return;

        cardFront.innerHTML = __internal__currentCard.front;

        reviewButtonRowDiv.innerHTML = "";
        flipped = false;
        cardContainer.style.transform = "rotateY(0deg)";
    }
    
    function showBack() {
        if (!__internal__currentCard) return;

        flipped = true;
        cardContainer.style.transform = "rotateY(180deg)";

        cardBack.innerHTML = `
            <div>${__internal__currentCard.front}</div>
            <div style="width: 100%; height: 0.5rem; background-color: black; margin: 1rem 0;"></div>
            <div>${__internal__currentCard.back}</div>
        `;

        const dueDates = __internal__currentCard.getPotentialDueDatesHumanReadable([0, 1, 2, 3]);

        let reviewButtonRow = `
            <button onclick="updateCard(0)" style="flex: 1; background-color: red;">
                ${config?.againButtonText || "Again"}<br><small>${dueDates?.[0]?.prettyTime || ""}</small>
            </button>
            <button onclick="updateCard(1)" style="flex: 1; background-color: yellow;">
                ${config?.hardButtonText || "Hard"}<br><small>${dueDates?.[1]?.prettyTime || ""}</small>
            </button>
            <button onclick="updateCard(2)" style="flex: 1; background-color: lime;">
                ${config?.goodButtonText || "Good"}<br><small>${dueDates?.[2]?.prettyTime || ""}</small>
            </button>
            <button onclick="updateCard(3)" style="flex: 1; background-color: blue;">
                ${config?.easyButtonText || "Easy"}<br><small>${dueDates?.[3]?.prettyTime || ""}</small>
            </button>
        `;

        reviewButtonRowDiv.innerHTML = reviewButtonRow;
    }

    window.updateCard = (difficulty) => {
        __internal__currentCard.updateDifficulty(difficulty);
        nextCard();
    }

    window.nextCard = () => {
        cardContainer.style.top = "-100%";
        setTimeout(() => {
            __internal__currentCard = SpaceRepetition.getNextCard(__internal__flashcards);
            if (__internal__currentCard) {
                showFront();
            } else {
                const noMoreCardsText = config?.noMoreCardsText || "No more cards!";
                cardBack.innerHTML = `<h1>${noMoreCardsText}</>`;
                cardContainer.removeEventListener("click", flipCard);
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

    setTimeout(() => nextCard(), 1000);
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
                    font-size: calc(1rem + 2vw); 
                    background-color: white;">
            </div>
            <div id="spacerepetition-ui-internal-card-back"
                style="
                    display: flex;
                    flex-direction: column;
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
                    font-size: calc(1rem + 2vw); 
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
