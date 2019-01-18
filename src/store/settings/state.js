// import env from '@/globals/environment';

const state = {
  enabledMocks: [
    'address',
  ],
};

if (process.env.NODE_ENV === 'jat') {
  state.enabledMocks = [...state.enabledMocks, 'geo', 'geofull'];
}

export default state;
