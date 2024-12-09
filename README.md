# Space Repetition

A Spaced Repetition Library

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
import { createFlashcards } from 'spacerepetition'
```

Or you can include it from a CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/spacerepetition/dist/spacerepetition.min.js"></script>
```

And use it:

```html
<script>
    const flashcards = Spacerepetition.createFlashcards([1, 2, 3])
</script>
```

---

## Usage

It doesn't matter what your data looks like, it will always return an array of flashcards:

```javascript
const flashcards = createFlashcards([{ front: "Question", back: "Answer" }])
```

Here is what it returns:

```javascript
/* 
[
 {
    front: 'Question',
    back: 'Answer',
    learningAlgorithm: 'default',
    easeFactor: 2.7,
    minEaseFactor: 1.3,
    interval: 1,
    repetition: 0,
    dueDate: 1733666742133,
    updateDifficulty: [Function: updateDifficulty],
    again: [Function: again],
    hard: [Function: hard],
    good: [Function: good],
    easy: [Function: easy]
  }
]
*/

```

---

## Spaced Repetition Algorithms

There's currently only support for [sm-2](https://en.wikipedia.org/wiki/SuperMemo).

But you could also pass your own algorithm. Both parameters are optional:



You can also specify your own algorithm as long as it adhers to XXXXXXXX:

```javascript
function myAlgorithm(card, difficulty) {
    return "use the card that you pass to update the internal state of the card"
}

const flashcards = createFlashcards([], myAlgorithm)
```

---

## Config

Besides manually adjusting values on the cards, you can also pass a config object as the third parameter to initialize cards with different values:

```javascript
const config = {
    interval: 7
}

const flashcards = createFlashcards([], undefined, config)
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

You can use the built-in UI for HTML. You can style the `front` and `back` property with text or any HTML:

```html
<!DOCTYPE html>
<html lang="en" style="height: 100%; margin: 0;">
<head>
    <title>Space Repetition</title>
    <script src="https://cdn.jsdelivr.net/npm/spacerepetition@0.0.31/dist/spacerepetition.min.js"></script>
</head>
<body style="margin: 0; padding: 0; height: 100%; display: flex; flex-direction: column;">
    
    <script>
        const cards = [
            {   front: "<h1 style='color: red'>Front 1</h1>", 
                back: `<div><p style='color: blue;'>Space Repetition</p>
                        <img src='https://raw.githubusercontent.com/anderslatif/SpaceRepetition/main/spacerepetitionlogo.png'>
                       </div>` },
            { front: "<h1 style='color: red'>Front 2</h1>", back: "<p style='color: blue'>Back 2</p>" },
            { front: "<h1 style='color: red'>Front 3</h1>", back: "<p style='color: blue'>Back 3</p>" },
        ];

        const myFlashcards = SpaceRepetition.createFlashcards(cards);

        const { template, startFlashcardsUI } = SpaceRepetition.createUI(myFlashcards);

        document.body.insertAdjacentHTML('afterbegin', template);

        startFlashcardsUI(myFlashcards);
    </script>
</body>
</html>
```

It's a 3 step process:

1. Genereate the flashcards. (This manual step allows you to provide existing flashcards or set their values).

2. Generate the UI (styling, front, back, button row) and insert them in the document. Set the CSS values as seen above on the HTML and body tag.

3. Call `startFlashcardsUI` with the flashcards you generated in step 1.

The end result will look like this:

<img src="https://raw.githubusercontent.com/anderslatif/SpaceRepetition/main/assets/ui_example.png" alt="space spaced repetition logo" width="100" >


---

## Statistics

<!-- todo  -->
You can get statistics about the flashcards:

```javascript

```

---

[npm-version-image]: https://img.shields.io/npm/v/spacerepetition.svg
[npm-url]: https://www.npmjs.com/package/spacerepetition
[npm-install-size-image]: https://packagephobia.com/badge?p=spacerepetition
[npm-install-size-url]: https://packagephobia.com/result?p=spacerepetition
