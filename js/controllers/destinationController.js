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

        this.handleHistoryClick();

        this.searchHistory =
        JSON.parse(localStorage.getItem("searchHistory")) || [];

        this.view.renderSearchHistory(
            this.searchHistory
        );

        this.handleHistoryClick();

        this.themeToggle =
        document.getElementById("themeToggle");

        this.initializeTheme();

        this.handleThemeToggle();

        this.locationBtn =
        document.getElementById("locationBtn");

        this.handleCurrentLocation();
    }

    addEventListeners() {
            this.searchBtn.addEventListener("click", () => {

            this.searchDestination();
        });
    }

    async searchDestination(customCity = null) {

        const results =
        document.getElementById("results");

        results.innerHTML = "";

            const city =
            customCity ?? this.cityInput.value.trim();

        if(city === "") {

            this.view.renderError(
                "Por favor introduz uma cidade."
            );

            return;
        }

        this.view.showLoader();

        try {

            const destination =
            new DestinationModel(city);

            const weatherData =
            await destination.getWeatherData();

            this.view.renderWeather(weatherData);

            this.updateWeatherTheme(
                weatherData.weatherMain
            );

            this.saveSearchHistory(city);

            this.handleFavoriteButton(weatherData);

        } catch(error) {

            document.body.classList.remove(
            "sunny-theme",
            "cloudy-theme",
            "rainy-theme",
            "snow-theme",
            "default-theme"
        );

            this.view.renderError(
                "Não foi possível encontrar a cidade pesquisada."
            );

        } finally {

            this.view.hideLoader();
        }
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

        body.classList.remove(
            "sunny-theme",
            "cloudy-theme",
            "rainy-theme",
            "snow-theme",
            "default-theme"
        );

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

        saveSearchHistory(city) {

        this.searchHistory =
        this.searchHistory.filter(
            item => item !== city
        );

        this.searchHistory.unshift(city);

        if(this.searchHistory.length > 8) {

            this.searchHistory.pop();
        }

        localStorage.setItem(
            "searchHistory",
            JSON.stringify(this.searchHistory)
        );

        this.view.renderSearchHistory(
            this.searchHistory
        );

        this.handleHistoryClick();
    }

        handleHistoryClick() {

            const historyItems =
            document.querySelectorAll(".history-item");

            historyItems.forEach(item => {

                item.addEventListener("click", async () => {

                    const city =
                    item.dataset.city;

                    this.cityInput.value = city;

                    await this.searchDestination(city);
                });
            });
        }

        initializeTheme() {

            const savedTheme =
            localStorage.getItem("theme");

            if(savedTheme === "dark") {

                document.body.classList.add("dark-mode");

                this.themeToggle.textContent = "☀️";
            }
        }

        handleThemeToggle() {

            this.themeToggle.addEventListener("click", () => {

                document.body.classList.toggle("dark-mode");

                const isDark =
                document.body.classList.contains("dark-mode");

                localStorage.setItem(
                    "theme",
                    isDark ? "dark" : "light"
                );

                this.themeToggle.textContent =
                isDark ? "☀️" : "🌙";
            });
        }

        handleCurrentLocation() {

        this.locationBtn.addEventListener("click", () => {

            if(!navigator.geolocation) {

                this.view.renderError(
                    "Geolocalização não suportada."
                );

                return;
            }

            this.view.showLoader();

            navigator.geolocation.getCurrentPosition(

                async (position) => {

                    try {

                        const lat =
                                position.coords.latitude;

                                const lon =
                                position.coords.longitude;

                                const destination =
                                new DestinationModel("");

                                const city =
                                    await destination.getMainCityByCoordinates(
                                        lat,
                                        lon
                                    );

                                await this.searchDestination(city);

                    } catch(error) {

                        this.view.renderError(
                            "Não foi possível obter a localização."
                        );
                    }
                },

                () => {

                    this.view.renderError(
                        "Permissão de localização negada."
                    );
                }
            );
        });
    }
}