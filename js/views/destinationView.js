export default class DestinationView {

    renderWeather(data) {

        const results = document.getElementById("results");

        results.innerHTML = `
            <h3>Informações do destino</h3>

            <div class="card">
                <h2>${data.city}</h2>

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