import { Flashcard } from "../types.js";

// todo remember to sanatize the front and back inputs

export function createUI(flashcards: Flashcard[]): string {

    return cardReviewTemplate.replace("$$$$FLASHCARDS$$$$", JSON.stringify(flashcards));
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
                    font-size: calc(1rem + 8vw); 
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
                    font-size: calc(1rem + 8vw); 
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
            padding-bottom: 0.5rem;">
    </div>

        <script>
        const flashcards = $$$$FLASHCARDS$$$$;
        let currentCard;

        const cardContainer = document.getElementById("spacerepetition-ui-internal-card-container");
        const cardFront = document.getElementById("spacerepetition-ui-internal-card-front");
        const cardBack = document.getElementById("spacerepetition-ui-internal-card-back");
        const reviewButtonRowDiv = document.getElementById("spacerepetition-ui-internal-review-row");

        let flipped = false;

        function showFront() {

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
            reviewButtonRow += '<button onclick="nextCard(0, ' + JSON.stringify(currentCard) + ')" style="flex: 1; background-color: red;">Again</button>';
            reviewButtonRow += '<button onclick="nextCard(1, ' + JSON.stringify(currentCard) + ')" style="flex: 1; background-color: red;">Hard</button>';
            reviewButtonRow += '<button onclick="nextCard(2, ' + JSON.stringify(currentCard) + ')" style="flex: 1; background-color: red;">Good</button>';
            reviewButtonRow += '<button onclick="nextCard(3, ' + JSON.stringify(currentCard) + ')" style="flex: 1; background-color: red;">Easy</button>';
        }

        function nextCard(difficulty) {
            cardContainer.style.top = "-100%";
            setTimeout(() => {
                currentCard = SpaceRepetition.getNextCard(flashcards);
                showFront();
                cardContainer.style.top = "0";
            }, 600);
        }

        function flipCard() {
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
    </script>
`;

