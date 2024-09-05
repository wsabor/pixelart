const canvas = document.querySelector(".canvas");
const inputSize = document.querySelector(".input-size");
const inputColor = document.querySelector(".input-color");
const usedColors = document.querySelector(".used-colors");
const buttonSave = document.querySelector(".button-save");
const colResize = document.querySelector(".resize");
const main = document.querySelector(".main");

let isPainting = false;

const MIN_CANVAS_SIZE = 4; //add após updateCanvasSize

const createElement = (tag, className = "") => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

const setPixelColor = (pixel) => {
  pixel.style.backgroundColor = inputColor.value;
};

const createPixel = () => {
  const pixel = createElement("div", "pixel");

  pixel.addEventListener("mousedown", () => setPixelColor(pixel));
  pixel.addEventListener("mouseover", () => {
    if (isPainting) setPixelColor(pixel);
  });

  return pixel;
};

const loadCanvas = () => {
  const length = inputSize.value;
  canvas.innerHTML = ""; //adicionar após criar o inputSize.addEventListener

  for (let i = 0; i < length; i += 1) {
    const row = createElement("div", "row");

    for (let j = 0; j < length; j += 1) {
      row.append(createPixel());
    }

    canvas.append(row);
  }
};

const updateCanvasSize = () => {
  if (inputSize.value >= MIN_CANVAS_SIZE) {
    //add o if após criar o MIN_CANVAS_SIZE
    loadCanvas();
  }
};

const changeColor = () => {
  const button = createElement("button", "button-color");
  const currentColor = inputColor.value;

  button.style.backgroundColor = currentColor;

  button.setAttribute("data-color", currentColor);

  button.addEventListener("click", () => (inputColor.value = currentColor));

  const savedColors = Array.from(usedColors.children);

  const check = (btn) => btn.getAttribute("data-color") != currentColor;

  if (savedColors.every(check)) {
    usedColors.append(button);
  }
};

canvas.addEventListener("mousedown", () => (isPainting = true));
canvas.addEventListener("mouseup", () => (isPainting = false));

inputSize.addEventListener("change", updateCanvasSize);
inputColor.addEventListener("change", changeColor);

loadCanvas();
