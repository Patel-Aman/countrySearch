let searchInput = document.getElementById("searchInput");
let resultCountries = document.getElementById("resultCountries");
let loading = document.getElementById("spinner");

let countries;

create = (country) => {
    let countryCard = document.createElement("div");
    countryCard.classList.add("country-card", "col-12", "col-md-6", "d-flex", "flex-column");

    let countryFlag = document.createElement("img");
    countryFlag.src = country["flag"];
    countryFlag.classList.add("country-flag");
    countryCard.appendChild(countryFlag);

    let countryName = document.createElement("span");
    countryName.classList.add("country-name");
    countryName.textContent = country["name"];
    countryCard.appendChild(countryName);

    let countryPopulation = document.createElement("span");
    countryPopulation.classList.add("country-population");
    countryPopulation.textContent = country["population"];
    countryCard.appendChild(countryPopulation);
    resultCountries.appendChild(countryCard);
}

createAndAppend = (countries) => {
    for (let country of countries) {
        create(country);
    }
}

loading.classList.remove("d-none");
let options = {
    method: "GET",
};
fetch("https://apis.ccbp.in/countries-data", options)
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonData) {
        loading.classList.add("d-none");
        countries = jsonData;
        console.log(jsonData);
        createAndAppend(countries);
    })


searchInput.addEventListener("keydown", () => {
    resultCountries.textContent = '';
    let result = countries.filter((eachConutry) => {
        if (eachConutry["name"].includes(searchInput.value))
            return true;
        else
            return false;
    })
    createAndAppend(result);
});
