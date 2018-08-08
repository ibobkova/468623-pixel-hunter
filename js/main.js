'use strict';

const RIGHT_ARROW = 39;
const LEFT_ARROW = 37;

/**
 * Массив со всеми возможными DOM-элементами экранов приложения, кроме модальных окон
 */
const mainElement = document.querySelector(`#main`);
const screens = Array.from(document.querySelectorAll(`template:not(#modal-confirm):not(#modal-error)`)).
map((it) => it.content);

/**
 * Функция, которая вставляет выбранный элемент в DOM
 * @param element - выбранный элемент для вставки
 */
const selectSlide = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element.cloneNode(true));
};

/**
 * Функцию, которая по переданному номеру показывает экран из массива
 * @param index номер экрана
 */
let current = 0;
const select = (index) => {
  index = index < 0 ? screens.length - 1 : index;
  index = index >= screens.length ? 0 : index;
  current = index;
  selectSlide(screens[current]);
};

/**
 * Добавляем обработчик клавиатурных событий на document,
 * который будет по нажатию на клавиши-стрелок ← и → переключать экраны на предыдущий и следующий
 */
document.addEventListener(`keydown`, (evt) => {
  switch (evt.keyCode) {
    case RIGHT_ARROW:
      select(current + 1);
      break;
    case LEFT_ARROW:
      select(current - 1);
      break;
  }
});

/**
 * Добавляем на страницу визуальные стрелки,
 * которые будут дублировать поведение с клавиатуры и помогут переключать экраны мышкой:
 */
const arrowsElementHTML = `<div class="arrows__wrap"><style>
    .arrows__wrap {
      position: absolute;
      top: 95px;
      left: 50%;
      margin-left: -56px;
    }
    .arrows__btn {
      background: none;
      border: 2px solid black;
      padding: 5px 20px;
    }
  </style>
  <button class="arrows__btn"><-</button>
  <button class="arrows__btn">-></button>
  </div>`;

document.querySelector(`body`).insertAdjacentHTML(`beforeend`, arrowsElementHTML);

/**
 * Добавляем обработчик, который будет по клику
 * на визуальные стрелки переключать экраны на предыдущий и следующий
 */

document.querySelector(`.arrows__wrap`).addEventListener(`click`, (evt) => {
  let arrow = evt.target;

  if (arrow.textContent === `<-`) {
    select(current - 1);
  } else if (arrow.textContent === `->`) {
    select(current + 1);
  }
});

select(0);


