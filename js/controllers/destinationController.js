import DestinationModel from "../models/destinationModel.js";
import DestinationView from "../views/destinationView.js";

export default class DestinationController {

    constructor() {

        this.view = new DestinationView();

        this.searchBtn = document.getElementById("searchBtn");
        this.cityInput = document.getElementById("cityInput");

        this.addEventListeners();
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

            } catch(error) {

                this.view.renderError(error.message);
            }
        });
    }

}