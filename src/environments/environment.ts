// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  name: 'dev',
  production: false,
  fakeApi: true,
  api_url: 'api',
  testOrgId: 1573,                            // 1573, 3251, 6853
  locktime: 3000000,
  // api_url: 'http://localhost/GPMApi/',
  signalr: 'http://localhost:9999',
  locale: 'en-NZ',
  // app_country: 'NZ',
  // version: '##GSOVERSION##',
  // GoogleReCaptcha_SiteKey: '6LdVZSUTAAAAAJhbpbdJNmpD4RaXOshxifBIc8sR',
  clientId: '1',
  client_secret: '123'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

/*
 * production: false,
 * name: 'dev',
 * api_url: 'http://localhost/GPMApi/',
 * locktime: 3000000,
 * signalr: 'http://localhost:9999',
 * locale: 'en-NZ',
 * phisyio_country: 'NZ',
 * version: '##GSOVERSION##',
 * GoogleReCaptcha_SiteKey: '6LdVZSUTAAAAAJhbpbdJNmpD4RaXOshxifBIc8sR',
 * clientId: '1',
 * client_secret: '123'
 *
 */
