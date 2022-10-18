// URLs das APIs
const apiKey = "123";
const apiFlagCountry = "https://countryflagsapi.com/png/";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

// Elementos DOM

const weatherContainer = document.querySelector("#wheater-data");
const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");
const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const wheaterIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const umidityElement = document.querySelector("#spanHumidity");
const windElement = document.querySelector("#spanWind");
const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");
const suggestionContainer = document.querySelector("#suggestion");
const suggestionButtons = document.querySelectorAll("#suggestion button");

// Funções
const getWeatherData = async (city) => {
  toggleLoader();
  const apiWheaterURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
  const res = await fetch(apiWheaterURL);
  const data = await res.json();
  toggleLoader();
  return data;
};

const toggleLoader = () => {
  loader.classList.toggle("hide");
};

const showErrorMessage = () => {
  errorMessageContainer.classList.remove("hide");
};

const hideInformation = () => {
  errorMessageContainer.classList.add("hide");
  weatherContainer.classList.add("hide");

  suggestionContainer.classList.add("hide");
};

const showWeatherData = async (city) => {
  hideInformation();
  const data = await getWeatherData(city);
  if (data.cod == "404") {
    showErrorMessage();
    return;
  }
  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp);
  descElement.innerText = data.weather[0].description;
  umidityElement.innerText = `${data.main.humidity}%`;
  windElement.innerText = `${parseInt(data.wind.speed)} km/h`;

  //mudar img background

  document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;

  // Flags
  wheaterIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  );

  countryElement.setAttribute(
    "src",
    `https://countryflagsapi.com/png/${data.sys.country}`
  );

  weatherContainer.classList.remove("hide");
};

// Eventos

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const city = cityInput.value;

  showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    const city = e.target.value;
    showWeatherData(city);
  }
});

suggestionButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const city = btn.getAttribute("id");
    showWeatherData(city);
  });
});
