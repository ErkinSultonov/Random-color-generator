/*
 * This is the JS to implement the UI for my color generator that generates
 * different colors and displays it to the user. The colors are generated
 * by choosing random shades of red, green and blue (RGB) colors.
 */
"use strict";
(function() {
  window.addEventListener("load", init);
  let timer;
  const MESSAGE_DELAY = 1000;
  const RGB_MAXIMUM = 256;
  const HEX_CONVERTER = 16;

  /**
   * Functions that will be called when page reloaded/opened.
   */
  function init() {
    // Generates color when page is reloaded or opened
    generateRGB();

    let generateButton = qs("#generate");

    // Generates color when generate button is clicked
    generateButton.addEventListener("click", generateRGB);

    let rgbButton = qs("#copy-rgb");

    // Copies color code when "copy rgb" button is clicked
    rgbButton.addEventListener("click", function() {
      copyColor(true);
    });

    let hexButton = qs("#copy-hex");

    // Copies color code when "copy hex" button is clicked
    hexButton.addEventListener("click", function() {
      copyColor(false);
    });
  }

  /**
   * Copies the color code according to pressed button.
   * @param {boolean} isRGB - type of the button pressed used to distinguish between "copy rgb"
   *                          and "copy hex" button
   */
  function copyColor(isRGB) {
    let selector;
    if (isRGB) {
      selector = qs('#rgb-result span');
    } else {
      selector = qs('#hex-result span');
    }
    navigator.clipboard.writeText(selector.textContent).then(function() {
      copyMessage(isRGB);
    });
  }

  /**
   * Displays the message when the color code is copied successfully
   * @param {boolean} isRGB - type of the button pressed used to distinguish between "copy rgb"
   *                          and "copy hex" button
   */
  function copyMessage(isRGB) {
    clearTimeout(timer);
    let message = qs('#message');

    let messageText = qs("#message #type");
    if (isRGB) {
      messageText.innerText = "RGB";
    } else {
      messageText.innerText = "Hex";
    }

    message.classList.remove("hidden");
    timer = setTimeout(function() {
      message.classList.add("hidden");
    }, MESSAGE_DELAY);
  }

  /**
   * Generates a random color.
   */
  function generateRGB() {

    // Generates random red color
    let red = Math.floor(Math.random() * RGB_MAXIMUM);

    // Generates random green color
    let green = Math.floor(Math.random() * RGB_MAXIMUM);

    // Generates random blue color
    let blue = Math.floor(Math.random() * RGB_MAXIMUM);
    let finalRGB = "rgb(" + red + ", " + green + ", " + blue + ")";

    qs("main").style.backgroundColor = finalRGB;

    let oldChildRGB = qs('#rgb-result span');
    let newChildRGB = document.createElement("span");
    newChildRGB.innerText = finalRGB;
    qs("#rgb-result").replaceChild(newChildRGB, oldChildRGB);

    let oldChildHex = qs('#hex-result span');
    let newChildHex = document.createElement("span");
    newChildHex.innerText = rgbToHex(red, green, blue);
    qs("#hex-result").replaceChild(newChildHex, oldChildHex);
  }

  /**
   * Takes in three shades for red, green, and blue colors and converts RGB code to Hex code
   * @param {int} red - number between 0 to 255 used to transform rgb code to hex code
   * @param {int} green - number between 0 to 255 used to transform rgb code to hex code
   * @param {int} blue - number between 0 to 255 used to transform rgb code to hex code
   * @returns {string} - converted Hex color code
   */
  function rgbToHex(red, green, blue) {
    let redStr = Number(red).toString(HEX_CONVERTER);
    let greenStr = Number(green).toString(HEX_CONVERTER);
    let blueStr = Number(blue).toString(HEX_CONVERTER);
    if (redStr.length === 1) {
      redStr = "0" + redStr;
    }
    if (greenStr.length === 1) {
      greenStr = "0" + greenStr;
    }
    if (blueStr.length === 1) {
      blueStr = "0" + blueStr;
    }
    return "#" + redStr + greenStr + blueStr;
  }

  /**
   * Finds the element with the specified attribute.
   * @param {string} selector - element selector
   * @returns {HTMLElement} DOM object associated with specified attribute.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }
})();