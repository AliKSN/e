const alphabet = "abcdefghijklmnopqrstuvwxyz";
const source = document.querySelector("#source");
const result = document.querySelector("#result");
const inputLabel = document.querySelector("#input-label");
const outputLabel = document.querySelector("#output-label");
const copyButton = document.querySelector("#copy");
const clearButton = document.querySelector("#clear");
const swapButton = document.querySelector("#swap");
const modeButtons = document.querySelectorAll(".mode-button");

let mode = "encode";

function encodeText(text) {
  let output = "";
  let needsLetterSeparator = false;

  for (const character of text) {
    const index = alphabet.indexOf(character.toLowerCase());

    if (index !== -1) {
      if (needsLetterSeparator) {
        output += " ";
      }

      output += "e".repeat(index + 1);
      needsLetterSeparator = true;
      continue;
    }

    output += character === " " ? "  " : character;
    needsLetterSeparator = false;
  }

  return output;
}

function decodeE(text) {
  let output = "";
  let index = 0;

  while (index < text.length) {
    if (text[index] === " ") {
      let spaces = 0;

      while (text[index] === " ") {
        spaces += 1;
        index += 1;
      }

      output += " ".repeat(Math.floor(spaces / 2));
      continue;
    }

    if (text[index].toLowerCase() === "e") {
      let count = 0;

      while (text[index]?.toLowerCase() === "e") {
        count += 1;
        index += 1;
      }

      output += count >= 1 && count <= 26 ? alphabet[count - 1] : "e".repeat(count);
      continue;
    }

    output += text[index];
    index += 1;
  }

  return output;
}

function translate() {
  result.value = mode === "encode" ? encodeText(source.value) : decodeE(source.value);
}

function setMode(nextMode) {
  mode = nextMode;

  modeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === mode);
  });

  inputLabel.textContent = mode === "encode" ? "Text" : "E translation";
  outputLabel.textContent = mode === "encode" ? "E translation" : "Text";
  source.placeholder =
    mode === "encode" ? "Type something like: hello world" : "eeeeeeee eeeee  eeeeeeeeeeeeeeeeeeeeeee";

  translate();
}

source.addEventListener("input", translate);

modeButtons.forEach((button) => {
  button.addEventListener("click", () => setMode(button.dataset.mode));
});

swapButton.addEventListener("click", () => {
  source.value = result.value;
  setMode(mode === "encode" ? "decode" : "encode");
});

copyButton.addEventListener("click", async () => {
  await navigator.clipboard.writeText(result.value);
  copyButton.textContent = "Copied";
  window.setTimeout(() => {
    copyButton.textContent = "Copy result";
  }, 1200);
});

clearButton.addEventListener("click", () => {
  source.value = "";
  translate();
  source.focus();
});

translate();
