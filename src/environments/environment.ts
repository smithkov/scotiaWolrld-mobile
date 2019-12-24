// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
let innerUrl = "http://localhost:3000";
// let innerUrl ="https://scotstudy.co.uk"
export const environment = {
  production: false,
  url: innerUrl,
  // //url: "https://thescotiaworld.co.uk",
  avatarUrl: `${innerUrl}/uploads/`,
  photoUrl: `${innerUrl}/photos/`,
  defaultPhoto: `${innerUrl}/photos/no_photo.jpg`
  //url: "http://localhost:3000",
  //url: "https://thescotiaworld.co.uk",
  //avatarUrl: `http://localhost:3000/uploads/`,
  //photoUrl: `http://localhost:3000/photos/`
};
// let innerUrl ="https://scotstudy.co.uk"

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
