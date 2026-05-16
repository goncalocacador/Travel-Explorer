export default class DestinationModel {

    constructor(cityName) {
        this.cityName = cityName;
    }

    async getWeatherData() {

        const apiKey = "4ea476f30971706c3cfe7edddefe4761";

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&units=metric&appid=${apiKey}`;

        const response = await fetch(url);

        if(!response.ok) {
            throw new Error("Cidade não encontrada.");
        }

        const data = await response.json();

        return {
            city: data.name,
            temperature: data.main.temp,
            weather: data.weather[0].description,
            humidity: data.main.humidity
        };
    }

}