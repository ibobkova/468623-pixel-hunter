import {changeScreen} from './util';
import introScreen from './intro-screen';
import greetingScreen from './greeting-screen';

// Select the node that will be observed for mutations DOM
const targetNode = document.querySelector(`#main`);

// Options for the observer (which mutations to observe)
const config = {attributes: true, childList: true, subtree: true};

// Callback function to execute when mutations are observed
const clickBackButton = () => {
  if (document.querySelector(`.back`)) {
    const backButton = document.querySelector(`.back`);
    backButton.addEventListener(`click`, () => changeScreen(greetingScreen));
  }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(clickBackButton);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);

changeScreen(introScreen);
