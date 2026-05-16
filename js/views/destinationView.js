export default class DestinationView {

    renderDestination(destination) {

        const results = document.getElementById("results");

        results.innerHTML = `
            <h3>Informações do destino</h3>

            <div class="card">
                <h2>${destination.cityName}</h2>
                <p>Destino pesquisado com sucesso.</p>
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