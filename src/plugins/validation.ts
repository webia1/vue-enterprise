import validate from 'validate.js';
import moment from 'moment';

(validate as any).options = { fullMessages: false };

validate.extend(validate.validators.email, {
  message: 'Ungültige E-Mail-Addresse!',
});

validate.extend(validate.validators.format, {
  message: 'Ihre Eingabe ist ungültig!',
});

validate.extend(validate.validators.length, {
  notValid: 'Ihre Eingabe ist ungültig!',
  wrongLength: 'Ihre Eingabe sollte %{count} Zeichen enthalten!',
  tooShort: 'Ihre Eingabe muss mindestens %{count} Zeichen enthalten!',
  tooLong: 'Ihre Eingabe darf höchstens %{count} Zeichen enthalten!',
});

validate.extend(validate.validators.presence, {
  message: 'Ihre Eingabe darf nicht leer sein!',
});

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
  message: 'Kein gültiges Datum',
});

validate.extend(validate.validators, {
  birthday: (value: any) => {
    if (moment(value, 'DD.MM.YYYY').isValid()) {
      return null;
    }
    return 'Kein gültiges Datum!';
  },
});
