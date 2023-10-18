const electronicRosary = document.getElementById("electronic-rosary");
const bodyElement = document.querySelector("body");
const colors = document.getElementById("colors");
const darkMood = document.getElementById("dark-mood");
const lightMood = document.getElementById("light-mood");
const buttonTheme = document.getElementById("button-theme");
const themeText = document.getElementById("theme-text");
const buttonReset = document.getElementById("button-reset");
const screen = document.getElementById("screen");
const buttonCounter = document.getElementById("counter");
const morningAzkar = document.getElementById("morning-azkar");
const eveningAzkar = document.getElementById("evening-azkar");
let theme = "";
let textColor = "";
let counter = 0;
const hexNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
const getColor = JSON.parse(localStorage.getItem("color")) || "";
const getTextColor = JSON.parse(localStorage.getItem("text-color"));
const BASE_URL = "https://api-azkar.onrender.com/";
electronicRosary.style.backgroundColor = getColor;
/*                                      change color card    */

function generateHexColor() {
  let randomColors = [];
  for (let i = 0; i < 6; i++) {
    randomColors.push(
      hexNumbers[Math.floor(Math.random() * hexNumbers.length)]
    );
  }
  return `#${randomColors.join("")}`;
}
/*        function to convert HexColor to RgbColor        */
function hexToRgb(hex) {
  const hexxCode = hex.replace(/#/, "");
  // console.log("hexxCode", hexxCode);
  const red = parseInt(hexxCode.substring(0, 2), 16);
  const green = parseInt(hexxCode.substring(2, 4), 16);
  const blue = parseInt(hex.substring(5, 7), 16);
  // console.log("red", red, "...", "green", green, "...", "blue", blue);
  return [red, green, blue];
}
colors.addEventListener("click", () => {
  let saveColor = generateHexColor();
  let colorRgb = hexToRgb(generateHexColor());
  const averageColor = (colorRgb[0] + colorRgb[1] + colorRgb[2]) / 3;
  if (averageColor > 128) {
    //background color light
    console.log("background color light");
    bodyElement.classList.add("dark-text");
    textColor = "dark-text";
    localStorage.setItem("text-color", JSON.stringify(textColor));
  } else {
    //background color dark
    console.log("background color dark");
    bodyElement.classList.remove("dark-text");
    textColor = "light-text";
    localStorage.setItem("text-color", JSON.stringify(textColor));
  }
  localStorage.setItem("color", JSON.stringify(saveColor));
  electronicRosary.style.backgroundColor = saveColor;
  colorNav.style.backgroundColor = saveColor;
});
if (getTextColor === "dark-text") {
  // console.log("text color dark");
  bodyElement.classList.add("dark-text");
} else {
  // console.log("text color light");
  bodyElement.classList.remove("dark-text");
}

/*                     Dark Or Light Mood                 */
buttonTheme.addEventListener("click", () => {
  bodyElement.classList.toggle("dark-mood");
  const classAttributeValue = bodyElement.getAttribute("class");
  // console.log("classAttributeValue = " + classAttributeValue);
  if (classAttributeValue.includes("dark-mood")) {
    theme = "dark";
    // console.log("theme = " + theme);
    localStorage.setItem("theme", JSON.stringify(theme));
    themeText.textContent = "Light";
  } else {
    theme = "light";
    localStorage.setItem("theme", JSON.stringify(theme));
    themeText.textContent = "Dark";
  }
});

const getTheme = JSON.parse(localStorage.getItem("theme"));
if (getTheme === "dark") {
  console.log("dark");
  bodyElement.classList.add("dark-mood");
  themeText.textContent = "Light";
} else if (getTheme === "light") {
  console.log("light");
  bodyElement.classList.remove("dark-mood");
  themeText.textContent = "Dark";
}
/*                          Counter                       */
buttonCounter.addEventListener("click", () => {
  counter++;
  // console.log('counter', counter);
  screen.textContent = counter;
});

/*                         Reset Counter                   */
buttonReset.addEventListener("click", () => {
  // console.log('reset');
  counter = 0;
  screen.textContent = counter;
});
/*                         Fetch Api-data                  */
let getDataMorningAzkar = async function () {
  const response = await fetch(`${BASE_URL}morning-azkar`);
  const data = await response.json();
  console.log("data", data);
  let listOfAzkar = data.content;
  console.log("listOfAzkar", listOfAzkar);
  displayMorningAzkar(listOfAzkar);
};
let getDataEveningingAzkar = async function () {
  const response = await fetch(`${BASE_URL}evening-azkar`);
  const data = await response.json();
  console.log("data", data);
  let listOfAzkar = data.content;
  console.log("listOfAzkarEven", listOfAzkar);
  displayEveningingAzkar(listOfAzkar);
};
getDataEveningingAzkar();
getDataMorningAzkar();
function displayMorningAzkar(listOfData) {
  console.log("listOfData", listOfData);
  let templateContent = "";
  for (let i = 0; i < listOfData.length; i++) {
    templateContent += `
    <div class="card">
    <div class="repeat"><span> ${listOfData[i].repeat}</span></div>
    <div class="zekr">
      <p>
      ${listOfData[i].zekr}
      </p>
      <p>${listOfData[i].bless}</p>
    </div>
  </div>
    `;
  }
  morningAzkar.innerHTML = templateContent;
  eveningAzkar.innerHTML = templateContent;
}
function displayEveningingAzkar(listOfData) {
  console.log("listOfDataenee", listOfData);
  let templateContent = "";
  for (let i = 0; i < listOfData.length; i++) {
    templateContent += `
      <div class="card">
      <div class="repeat"><span> ${listOfData[i].repeat}</span></div>
      <div class="zekr">
        <p>
        ${listOfData[i].zekr}
        </p>
        <p>${listOfData[i].bless}</p>
      </div>
    </div>
      `;
  }

  eveningAzkar.innerHTML = templateContent;
}
