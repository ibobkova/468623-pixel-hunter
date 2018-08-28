import {assert} from 'chai';
import {
  calculateScore,
  changeLevel,
  genAnswers,
  setLives,
  setTime
} from './game-data';

describe(`Calculate score`, () => {
  it(`should return -1 if array contains less than 10 answers`, () => {
    assert.equal(calculateScore(genAnswers(true, 20, 7), 3), -1);
  });
  it(`should return 1150 if the game is completed normally with all lives`, () => {
    assert.equal(calculateScore(genAnswers(true, 20, 10), 3), 1150);
  });
  it(`should return 1650 if the game is completed fast with all lives`, () => {
    assert.equal(calculateScore(genAnswers(true, 5, 10), 3), 1650);
  });
});

describe(`Change level`, () => {
  it(`should update level of the game`, () => {
    assert.equal(changeLevel(50), 50);
  });
  it(`should not allow set negative values`, () => {
    assert.throws(() => changeLevel(-1));
  });
  it(`should not allow set non number value`, () => {
    assert.throws(() => changeLevel([]));
  });
});

describe(`Set time`, () => {
  it(`should set timer`, () => {
    assert.equal(setTime(20), 20);
  });
  it(`should check if time limit is 30 seconds`, () => {
    assert.throws(() => setTime(40));
  });
});

describe(`Set lives`, () => {
  it(`should set live`, () => {
    assert.equal(setLives(2), 2);
  });
  it(`should end the game if all lives spent`, () => {
    assert.throws(() => setLives(0));
  });
  it(`should not allow less than 0 or more than 3 lives`, () => {
    assert.throws(() => setLives(4));
  });
});
