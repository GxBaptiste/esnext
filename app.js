let cl = console.log;

let favoriteCityId = "rome";
cl(favoriteCityId);

favoriteCityId = "paris";
cl(favoriteCityId);

const citiesId = ["paris", "nyc", "rome", "rio-de-janeiro"];
cl(citiesId);
//citiesld = [];

citiesId.push("tokyo");
cl(citiesId);

function getWeather(cityId) {
    let city = cityId.toUpperCase();
    let temperature = 20;
    return { city, temperature };
}

const weather = getWeather(favoriteCityId);
cl(weather);

let { city, temperature } = weather;
let { city: newCity, temperature: newTemperature } = weather;
cl(city + " " + temperature);
cl(newCity + " " + newTemperature);

let [parisId, nycId, ...otherCitiesLd] = citiesId;
cl(parisId);
cl(nycId);
cl(otherCitiesLd.length);

class Trip {
    constructor(id, name, imageUrl) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
    }

    get price() {
        return this._price;
    }

    set price(newPrice) {
        this._price = newPrice;
    }

    static getDefaultTrip() {
        return new Trip("rio-de-janeiro", "Rio de Janeiro", "img/rio-de-janeiro.jpg");
    }

    toString() {
        return "Trip [" + this.id + ", " + this.name + ", " + this.imageUrl + ", " + this._price + "]";
    }
}

let parisTrip = new Trip("paris", "Paris", "img/paris.jpg");
parisTrip.price = 100;
cl(parisTrip);
cl(parisTrip.name);
cl(parisTrip.toString());

const defaultTrip = Trip.getDefaultTrip();
cl(defaultTrip.toString());

class FreeTrip extends Trip {
    constructor(id, name, imageUrl) {
        super(id, name, imageUrl);
        super.price = 0;
    }

    toString() {
        return "Free" + super.toString();
    }
}

const freeTrip = new FreeTrip("nantes", "Nantes", "img/nantes.jpg");
cl(freeTrip.toString());



class TripService {

    constructor() {

        this.trips = new Set();
        this.trips.add(new Trip('paris', 'Paris', 'img/paris.jpg'));
        this.trips.add(new Trip('nantes', 'Nantes', 'img/nantes.jpg'));
        this.trips.add(new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg'));
    }

    findByName(tripName) {

        return new Promise((resolve, reject) => {

            setTimeout(() => {

                let alt = false;
                for (let elem of this.trips) {
                    if (elem.name === tripName) {
                        alt = true;
                        resolve(elem);
                    }
                }
                if (!alt) {
                    reject("No trip with name " + tripName);
                }
            }, 2000)
        });
    }
}

class PriceService {

    constructor() {

        this.priceServices = new Map();
        this.priceServices.set('paris', 100);
        this.priceServices.set('Rio de Janeiro', 800);
    }

    findPriceByTripId(tripId) {

        return new Promise((resolve, reject) => {

            setTimeout(() => {

                if (!this.priceServices.has(tripId)) {
                    reject("No price for trip id " + tripId)
                } else {
                    for (let [cle, valeur] of this.priceServices.entries()) {
                        if (cle === tripId) {
                            resolve(valeur);
                        }
                    }
                }

            }, 2000)
        });
    }
}

let tripService1 = new TripService();
let priceService1 = new PriceService();
cl(tripService1.findByName("Paris").then(function (res) { cl("Trip found : " + res) }));
cl(tripService1.findByName("Toulouse").then(function (res) { cl("Trip found : " + res) }));
cl(priceService1.findPriceByTripId('Rio de Janeiro').then(function (res) { cl("Price found : " + res) }))
cl(priceService1.findPriceByTripId('Nantes').then(function (res) { cl("Price found : " + res) }))