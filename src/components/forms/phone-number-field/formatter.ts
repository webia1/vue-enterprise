export default class PhoneNumberFormatter {
  public static regex = /^(\+\d{2,3})(\d{3,5})\/?(\d{5,})/;

  public static getPartedValue(value: string) {
    const matches = this.regex.exec(value);
  }

  public static getFullValue(countryCode: string, prefix: string, phoneNumber: string) {
    return `${countryCode}${prefix}${(countryCode || prefix) && phoneNumber ? '/' : ''}${phoneNumber}`;
  }
}
