import _ from 'lodash';

import store from '@/store';

import AddressMockAPI from './mock';

export enum AddressServiceErrors {
  ApiNotFound = 10,
  ApiTimeout,
  NoEntryFound = 30,
}

export const AddressService = {
  findLocationByZipcode: (zipcode, { timeout = 1000 }: { timeout?: number } = {}) => {
    if (_.includes((store.state as any).settings.enabledMocks, 'address')) {
      return Promise.race([
        AddressMockAPI.findLocationByZipcode(zipcode),
        new Promise((resolve, reject) => {
          setTimeout(() => reject({ code: AddressServiceErrors.ApiTimeout, message: 'API timeout!' }), timeout);
        }),
      ])
        .then((results) => {
          if (results.length === 0) {
            throw { code: AddressServiceErrors.NoEntryFound, message: 'No entry found!' };
          }
          return results;
        });
    }
    return Promise.reject({ code: AddressServiceErrors.ApiNotFound, message: 'API not found!' });
  },
};
