const env = {
  isProd: process.env.VUE_APP_ISPROD === 'true',
  dataSecurityLink: process.env.VUE_APP_DATA_SECURITY_LINK,
  title: process.env.VUE_APP_TITLE,
};

if (!env.isProd) {
  // tslint:disable
  console.log('ENVIRONMENT');
  console.dir(process.env);
  console.dir(env);
  // tslint:enable
}

export default env;
