const searchToggle = document.querySelector(".fa-search");
const inputSearch = document.querySelector("input");
const form = document.querySelector("form");
const input = document.querySelector("input");

const container = document.querySelector(".main-container");

searchToggle.addEventListener("click", (e) => {
  searchToggle.classList.toggle("fa-times");
  inputSearch.classList.toggle("active");
});

let API_KEY = "4d8fb5b93d4af21d66a2948710284366";

async function getData(URL) {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}

async function addToDom(URL , name1=undefined) {
  input.placeholder = 'Search...'
  const data = await getData(URL);
  const dataMain = data.main;
  if (dataMain === undefined){
    alert("Sorry, city is not found !");
    let inputVal = "layyah";
    URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${API_KEY}&units=metric`;
    addToDom(URL,'My City Layyah');
    input.placeholder = `Love this city ...`
  }

  const { main, name, sys, weather } = data;
  const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
  const tempBox = document.createElement("div");
  tempBox.classList.add("tempBox");
  tempBox.innerHTML = `

  <div class="tempBox">
          <div class="country-info">
            <h2 class="cityname">${name1 ? name1 : name}</h2>
            <sup>${sys.country}</sup>
          </div>
          <div class="temp-info">
            <h1>${main.temp}</h1>
            <sup>°C</sup>
          </div>
          <div class="imgBx">
            <img src="${icon}" alt="tempImg" />
          </div>
          <div class="descript">
            <p>${weather[0]["description"]}</p>
          </div>
        </div>

  `;

  container.appendChild(tempBox);
}

const cities = [
  "layyah",
  "lahore",
  "islamabad",
  "quetta",
  "faisalabad",
  "peshawar",
  "london",
  "new york",
];
function InitialCities() {
  cities.forEach((city) => {
    let inputVal = city;
    URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${API_KEY}&units=metric`;
    addToDom(URL);
  });
}

InitialCities();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  container.innerHTML = "";
  let inputVal = input.value;
  URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${API_KEY}&units=metric`;
  addToDom(URL);
  input.value = "";
});
