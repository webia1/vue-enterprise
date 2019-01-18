import env from '@/globals/environment';
import zipcodes from './zipcodes.json';

const responseDelay = () => Math.floor(Math.random() * 1200);

const AddressMockAPI = {
  findLocationByZipcode: (zipcode) => (new Promise((resolve, reject) => {
    const found: object[] = zipcodes.filter(entry => entry.zipcode === zipcode);
    const responseTime = responseDelay();

    setTimeout(() => resolve({ responseTime, results: found }), responseTime);
  }) as any)
    .then(({ responseTime, results }) => {
      if (!env.isProd) {
        // tslint:disable-next-line
        console.log(`AddressMockAPI response time: ${responseTime}ms`);
      }

      return results;
    }),
};

export default AddressMockAPI;
