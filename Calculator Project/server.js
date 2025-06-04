const express = require('express');
const app = express();
const WINDOW_SIZE = 10;
let windowPrevState = [];
let windowCurrState = [];
let callCount = 0;

app.get('/numbers/e', (req, res) => {
  callCount += 1;
  windowPrevState = [...windowCurrState];

  // simulate “third‐party” even numbers
  let newNumbers;
  if (callCount === 1) {
    newNumbers = [2, 4, 6, 8];
  } else {
    newNumbers = [6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30];
  }

  if (newNumbers.length < WINDOW_SIZE) {
    windowCurrState = [...newNumbers];
  } else {
    windowCurrState = newNumbers.slice(-WINDOW_SIZE);
  }

  const sum = newNumbers.reduce((a, b) => a + b, 0);
  const avg =
    newNumbers.length < WINDOW_SIZE ? sum / newNumbers.length : sum / WINDOW_SIZE;

  res.json({
    windowPrevState,
    windowCurrState,
    numbers: newNumbers,
    avg: parseFloat(avg.toFixed(2)),
  });
});

app.listen(9876);
