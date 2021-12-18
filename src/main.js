const timeCard = document.querySelector("#time-card");
const periods = document.querySelector(".periods");

periods.addEventListener("input", (event) => {
  if (event.target.checked) {
    populateCards(event.target.value);
  }
});

function populateCards(period) {
  timeCard.innerHTML = "";
  fetch("../data.json")
    .then((res) => res.json())
    .then((cardsArray) => {
      cardsArray.forEach((cardData) => {
        const fullCard = document.createElement("div");
        const card = document.createElement("div");
        const cardMenu = document.createElement("div");
        const h1 = document.createElement("h1");
        const button = document.createElement("button");
        const img = document.createElement("img");
        const timeValues = document.createElement("div");
        const pValue = document.createElement("p");
        const pPrevious = document.createElement("p");

        const cardTitle = cardData.title.toLowerCase().includes(" ")
          ? cardData.title.toLowerCase().replace(" ", "-")
          : cardData.title.toLowerCase();

        fullCard.appendChild(card);
        fullCard.classList.add("full-card");
        fullCard.classList.add(cardTitle);
        fullCard.style.backgroundImage = `url("../images/icon-${cardTitle}.svg")`;

        card.appendChild(cardMenu);
        card.appendChild(timeValues);
        card.classList.add("card");

        cardMenu.appendChild(h1);
        cardMenu.appendChild(button);
        cardMenu.classList.add("card-menu");

        h1.textContent = cardData.title;

        button.appendChild(img);
        img.src = `../images/icon-ellipsis.svg`;
        img.alt = `3 dot menu`;

        timeValues.appendChild(pValue);
        timeValues.appendChild(pPrevious);
        timeValues.classList.add("time-values");

        pValue.textContent = `${cardData.timeframes[period].current}hrs`;
        if (period === "daily") {
          pPrevious.textContent = `Yesterday - ${cardData.timeframes[period].previous}hrs`;
        } else if (period === "weekly") {
          pPrevious.textContent = `Last Week - ${cardData.timeframes[period].previous}hrs`;
        } else {
          pPrevious.textContent = `Last Month - ${cardData.timeframes[period].previous}hrs`;
        }

        timeCard.appendChild(fullCard);
      });
    });
}

populateCards("weekly");
