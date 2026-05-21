export default class DestinationView {

    renderLoading() {

        const results = document.getElementById("results");

        results.innerHTML = `
            <div class="card">
                <p>A carregar informações do destino...</p>
            </div>
        `;
    }

    renderWeather(data) {

    const results = document.getElementById("results");

    results.innerHTML = `

        <div class="card">

            <img src="${data.image}" 
                alt="${data.city}"
                class="destination-image">

            <img src="${data.flag}" 
                alt="Bandeira"
                class="flag">

            <div class="weather-header">

                <div class="weather-emoji">

                ${this.getWeatherEmoji(data.weatherMain)}

            </div>

                <h2>${data.city}, ${data.country}</h2>

            </div>

            <p><strong>Capital:</strong> ${data.capital}</p>

            <div class="weather-status">

                <span class="weather-badge">

                    ${this.getWeatherEmoji(data.weatherMain)}
                    ${data.weather}
                </span>

            </div>

            <p><strong>População:</strong> ${data.population.toLocaleString()}</p>

            <hr>

            <p><strong>Temperatura:</strong> ${data.temperature}°C</p>

            <p><strong>Clima:</strong> ${data.weather}</p>

            <p><strong>Humidade:</strong> ${data.humidity}%</p>

            <div class="forecast-section">

                <h3>
                    📅 Previsão próximos dias
                </h3>

                <div class="forecast-grid">

                    ${data.forecast.map(day => `

                        <div class="forecast-card">

                            <p>

                                ${new Date(day.dt_txt)
                                    .toLocaleDateString("pt-PT", {
                                        weekday: "short"
                                    })}

                            </p>

                            <div class="forecast-emoji">

                                ${this.getWeatherEmoji(day.weather[0].main)}

                            </div>

                            <h4>
                                ${Math.round(day.main.temp)}°C
                            </h4>

                            <span>
                                ${day.weather[0].description}
                            </span>

                        </div>

                    `).join("")}

                </div>

            </div>
             
                    <button class="favorite-btn" id="favoriteBtn">
                        Guardar nos Favoritos
                    </button>

        </div>
    `;
}
    
    renderFavorites(favorites) {

    const favoritesList = document.getElementById("favoritesList");

    if(favorites.length === 0) {

        favoritesList.innerHTML = `
            <p>Nenhum destino favorito guardado.</p>
        `;

        return;
    }

    favoritesList.innerHTML = favorites.map(favorite => `

        <div class="favorite-card">

            <img src="${favorite.image}" alt="${favorite.city}">

            <div class="favorite-content">

                <h4>${favorite.city}, ${favorite.country}</h4>

                <p>
                    🌡️ ${favorite.temperature}°C
                </p>

                <p>
                    📅 Guardado em:
                    ${favorite.addedAt}
                </p>

                <button data-city="${favorite.city}">
                    Remover
                </button>

            </div>

        </div>

    `).join("");
}

    showNotification(message) {

        const notification = document.createElement("div");

        notification.classList.add("notification");

        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

        getWeatherEmoji(weatherType) {

        const weatherIcons = {

            Clear: "☀️",

            Clouds: "☁️",

            Rain: "🌧️",

            Snow: "❄️",

            Thunderstorm: "⛈️",

            Drizzle: "🌦️",

            Mist: "🌫️"
        };

        return weatherIcons[weatherType] || "🌍";
    }

    renderSearchHistory(history) {

        const historyList =
        document.getElementById("historyList");

        if(history.length === 0) {

            historyList.innerHTML = `
                <p>Sem pesquisas recentes.</p>
            `;

            return;
        }

        historyList.innerHTML = history.map(city => `

            <div class="history-item"
                data-city="${city}">

                ${city}

            </div>

        `).join("");
    }

    showLoader() {

        const results =
        document.getElementById("results");

        results.innerHTML = `

            <div class="loader-container">

                <div class="loader"></div>

                <p>
                    A carregar informações do destino...
                </p>

            </div>

        `;
    }

    hideLoader() {

        const loader =
        document.querySelector(".loader-container");

        if(loader) {

            loader.remove();
        }
    }

    renderError(message) {

    const results =
    document.getElementById("results");

    results.innerHTML = "";

    results.innerHTML = `

        <div class="error-card">

            <div class="error-icon">

                ⚠️

            </div>

            <h3>
                Ocorreu um erro
            </h3>

            <p>
                ${message}
            </p>

        </div>

    `;
}

renderStatistics(history, favorites) {

    const statisticsContainer =
    document.getElementById(
        "statisticsContainer"
    );

    const totalSearches =
    history.length;


    const totalFavorites =
    favorites.length;

    const cityCount = {};

    history.forEach(city => {

        cityCount[city] =
        (cityCount[city] || 0) + 1;
    });

    let mostSearched =
    "N/A";

    let max = 0;

    for(const city in cityCount) {

        if(cityCount[city] > max) {

            max = cityCount[city];

            mostSearched = city;
        }
    }

    let averageTemperature = 0;

    if(favorites.length > 0) {

        const totalTemperature =
        favorites.reduce(

            (sum, favorite) =>

                sum + favorite.temperature,

            0
        );

        averageTemperature =
        Math.round(
            totalTemperature /
            favorites.length
        );
    }

    statisticsContainer.innerHTML = `

        <div class="stat-card">

            <h4>
                🔍 Pesquisas
            </h4>

            <p>
                ${totalSearches}
            </p>

        </div>

        <div class="stat-card">

            <h4>
                ⭐ Favoritos
            </h4>

            <p>
                ${totalFavorites}
            </p>

        </div>

        <div class="stat-card">

            <h4>
                🏙️ Cidade Popular
            </h4>

            <p>
                ${mostSearched}
            </p>

        </div>

        <div class="stat-card">

            <h4>
                🌡️ Média Temp.
            </h4>

            <p>
                ${averageTemperature}°C
            </p>

        </div>
    `;
}

}