// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  identity: {
    issuer:
      'https://xaresume.b2clogin.com/xaresume.onmicrosoft.com/B2C_1_sign_in/v2.0/',
    appId: '59bbf0d4-1825-4ae0-a889-c45efa942517',
    appSecret: 'GHSR-p72~-j3~66btWhnthu.gHcE2KeTDE',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
