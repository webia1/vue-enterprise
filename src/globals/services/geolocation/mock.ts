import _ from 'lodash';

const GeolocationMockAPI = {
  mockData: {
    positions: [
      /* tslint:disable */
      {
        "house_number": "7",
        "road": "Prinzenallee",
        "suburb": "Lörick",
        "city_district": "Stadtbezirk 4",
        "city": "Düsseldorf",
        "county": "Düsseldorf",
        "state_district": "Regierungsbezirk Düsseldorf",
        "state": "Nordrhein-Westfalen",
        "postcode": "40549",
        "country": "Deutschland",
        "country_code": "de",
        "formatted": "7, Prinzenallee, Lörick, Stadtbezirk 4, Düsseldorf, Regierungsbezirk Düsseldorf, Nordrhein-Westfalen, 40549, Deutschland",
        "coords": {
          "latitude": 51.236488099999995,
          "longitude": 6.7339338,
        },
      },
      {
        "road": "Karl-Liebknecht-Straße",
        "neighbourhood": "Spandauer Vorstadt",
        "suburb": "Mitte",
        "city_district": "Mitte",
        "city": "Berlin",
        "postcode": "10178",
        "country": "Deutschland",
        "country_code": "de",
        "formatted": "Karl-Liebknecht-Straße, Spandauer Vorstadt, Mitte, Berlin, 10178, Deutschland",
        "coords": {
          "latitude": 52.520007,
          "longitude": 13.404954,
        },
      },
      {
        "neighbourhood": "St. James's",
        "suburb": "Covent Garden",
        "city": "London",
        "state_district": "Groß-London",
        "state": "England",
        "country": "Vereinigtes Königreich",
        "country_code": "gb",
        "formatted": "St. James's, Covent Garden, Westminster, London, Groß-London, England, Vereinigtes Königreich",
        "coords": {
          "latitude": 51.507351,
          "longitude": -0.127758,
        },
      },
      {
        "bus_stop": "Market St & South Van Ness Ave",
        "road": "Market Street",
        "neighbourhood": "Hayes Valley",
        "city": "San Francisco",
        "county": "San Francisco City and County",
        "state": "Kalifornien",
        "postcode": "94102",
        "country": "Vereinigte Staaten von Amerika",
        "country_code": "us",
        "formatted": "Market St & South Van Ness Ave, Market Street, Hayes Valley, San Francisco, San Francisco City and County, Kalifornien, 94102, Vereinigte Staaten von Amerika",
        "coords": {
          "latitude": 37.774929,
          "longitude": -122.419416,
        },
      },
      /* tslint:enable */
    ],
  },
  getCurrentPosition(success) {
    success(_.sample(this.mockData.positions));
  },
  reverseGeocode(latitude, longitude) {
    return Promise.resolve(
      _.find(
        this.mockData.positions,
        position =>
          position.coords.latitude === latitude
          && position.coords.longitude === longitude,
      ),
    );
  },
};

export default GeolocationMockAPI;
