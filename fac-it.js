"strict mode";

const { hex, symbols, numbers, validChar } = require("./lib/data.js");
// Encode string as hex

/** takes a single character string and encodes as either a single hex code or an array of two hex codes depending on cipher
 * @param {String} char a single character string
 * @returns {String || Array} hex codes baby!
 */
const encodeCharacters = (char) => {
  if (![...validChar, ...symbols].includes(char)) {
    return ["#ff00ff"];
  }

  if (char === " ") {
    return ["#ffffff"];
  }

  if (symbols.includes(char)) {
    return ["#a3a3a3"];
  }

  if (numbers.includes(char)) {
    const index = numbers.indexOf(char);
    return [hex[index]];
  }

  const twoUp = (i) => {
    return i < 20 ? [hex[1], hex[i - 10]] : [hex[2], hex[i - 20]];
  };

  const index = validChar.indexOf(char) - 10;

  return index < 10 ? [hex[index]] : twoUp(index);
};

/** Encoding entrypoint - takes a string and encodes as an array of hex codes via encodeCharacters
 * @param {String} input the string to be encoded
 * @returns {Array} an array of hex colour codes
 */
const encode = (input) => {
  const [...inputArr] = input.toLowerCase();
  return inputArr.map((char) => encodeCharacters(char));
};

// Render hex as SVG and CSS

/** Renders the encoded string as an SVG
 * @param {Array} encodedInput the input string encoded as array of hex values
 * @param {Object} options type, size, and direction
 * @returns {Element} an SVG element - ready to go into HTML!
 */
const renderSVG = (encodedInput, options) => {
  const { type, size, direction } = { ...options };

  const renderedSVG = encodedInput.map((char, index) => renderCharSVG(char, size, direction, index)).join("")

  const calcSizes = (size, direction) => {
    if (direction === "row") {
      const width = encodedInput.length * size;
      const height = size * 2;
      return [width, height];
    }
    const width = size * 2;
    const height = encodedInput.length * size;
    return [width, height];
  };

  const sizes = calcSizes(size, direction);



  return `<svg class="fac-it" style="width: ${sizes[0]}px; height: ${sizes[1]}px">
    ${renderedSVG}
  </svg>`;
};

/** Renders each encoded character as an SVG <g> element
 * @param {Array} char the hex value/s for a single character in the encoded string
 * @param {String} size the width || height of each CSS element
 * @param {String} direction "row" or "column"
 * @param {String} index 
 * @returns {Element} an SVG <g> element containing two <rect> elements
 */
const renderCharSVG = (char, size, direction, index) => {
  if (direction === "row") {
    return `<g>
      <rect
        height="${size}"
        width="${size}"
        y="0"
        x="${size * index + 1}"
        fill="${char[1] ? char[1] : char[0]}"
        shape-rendering="auto"
      />
      <rect
        height="${size}"
        width="${size}"
        y="${size}"
        x="${size * index + 1}"
        fill="${char[0]}"
        shape-rendering="auto"
      />  
    </g>`;
  }
  if (direction === "column") {
    return `<g>
        <rect
          height="${size}"
          width="${size}"
          y="${size * index + 1}"
          x="0"
          fill="${char[0]}"
          shape-rendering="auto"
        />
        <rect
          height="${size}"
          width="${size}"
          y="${size * index + 1}"
          x="${size}"
          fill="${char[1] ? char[1] : char[0]}"
          shape-rendering="auto"
        />  
      </g>`;
  }
};

/** Renders the encoded string as CSS HTML element
 * @param {Array} encodedInput the input string encoded as array of hex values
 * @param {Object} options type, size, and direction
 * @returns {Element} an vanilla div containing a div for each encoded character - ready to go into HTML code!
 */
const renderCSS = (encodedInput, options) => {
  const { type, size, direction } = { ...options };
  const renderedCSS = encodedInput
    .map((char) => renderCharCss(char, size, direction))
    .join("");
  return `<div class="fac-it" style="display:flex; flex-wrap: wrap; flex-direction:${direction};">${renderedCSS}</div>
  `;
};

/** Renders each encoded character as a CSS styled div element
 * @param {Array} char the hex value/s for a single character in the encoded string
 * @param {String} size the width || height of each CSS element
 * @param {String} direction "row" or "column"
 * @returns {Element} a single div with inline CSS
 */
const renderCharCss = (char, size, direction) => {
  let value;
  let gradientDirection;
  let orientation;

  if (direction === "row") {
    gradientDirection = "top";
    orientation = `width:${size}px; height:${size * 2}px`;
  }

  if (direction === "column") {
    gradientDirection = "right";
    orientation = `width:${size * 2}px; height:${size}px`;
  }

  if (char.length === 2) {
    value = `linear-gradient(to ${gradientDirection}, ${char[0]} 50%, ${char[1]} 50%)`;
  } else {
    value = char[0];
  }

  const res = `<div style="background:${value}; ${orientation}"></div>`;
  return res;
};

/** Rendering entrypoint - encodes input string and renders as SVG or HTML/CSS
 * @param {String} input 
 * @param {Object} options the options object
 * @returns a block of SVG or HTML/CSS 
 */
const render = (input, { type = "svg", size = "16", direction = "row" }) => {
  const encodedInput = encode(input);
  const options = { type, size, direction };

  return type === "svg"
    ? renderSVG(encodedInput, options)
    : renderCSS(encodedInput, options);
};

module.exports = {
  encode,
  render,
};