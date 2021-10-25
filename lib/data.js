
const hex = [
    "#ffffff",
    "#33bcad",
    "#ffff00",
    "#8781bd",
    "#f58220",
    "#8ed8f8",
    "#f6adcd",
    "#584099",
    "#ec008c",
    "#00aeef",
  ];
  
  const symbols = [
    "•",
    "!",
    '"',
    "£",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "_",
    "+",
    "{",
    "}",
    "[",
    "]",
    ":",
    ";",
    "@",
    "'",
    "<",
    ">",
    "?",
    "/",
    ",",
    ".",
    "#",
    "~",
    "`",
    "¬",
    "|",
    "\\",
  ];
  
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  
  const alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  
  const validChar = [...numbers, " ", ...alphabet];

  module.exports = {
    hex,
    symbols,
    numbers,
    validChar
  }