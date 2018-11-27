import validate from 'validate.js';
import moment from 'moment';

validate.extend(validate.validators.datetime, {
  parse: (value: any) => {
    return +moment.utc(value);
  },
  // Input is a unix timestamp
  format: (value: number, opts: any) => {
    const format = opts.dateOnly ? 'YYYY-MM-DD' : 'YYYY-MM-DD hh:mm:ss';
    return moment.utc(value)
      .format(format);
  },
});

validate.validators.birthday = (value: any) => {
  if (moment(value, 'DD.MM.YYYY').isValid()) {
    return null;
  }
  return 'is not a valid birthday';
};
