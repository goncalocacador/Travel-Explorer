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
             
                    <button class="favorite-btn" id="favoriteBtn">
                        Guardar nos Favoritos
                    </button>

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

}