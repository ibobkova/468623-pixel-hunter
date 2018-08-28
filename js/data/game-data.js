export const INITIAL_GAME = Object.freeze({
  level: 1,
  lives: 3,
  time: 30
});

export const SCORE = {
  RIGHT_ANSWER: 100,
  BONUS_ANSWER: 50,
  ONE_LIFE_SCORE: 50,
  SLOW_ANSWER: 20,
  QUICK_ANSWER: 10
};

export const genAnswers = (completed, timeSpent, length) => {
  const answers = [];

  for (let index = 0; index < length; index++) {
    answers.push({
      completed,
      timeSpent: setTime(timeSpent)
    });
  }
  return answers;
};

export const calculateScore = (answers, lives) => {
  if (answers.length < 10) {
    return -1;
  }
  // Возвращает очки + очки за жизни
  return answers.reduce((score, answer) => {
    if (answer.completed) {
      score += SCORE.RIGHT_ANSWER;
    }
    if (answer.completed && answer.timeSpent < SCORE.QUICK_ANSWER) {
      score += SCORE.BONUS_ANSWER;
    }
    if (answer.completed && answer.timeSpent > SCORE.SLOW_ANSWER) {
      score -= SCORE.BONUS_ANSWER;
    }
    return score;
  }, setLives(lives) * SCORE.ONE_LIFE_SCORE);
};

export const changeLevel = (level) => {
  if (typeof level !== `number`) {
    throw new Error(`Level should be typeof number`);
  }
  if (level < 0) {
    throw new Error(`Level should not be negative value`);
  }

  const newLevel = Object.assign({}, INITIAL_GAME, {
    level
  });
  return newLevel.level;
};

export const setTime = (time) => {
  if (time === 0) {
    throw new Error(`Time is over`);
  }
  if (time > 30) {
    throw new Error(`Time limit is 30 seconds`);
  }

  const newTimer = Object.assign({}, INITIAL_GAME, {
    time
  });
  return newTimer.time;
};

export const setLives = (lives) => {
  if (lives === 0) {
    throw new Error(`Game is over, no more lives`);
  }
  if (lives < 0 || lives > 3) {
    throw new Error(`Cant have less than 0 or more than 3 lives`);
  }

  const newLives = Object.assign({}, INITIAL_GAME, {
    lives
  });
  return newLives.lives;
};
