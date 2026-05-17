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
        <h3>Informações do destino</h3>

        <div class="card">

            <img src="${data.image}" 
                alt="${data.city}"
                class="destination-image">

            <img src="${data.flag}" 
                alt="Bandeira"
                class="flag">

            <h2>${data.city}, ${data.country}</h2>

            <p><strong>Capital:</strong> ${data.capital}</p>

            <p><strong>Região:</strong> ${data.region}</p>

            <p><strong>População:</strong> ${data.population.toLocaleString()}</p>

            <hr>

            <p><strong>Temperatura:</strong> ${data.temperature}°C</p>

            <p><strong>Clima:</strong> ${data.weather}</p>

            <p><strong>Humidade:</strong> ${data.humidity}%</p>
             
        </div>
    `;
}

    renderError(message) {

        const results = document.getElementById("results");

        results.innerHTML = `
            <div class="card">
                <p>${message}</p>
            </div>
        `;
    }

}