import fs from 'fs';

function createHTMLFile() {
    const libraryContent = fs.readFileSync('./dist/spacerepetition.min.js', 'utf8');

    const html = topHTML + libraryContent + middleHTML + scriptTagContent + bottomHTML;

    fs.writeFileSync('./tests/testCreateUI.html', html);
};


const topHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="icon" href="https://raw.githubusercontent.com/anderslatif/SpaceRepetition/main/spacerepetitionlogo.png" type="image/png">
    <title>Space Repetition</title>
    <script src="https://cdn.jsdelivr.net/npm/spacerepetition/dist/spacerepetition.min.js"></script>
</head>
<body>
    
    <script>
`;

const middleHTML = `
    </script>
    <script>
    `

const scriptTagContent = `
const cards = [
    { front: "<h1 style='color: red'>Front 1</h1>", back: "<p style='color: blue'>Back 1</p>" },
    { front: "<h1 style='color: red'>Front 2</h1>", back: "<p style='color: blue'>Back 2</p>" },
    { front: "<h1 style='color: red'>Front 3</h1>", back: "<p style='color: blue'>Back 3</p>" },
    { front: "<h1 style='color: red'>Front 4</h1>", back: "<p style='color: blue'>Back 4</p>" },
];

SpaceRepetition.createUI(cards, 'fenestral-lacuna');
`;

const bottomHTML = `
    </script>
    </body>
</html>
`;

createHTMLFile();
