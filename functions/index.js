const express = require("express");
const functions = require('firebase-functions');
const firebase = require("firebase");
const admin = require('firebase-admin');
const bodyParser = require("body-parser");
const cors = require('cors')({ origin: true });

/* Express with CORS & automatic trailing '/' solution */
const app = express()

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);


app.post("/thirtymin", (request, response) => {
  response.send(request.body.moist)
})

exports.helloWorld = functions.https.onRequest((req, res) => {
  database = admin.database().ref('/');
  return database().ref("/").child("moist").set(10).then(res => {
    return res;
  })
});

// request.body = {
//   "moist": 5
// }
app.post("/getTime", (request, response) => {
  //response.send(`${Date.now()}`);
  var today = new Date();
  // var dd = today.getDate();
  // var mm = today.getMonth() + 1; //January is 0!
  //
  // var yyyy = today.getFullYear();
  // if (dd < 10) {
  //   dd = '0' + dd;
  // }
  // if (mm < 10) {
  //   mm = '0' + mm;
  // }
  // var today2 = dd + '/' + mm + '/' + yyyy;
  response.send(today);
})

exports.app = functions.https.onRequest(app);

// const port = 5000;
// app.listen(port, () => console.log(`Server started on port ${port}`));
