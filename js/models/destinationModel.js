export default class DestinationModel {

    constructor(cityName) {
        this.cityName = cityName;
    }

    async getWeatherData() {

        const apiKey = "4ea476f30971706c3cfe7edddefe4761";

        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&units=metric&appid=${apiKey}`;

        const weatherResponse = await fetch(weatherUrl);

        if(!weatherResponse.ok) {
            throw new Error("Cidade não encontrada.");
        }

        const weatherData = await weatherResponse.json();

        const countryCode = weatherData.sys.country;

        const countryUrl = `https://restcountries.com/v3.1/alpha/${countryCode}`;

        const countryResponse = await fetch(countryUrl);

        const countryData = await countryResponse.json();

        const unsplashKey = "c98ao0BAlVOpN08nCF7gNxD0vpgGKKSgGWUGp102Vq8";

        const imageUrl = `https://api.unsplash.com/search/photos?page=1&query=${this.cityName}&client_id=${unsplashKey}`;

        const imageResponse = await fetch(imageUrl);

        const imageData = await imageResponse.json();

        const destinationImage = imageData.results[0]?.urls?.regular ||
        "https://via.placeholder.com/800x400?text=Imagem+Indisponivel";

        return {
            city: weatherData.name,
            temperature: weatherData.main.temp,
            weather: weatherData.weather[0].description,
            humidity: weatherData.main.humidity,

            country: countryData[0].name.common,
            capital: countryData[0].capital[0],
            population: countryData[0].population,
            region: countryData[0].region,
            flag: countryData[0].flags.png,

            image: destinationImage
        };
    }

}