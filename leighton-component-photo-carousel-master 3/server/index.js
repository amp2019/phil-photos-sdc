const express = require('express');
const app = express();
const port = 3333;
var fs = require('fs');
var pgp = require('pg-promise')(/*options*/);
var format = require('pg-format');
var faker = require('faker');
var seedData = require('./10MSeed');
const config = {
  "host": "localhost",
  "port": 5432,
  "database": "sdc",
  "user": "philipstout"
}
var db = pgp(config);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get('/api/basicdetails/:propertyId', (req, res) => {
  const propertyId = Number(req.params.propertyId);
  db.query(`SELECT * from properties where ID = ${propertyId}`)
    .then(function (data) {
      res.send(data);
      console.log('DATA:', data)
    })
    .catch(function (error) {
      console.log('ERROR:', error)
  })
})

//seedData.writeSampleFile();
seedData.writePhotos();


// var formatSeed = format('INSERT INTO properties (address, price, bed_count, bath_count, sq_ft) VALUES %L', seedData.all)

// app.post('/seed1', (req, res) => { 
//   db.query(formatSeed)
//   .then(function (data) {
//     //res.send(data);
//     console.log('10 Million!')
//   })
//   .catch(function (error) {
//     console.log('ERROR:', error)
//   })
// })

// var photos = [];
// for (var j = 0; j < 20; j += 1) {
//   const imgId = Math.floor(Math.random() * 100) + 1;
//   photos.push([
//     `https://s3-us-west-1.amazonaws.com/xillow-talk-photos/property_photos/${j ? 'sample' : 'large'}${imgId}.jpg`,
//     2,
//   ]
//   );
// }

// var photoquery = format('INSERT INTO photos (url, property_id) VALUES %L', photos)

// app.post('/postphotos', (req, res) => { 
//   db.query(photoquery)
//   .then(function (data) {
//     res.send(data);
//     console.log('DATA:', data)
//   })
//   .catch(function (error) {
//     console.log('ERROR:', error)
//   })
// })

app.post('/postdetails', (req, res) => {
  db.one('INSERT INTO properties (address, price, bed_count, bath_count, sq_ft) VALUES($1, $2, $3, $4, $5)',
  [testpost.address, testpost.price, testpost.bed_count, testpost.bath_count, testpost.sq_ft])
    .then(function (data) {
      res.send(data);
      console.log('SAVED')
    })
    .catch(function (error) {
      console.log('ERROR:', error)
  })
})

console.log('done')

/*===========================================*/

// const morgan = require('morgan');
// const express = require('express');
// const compression = require('compression');
// const db = require('./database');
// const { servicePort } = require('../config.js');

// const app = express();

// app.use(morgan('dev'));
// app.use(compression());
// app.use('/dist', express.static('public/dist'));
// app.use('/:propertyId', express.static('public'));

// app.get('/api/basicdetails/:propertyId', (req, res) => {
//   const propertyId = Number(req.params.propertyId);
//   db.getDetails(propertyId)
//     .then((details) => {
//       res.set('Access-Control-Allow-Origin', '*');
//       res.status(200).send(details);
//     })
//     .catch((error) => {
//       res.status(418).send(error); // i'm a teapot
//     });
// });

// app.get('/api/thumb/photos/:propertyId', (req, res) => {
//   const propertyId = Number(req.params.propertyId);
//   db.getPhotos(propertyId)
//     .then((links) => {
//       res.set('Access-Control-Allow-Origin', '*');
//       res.status(200).send(links);
//     })
//     .catch((error) => {
//       res.status(418).send(error);
//     });
// });

// app.get('/api/full/photos/:propertyId', (req, res) => {
//   const propertyId = Number(req.params.propertyId);
//   db.getPhotos(propertyId)
//     .then((links) => {
//       res.set('Access-Control-Allow-Origin', '*');
//       res.status(200).send(links);
//     })
//     .catch((error) => {
//       res.status(418).send(error);
//     });
// });

// app.listen(servicePort);

