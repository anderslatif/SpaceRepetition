import { createFlashcards, getNextCard } from '../dist/spacerepetition.esm.js';

// Test the algorithm on a dataset
function generateFlashcards(count) {
    const preFlashcards = Array.from({ length: count }, (_, i) => {});
    return createFlashcards(preFlashcards);
  }
  
function simulateReview(flashcards, days) {
  let currentDate = Date.now();
  for (let day = 0; day < days; day++) {
      let nextCard = getNextCard(flashcards);
      while (nextCard && nextCard.dueDate <= currentDate) {
          // Simulate a quality score: 70% chance of "good", 10% each for "again", "hard", and "easy"
          const random = Math.random();
          const quality = random < 0.1 ? 0 : random < 0.2 ? 1 : random < 0.9 ? 2 : 3;
          nextCard.updateDifficulty(quality);
          nextCard = getNextCard(flashcards);
      }
      currentDate += 24 * 60 * 60 * 1000; // Move to the next day
  }
}

function evaluatePerformance(flashcards) {
  const retentionRate =
    (flashcards.filter(card => card.repetition > 0).length / flashcards.length) * 100;
  const averageInterval =
    flashcards.reduce((sum, card) => sum + card.interval, 0) / flashcards.length;

  const easeFactorDistribution = flashcards.reduce((stats, card) => {
    const ease = card.easeFactor.toFixed(1);
    stats[ease] = (stats[ease] || 0) + 1;
    return stats;
  }, {});

  console.log("=== Performance Evaluation ===");
  console.log(`Retention Rate: ${retentionRate.toFixed(2)}%`);
  console.log(`Average Interval: ${averageInterval.toFixed(2)} days`);
  console.log("Ease Factor Distribution:");
  Object.entries(easeFactorDistribution).forEach(([ease, count]) => {
    console.log(`  ${ease}: ${count} cards`);
  });

  console.log("\n=== Interpretation ===");
  if (retentionRate > 90) {
    console.log("Excellent retention rate! The algorithm is effectively optimizing learning.");
  } else if (retentionRate > 75) {
    console.log("Good retention rate. Consider fine-tuning ease factors or intervals.");
  } else {
    console.log(
      "Low retention rate. Algorithm parameters may need adjustment for better performance."
    );
  }

  if (averageInterval > 10) {
    console.log("Good efficiency. Cards are being spaced effectively.");
  } else {
    console.log(
      "Low efficiency. Consider increasing the ease factor or interval modifiers."
    );
  }
}

  
// Full Test
const flashcards = generateFlashcards(1000); // Generate 1000 flashcards
simulateReview(flashcards, 30); // Simulate 30 days of reviews
evaluatePerformance(flashcards); // Evaluate the algorithm
