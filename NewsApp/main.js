
const apiKey = '3b3e63a624fd482dbf6d66c1aec24270';

const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");

const country = "in";
const options = [
  "general",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

let url;

const newsCard = (articles) => {
    container.innerHTML = ""; 

    for (let item of articles) {
        let card = document.createElement("div");
        card.classList.add("news-card");
        card.innerHTML = `<div class="news-image-container">
        <img src="${item.urlToImage || "./newspaper.jpg"}" alt="" />
    </div>
    <div class="news-content">
        <div class="news-title">${item.title}</div>

        <div class="news-description">
      ${item.description || item.content || ""}
      </div>
      <a href="${item.url}" target="_blank" class="view-button">Read More</a>
    </div>`;
    container.appendChild(card);
    }
};

const selectCategory = (event, category) => {
  const buttons = document.querySelectorAll(".option");
  buttons.forEach((button) => {
    button.classList.remove("active");
  });
  event.target.classList.add("active");

  url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
  getNews();
};

const getNews = async () => {
    let response = await fetch(url);
    if (!response.ok) {
        alert("Data unavailable at the moment.");
        return false;
    }
    let data = await response.json();
    newsCard(data.articles);
};

const createOptions = () => {
    for (let option of options) {
      optionsContainer.innerHTML += `<button class="option ${
        option == "general" ? "active" : ""
      }" onclick="selectCategory(event, '${option}')">${option}</button>`;
    }
};

const init = () => {
    createOptions();
    const defaultCategory = "general";
    const defaultCategoryButton = optionsContainer.querySelector(`button.${defaultCategory}`);
    if (defaultCategoryButton) {
        defaultCategoryButton.click();
    }
};


window.onload = () => {
    url = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`;
    init();
};
