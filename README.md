# Space Repetition

> A Spaced Repetition Library

[![NPM Version][npm-version-image]][npm-url]
[![NPM Install Size][npm-install-size-image]][npm-install-size-url]

<img src="https://raw.githubusercontent.com/anderslatif/SpaceRepetition/main/assets/spacerepetitionlogo.png" alt="space spaced repetition logo" width="200" >


---

## Install + Import

```bash
$ npm install spacerepetition
```

And import it

```javascript
import SpaceRepetition from 'spacerepetition'
```

It doesn't matter what your data looks like, it will always return an array of flashcards:

```javascript
const deck = new SpaceRepetition([{ 
        question: "What types does Space Repetition accept?", 
        answer: "Any type of data" 
    }])
```

Or you can include it from a CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/spacerepetition@0.0/dist/spacerepetition.min.js"></script>
```

And use it:

```html
<script>
    const deck = new Spacerepetition()
</script>
```

---

## Usage

A deck contains multiple cards (in this case a single card):

```javascript
const deck = new Deck(1);
```

Here is what it contains:

```javascript
/* 
Deck {
  cards: [
    Card {
      interval: 1,
      repetition: 0,
      easeFactor: 2.7,
      minEaseFactor: 1.3,
      dueDate: 1734034389755,
      value: 1,
      learningAlgorithm: 'default'
    }
  ]
}
*/

```

You can get the next card to study by calling `getNextCard` which finds a random card that is due:

```javascript
const currentCard = deck.getNextCard();
```

On the card you can call the following convenience methods after you've studied it:

```javascript
currentCard.again() // 0
currentCard.hard()  // 1
currentCard.good()  // 2
currentCard.easy()  // 3
currentCard.updateDifficulty(3) // easy
```

The corresponding values are in comments next to the methods.

---

## Spaced Repetition Algorithms

There's currently only support for [sm-2](https://en.wikipedia.org/wiki/SuperMemo).

But you could also pass your own algorithm. Both parameters are optional:

```javascript
function myAlgorithm(card, difficulty) {
    return "use the card parameter to update the state of the card"
}

const flashcards = SpaceRepetition([], myAlgorithm)
```

---

## Utility Functions

If you don't want to work with the Deck and Card classes, the library also provides some utility functions:

| Function Name      | Description                                |
|--------------------|--------------------------------------------|
| createFlashcards   | Creates flashcards (Card class).           |
| getNextCard        | Retrieves the next card to review.         |
| createUI           | Creates a HTML UI for flashcard reviews    |


---

## Config

Besides manually adjusting values on the cards, you can also pass a config object as the third parameter to initialize cards with different values:

```javascript
const config = {
    interval: 7
}

const flashcards = new SpaceRepetition([], "default", config)
```

Here is what the config object looks like:


| Key              | Default Value | Target Algorithm |
|------------------|---------------|------------------|
| easeFactor       | 2.7           | SM-2             |
| minEaseFactor    | 1.3           | SM-2             |
| interval         | 1             | SM-2             |
| repetition       | 0             | SM-2             |


---

## UI

You can use the built-in UI for HTML. You can style the `front` and `back` property with **text** or any **HTML**:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Space Repetition</title>
    <script src="https://cdn.jsdelivr.net/npm/spacerepetition@0.0/dist/spacerepetition.min.js"></script>
</head>
<body>
    
    <script>
        const cards = [
            {   
                front: "<h1 style='color: red'>Front 1</h1>", 
                back: `<div>
                            <p style='color: blue;'>Space Repetition</p>
                            <img src='https://raw.githubusercontent.com/anderslatif/SpaceRepetition/main/spacerepetitionlogo.png'>
                       </div>` 
            },
            {   front: "Front 2", back: "Back 2" }
        ];

        SpaceRepetition.createUI(cards);
    </script>
</body>
</html>
```

The end result will look like this:

<img src="https://raw.githubusercontent.com/anderslatif/SpaceRepetition/main/assets/ui_example.png" alt="space spaced repetition logo" width="700" >


[npm-version-image]: https://img.shields.io/npm/v/spacerepetition.svg
[npm-url]: https://www.npmjs.com/package/spacerepetition
[npm-install-size-image]: https://packagephobia.com/badge?p=spacerepetition
[npm-install-size-url]: https://packagephobia.com/result?p=spacerepetition
