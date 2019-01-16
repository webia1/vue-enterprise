import zipcodes from './zipcodes.json';

const responseDelay = () => Math.floor(Math.random() * 1100);

const AddressMockAPI = {
  findLocationByZipcode: (zipcode) => (new Promise((resolve, reject) => {
    const found: object[] = zipcodes.filter(entry => entry.zipcode === zipcode);
    if (found.length === 0) {
      reject('No entry found!');
    }

    const responseTime = responseDelay();

    setTimeout(() => resolve({ responseTime, results: found }), responseTime);
  }) as any)
    .then(({ responseTime, results }) => {
      if (process.env.NODE_ENV !== 'production') {
        console.log(`AddressMockAPI response time: ${responseTime}ms`);
      }

      return results;
    }),
};

export default AddressMockAPI;
