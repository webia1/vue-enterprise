import _ from 'lodash';

import store from '@/store';

import AddressMockAPI from './mock';

const AddressService = {
  findLocationByZipcode: (zipcode) => {
    if (_.includes((store.state as any).settings.enabledMocks, 'address')) {
      return AddressMockAPI.findLocationByZipcode(zipcode);
    }
    return Promise.reject('API not found!');
  },
};

export default AddressService;
