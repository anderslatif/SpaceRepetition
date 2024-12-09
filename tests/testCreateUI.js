import { createUI, createFlashcards } from '../dist/spacerepetition.esm.js';
import fs from "fs";

export function testCreateUI() {
    const cards = [
        { front: "<h1 style='color: red'>Front 1</h1>", back: "Back 1" },
        { front: "Front 2", back: "Back 2" },
        { front: "Front 3", back: "Back 3" },
        { front: "Front 4", back: "Back 4" },
        { front: "Front 5", back: "Back 5" },
    ];

    const flashcards = createFlashcards(cards);

    console.log(flashcards);

    const { template, startFlashcardsUI } = createUI(flashcards);
    

    const stringifiedFlashcards = JSON.stringify(flashcards, (key, value) =>
        typeof value === "function" ? value.toString() : value
    ).replace(/</g, "\\u003c");;

    const html = htmlTemplate
        .replace("$$$$FLASHCARDS$$$$", stringifiedFlashcards)
        .replace("$$$$TEMPLATE$$$$", template);


    fs.writeFileSync("test.html", html);
    
}

const htmlTemplate = `
<!DOCTYPE html>
<html lang="en" style="height: 100%; margin: 0;">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.jsdelivr.net/npm/spacerepetition/dist/spacerepetition.min.js"></script>
    <link rel="icon" href="https://raw.githubusercontent.com/anderslatif/SpaceRepetition/main/spacerepetitionlogo.png" type="image/png">
    <title>Space Repetition</title>
</head>
<body style="margin: 0; padding: 0; height: 100%; display: flex; flex-direction: column;">
    

    <script>
        const cards = $$$$FLASHCARDS$$$$;

        // const myFlashcards = SpaceRepetition.createFlashcards(cards);

        const template = \`${'$$$$TEMPLATE$$$$'}\`;

        document.body.insertAdjacentHTML('beforeend', template);


    </script>
</body>
</html>
`;
