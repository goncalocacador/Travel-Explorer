export default class DestinationModel {

    constructor(cityName) {
        this.cityName = cityName;
    }

    async getWeatherData() {

            const apiKey =
            "4ea476f30971706c3cfe7edddefe4761";

            const weatherUrl =

            `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&units=metric&appid=${apiKey}&lang=pt`;

            const weatherResponse =
            await fetch(weatherUrl);

            if(!weatherResponse.ok) {

                throw new Error(
                    "Cidade não encontrada."
                );
            }

            const weatherData =
            await weatherResponse.json();

            return this.buildWeatherData(weatherData);
        }


        async getForecastData(lat, lon) {

        const response = await fetch(

            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=4ea476f30971706c3cfe7edddefe4761&units=metric&lang=pt`

        );

                const data = await response.json();

                return data.list.filter(item =>
                    item.dt_txt.includes("12:00:00")
                ).slice(0, 5);
            }


        async getMainCityByCoordinates(lat, lon) {

                const response = await fetch(

                    `https://secure.geonames.org/findNearbyPlaceNameJSON?lat=${lat}&lng=${lon}&username=goncalocacador&lang=pt`

                );

                const data =
                await response.json();

                return data.geonames[0].name;
            }
        

        async getCityImage(cityName) {

                const unsplashKey =
                "c98ao0BAlVOpN08nCF7gNxD0vpgGKKSgGWUGp102Vq8";

                const imageUrl =

                `https://api.unsplash.com/search/photos?page=1&query=${cityName}&client_id=${unsplashKey}&lang=pt`;

                const imageResponse =
                await fetch(imageUrl);

                const imageData =
                await imageResponse.json();

                return imageData.results[0]?.urls?.regular ||

                "https://via.placeholder.com/800x400?text=Imagem+Indisponivel";
            }

        async buildWeatherData(weatherData) {

            const countryResponse = await fetch(

                `https://restcountries.com/v3.1/alpha/${weatherData.sys.country}`

            );

            const countryData =
            await countryResponse.json();

            const image =
                await this.getCityImage(weatherData.name);

            const forecast =
            await this.getForecastData(
                weatherData.coord.lat,
                weatherData.coord.lon
            );

            return {

                city: weatherData.name,

                country:
                countryData[0].name.common,

                capital:
                countryData[0].capital[0],

                population:
                countryData[0].population,

                flag:
                countryData[0].flags.png,

                temperature:
                Math.round(weatherData.main.temp),

                humidity:
                weatherData.main.humidity,

                weather:
                weatherData.weather[0].description,

                weatherMain:
                weatherData.weather[0].main,

                icon:
                weatherData.weather[0].icon,

                image,

                forecast
            };
        }

}