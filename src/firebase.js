 import firebase from 'firebase';
 import "firebase/auth"
 
 // var firebaseApp = firebase.initializeApp({
 // 	apiKey: "AIzaSyDPYwH2zSaczX9HD8y1899t3SvqvZr2e24",
 // 	authDomain: "listrik-meter.firebaseapp.com",
 // 	databaseURL: "https://listrik-meter-default-rtdb.firebaseio.com",
 // 	projectId: "listrik-meter",
 // 	storageBucket: "listrik-meter.appspot.com",
 // 	messagingSenderId: "159987055646",
 // 	appId: "1:159987055646:web:ff76af2db069cfb0dec20f",
 // 	measurementId: "G-R9TB477H0L",
 // });


//  var firebaseApp = firebase.initializeApp({
//   apiKey: "AIzaSyCeeIUS_19knFLZV_kPSm90pG6YaGF98gU",
//   authDomain: "pyfirebase-39c6d.firebaseapp.com",
//   databaseURL: "https://pyfirebase-39c6d-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "pyfirebase-39c6d",
//   storageBucket: "pyfirebase-39c6d.appspot.com",
//   messagingSenderId: "989628071768",
//   appId: "1:989628071768:web:9541461a630d8acf6faf2d",
//   measurementId: "G-3TR5WSZBC6"
// });

var firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB23rSnnGDRRc_Y-1b9m81MvUQRCBkSKkk",
  authDomain: "pesilintar-ta-217441001.firebaseapp.com",
  databaseURL: "https://pesilintar-ta-217441001-default-rtdb.firebaseio.com",
  projectId: "pesilintar-ta-217441001",
  storageBucket: "pesilintar-ta-217441001.appspot.com",
  messagingSenderId: "222349729897",
  appId: "1:222349729897:web:da7a1994f9b3403015c2f8",
  measurementId: "G-XV7ZDYX3V6"
});

  // Initialize Firebase
  const db = firebase.firestore()
  const auth = firebase.auth()
  const storage = firebase.storage()
  const realtime = firebase.database()

  export {db, auth, storage, realtime};
  export default firebaseApp