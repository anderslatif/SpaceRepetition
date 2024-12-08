# Space Repetition

A Spaced Repetition Library

[![NPM Version][npm-version-image]][npm-url]
[![NPM Install Size][npm-install-size-image]][npm-install-size-url]

<img src="https://raw.githubusercontent.com/anderslatif/SpaceRepetition/main/spacerepetitionlogo.png" alt="space spaced repetition logo" width="200" >


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

```javascript
/*  returns:
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

You can also pass a config object as the third parameter:

```javascript
const config = {
    interval: 7
}

const flashcards = createFlashcards([], undefiend, config)
```

| Key              | Default Value | Target Algorithm |
|------------------|---------------|------------------|
| easeFactor       | 2.7           | SM-2             |
| minEaseFactor    | 1.3           | SM-2             |
| interval         | 1             | SM-2             |
| repetition       | 0             | SM-2             |


<!-- ---

// todo 
## Statistics

You can get statistics about the flashcards:

```javascript

``` -->



[npm-version-image]: https://img.shields.io/npm/v/spacerepetition.svg
[npm-url]: https://www.npmjs.com/package/spacerepetition
[npm-install-size-image]: https://packagephobia.com/badge?p=spacerepetition
[npm-install-size-url]: https://packagephobia.com/result?p=spacerepetition
