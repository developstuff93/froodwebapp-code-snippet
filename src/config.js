const commonConfig = {
  development: {
    apiUrl: 'http://api.frood.tech/v1',
    homeRedirectLink: '/sales/orders',
    isProduction: false
  },
  production: {
    apiUrl: 'http://proxystaging.frood.tech/v1',
    homeRedirectLink: '/sales/orders',
    isProduction: true
  },
}[process.env.NODE_ENV || 'development'];

export default {
  development: {
    isProduction: commonConfig.isProduction,
    homeRedirectLink: commonConfig.homeRedirectLink,
    apiTokenCookieName: 'X-TOKEN',
    apiTimeout: 4000, // in ms. Default value for axios client - 1000
    api: {
      url: commonConfig.apiUrl,
    },
    port: 3000,
    devServerPort: 3002,
  },
  production: {
    isProduction: commonConfig.isProduction,
    homeRedirectLink: commonConfig.homeRedirectLink,
    apiTokenCookieName: 'X-TOKEN',
    apiTimeout: 4000, // in ms. Default value for axios client - 1000
    api: {
      url: commonConfig.apiUrl,
    },
    port: 3000
  },
}[process.env.NODE_ENV || 'development'];
