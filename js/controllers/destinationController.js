import DestinationModel from "../models/destinationModel.js";
import DestinationView from "../views/destinationView.js";
import FavoriteModel from "../models/favoriteModel.js";

export default class DestinationController {

    constructor() {

        this.view = new DestinationView();

        this.searchBtn = document.getElementById("searchBtn");
        this.cityInput = document.getElementById("cityInput");

        this.favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        this.view.renderFavorites(this.favorites);

        this.addEventListeners();

        this.favoriteSearch =
        document.getElementById("favoriteSearch");

        this.favoriteSort =
        document.getElementById("favoriteSort");

        this.handleFavoriteSearch();

        this.handleFavoriteSort();

        this.initializeFavoriteEvents();
    }

    addEventListeners() {

        this.searchBtn.addEventListener("click", async () => {

            const city = this.cityInput.value.trim();

            if(city === "") {
                this.view.renderError("Por favor introduz uma cidade.");
                return;
            }

            try {

    this.view.renderLoading();

    const destination = new DestinationModel(city);

    const weatherData = await destination.getWeatherData();

    this.view.renderWeather(weatherData);

        this.updateWeatherTheme(
        weatherData.weatherMain
    );
    this.handleFavoriteButton(weatherData);

            } catch(error) {

                this.view.renderError(error.message);
            }
        });
    }

    handleFavoriteButton(weatherData) {

    const favoriteBtn = document.getElementById("favoriteBtn");

    favoriteBtn.addEventListener("click", () => {

        const exists = this.favorites.some(
            favorite => favorite.city === weatherData.city
        );

        if(exists) {

            this.view.showNotification(
                "Este destino já está nos favoritos."
            );

            return;
        }

        const favorite = new FavoriteModel(
            weatherData.city,
            weatherData.country,
            weatherData.temperature,
            weatherData.image
        );

        this.favorites.push(favorite);

        localStorage.setItem(
            "favorites",
            JSON.stringify(this.favorites)
        );

        this.view.renderFavorites(this.favorites);

        this.view.showNotification(
            "Destino adicionado aos favoritos."
        );
    });
}


        handleRemoveFavorite() {

            const favoritesList =
            document.getElementById("favoritesList");

            favoritesList.addEventListener("click", (event) => {

                if(event.target.tagName !== "BUTTON") {
                    return;
                }

                const city =
                event.target.dataset.city;

                this.favorites =
                this.favorites.filter(
                    favorite => favorite.city !== city
                );

                localStorage.setItem(
                    "favorites",
                    JSON.stringify(this.favorites)
                );

                this.view.renderFavorites(this.favorites);
            });
        }


        handleFavoriteSearch() {

    this.favoriteSearch.addEventListener("input", () => {

        const value =
        this.favoriteSearch.value.toLowerCase();

        const filteredFavorites =
        this.favorites.filter(favorite =>

            favorite.city.toLowerCase().includes(value)
        );

        this.view.renderFavorites(filteredFavorites);

        this.handleRemoveFavorite();
    });
}

    handleFavoriteSort() {

        this.favoriteSort.addEventListener("change", () => {

            const value = this.favoriteSort.value;

            if(value === "name") {

                this.favorites.sort((a, b) =>
                    a.city.localeCompare(b.city)
                );
            }

            if(value === "temperature") {

                this.favorites.sort((a, b) =>
                    b.temperature - a.temperature
                );
            }

            if(value === "date") {

                this.favorites.reverse();
            }

            this.view.renderFavorites(this.favorites);

            this.handleRemoveFavorite();
        });
    }

    initializeFavoriteEvents() {

        this.handleRemoveFavorite();
    }

        updateWeatherTheme(weatherType) {

        const body = document.body;

        body.className = "";

        if(weatherType === "Clear") {

            body.classList.add("sunny-theme");
        }

        else if(weatherType === "Clouds") {

            body.classList.add("cloudy-theme");
        }

        else if(weatherType === "Rain") {

            body.classList.add("rainy-theme");
        }

        else if(weatherType === "Snow") {

            body.classList.add("snow-theme");
        }

        else {

            body.classList.add("default-theme");
        }
    }

}