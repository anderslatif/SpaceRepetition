# Space Repetition

A Spaced Repetition Library

---

## Install + Import

```bash
$ npm install spacedrepetition
```

And import it

```javascript
import { spaceRepetition } from 'spacerepetition'
```

Or you can include it from a CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/spacerepetition/dist/spacerepetition.min.js"></script>
```

And use it:

```html
<script>
    const flashcards = SpaceRepetition.spaceRepetition(5)
</script>
```

---

## Usage

It doesn't matter what your data looks like 

```javascript
const flashcards = SpaceRepetition.spaceRepetition([1, "two"])
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
const flashcards = SpaceRepetition.spaceRepetition([{ "key": "value" }, { "key2": "value2" }])
```

---

## Spaced Repetition Algorithms

```javascript
const flashcards = SpaceRepetition.spaceRepetition([])
const flashcards = SpaceRepetition.spaceRepetition([], "sm2")
```

<!-- todo explain what it must adhere to -->
You can also specify your own algorithm as long as it adhers to XXXXXXXX:

```javascript
function myAlgorithm() {
    return "myAlgorithm"
}

const flashcards = SpaceRepetition.spaceRepetition([], myAlgorithm)
```