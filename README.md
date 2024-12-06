# Space Repetition

A Spaced Repetition Library

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
    const flashcards = Spacerepetition.createFlashcards(5)
</script>
```

---

## Usage

It doesn't matter what your data looks like, it will always return an array of flashcards:

```javascript
const flashcards = createFlashcards([1, "two"])
/*  returns:
    {
        "1": {
            "value": 1,
            "next": 1,
            "prev": 1
        },
        "two": {
            "value": "two",
            "next": "two",
            "prev": "two"
        }
    } 

*/

```

```javascript
const flashcards = createFlashcards([{ front: "question", back: "answer" }, { front: "question", back: "answer" }])
```

Just avoid using the following keys which will conflict with the ones used by the library:

<!-- todo  -->

---

## Spaced Repetition Algorithms

```javascript
const flashcards = createFlashcards([])
const flashcards = createFlashcards([], "sm2") 
const flashcards = createFlashcards([], "sm2")
```

<!-- todo explain what it must adhere to -->
You can also specify your own algorithm as long as it adhers to XXXXXXXX:

```javascript
function myAlgorithm() {
    return "myAlgorithm"
}

const flashcards = createFlashcards([], myAlgorithm)
```

---

## Config

You can also pass a config object as the third parameter:

```javascript
const flashcards = createFlashcards([], "default", {
    "initial": 5,
    "interval": 10,
    "factor": 2.5
})
```


---

## Statistics

You can get statistics about the flashcards:

```javascript
// todo 
```