export default class FavoriteModel {

    constructor(city, country, temperature, image) {

        this.city = city;
        this.country = country;
        this.temperature = temperature;
        this.image = image;

        this.addedAt = new Date().toLocaleDateString();
    }

}