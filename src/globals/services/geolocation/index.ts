import axios from 'axios';

const GeolocationService = {
  get options() {
    return {
      // enableHighAccuracy: true,
    };
  },
  get position() {
    return (window.navigator as { [key:string]: any }).permissions.query({ name: 'geolocation' })
      .then(() => new Promise((resolve, reject) => {
        window.navigator.geolocation.getCurrentPosition(resolve, reject, this.options);
      }))
      .then(({ coords: { latitude, longitude } }) => ({ latitude, longitude }))
      .catch((error) => { throw { error }; })
      .then(({ latitude, longitude }) =>
        this.reverseGeocode(latitude, longitude)
          .catch((error) => {
            throw {
              error,
              coords: {
                latitude,
                longitude,
              },
            };
          })
      )
  },
  observer: (null as any),
  history: {
    positions: ([] as any[]),
    addPosition(position) {
      this.positions.push(position);
      this.positions.sort((a, b) => {
        if (a.timestamp < b.timestamp) return 1;
        if (a.timestamp > b.timestamp) return -1;

        return 0;
      });
    },
  },
  watchPosition() {
    if (!this.observer) {
      this.observer = {
        subscriptions: {
          success: ([] as Function[]),
          error: ([] as Function[]),
        },
        subcribe(success, error) {
          this.subscriptions.success.push(success);
          this.subscriptions.error.push(error);
        },
        fire(err?, payload?) {
          if (err) {
            this.subscriptions.error.forEach((fn) => fn(err));
          } else {
            this.subscriptions.success.forEach((fn) => fn(payload));
          }
        },
      };
    }
    setTimeout(() => {
      window.navigator.geolocation.watchPosition(
        (position) => {
          this.reverseGeocode(position.coords.latitude, position.coords.longitude)
            .then((result) => {
              this.history.addPosition({ ...result, timestamp: position.timestamp });
              this.observer.fire(null, this.history.positions[0]);
            });
        },
        (error) => {
          this.observer.fire(error);
        }
      );
    }, 1000);
    return this.observer;
  },
  reverseGeocode: (latitude, longitude) =>
    axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
      .then((response) => response.data)
      .then(({ address, display_name: formatted }) => {
        return { ...address, formatted, coords: { latitude, longitude } };
      })
      .catch((error) => {
        throw error;
      })
};

export default GeolocationService;
