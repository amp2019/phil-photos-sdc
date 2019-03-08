require('newrelic');
const express = require('express');
const app = express();
const port = 3333;
// var fs = require('fs');
var pgp = require('pg-promise')(/*options*/);
// var format = require('pg-format');
// var faker = require('faker');
const compression = require('compression');
app.use(compression());
app.use('/dist', express.static('public/dist'));
app.use('/:propertyId', express.static('public'));
// var seedData = require('./10MSeed');
const config = {
  "host": "localhost",
  "port": 5432,
  "database": "sdc",
  "user": "philipstout"
}
var db = pgp(config);

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

app.get('/api/thumb/photos/:propertyId', (req, res) => {
  const propertyId = Number(req.params.propertyId);
  db.query(`SELECT * from photos where property_id = ${propertyId}`)
    .then((links) => {
      res.set('Access-Control-Allow-Origin', '*');
      res.status(200).send(links);
    })
    .catch((error) => {
      res.status(418).send(error);
    });
});

app.get('/api/full/photos/:propertyId', (req, res) => {
  const propertyId = Number(req.params.propertyId);
  db.query(`SELECT * from photos where property_id = ${propertyId}`)
    .then((links) => {
      res.set('Access-Control-Allow-Origin', '*');
      res.status(200).send(links);
    })
    .catch((error) => {
      res.status(418).send(error);
    });
});

//seedData.writeSampleFile();
// seedData.writePhotos();

var testpost = {
  address: '800 Great St',
  price: 5000,
  bed_count: 3,
  bath_count: 2,
  sq_ft: 1300
}


app.post('/postdetails', (req, res) => {
  db.query('INSERT INTO properties (address, price, bed_count, bath_count, sq_ft) VALUES($1, $2, $3, $4, $5)',
  [testpost.address, testpost.price, testpost.bed_count, testpost.bath_count, testpost.sq_ft])
    .then(function (data) {
      res.send(data);
      console.log('SAVED')
    })
    .catch(function (error) {
      console.log('ERROR:', error)
  })
})

app.delete('/deleteproperty', (req, res) => {
  var deleteId = 15000004;
  db.query(`DELETE FROM properties WHERE id = ${deleteId}`)
  // db.query(`DELETE FROM properties WHERE address = '800 Great St'`)
    .then(function (data) {
      res.send(data);
      console.log('Deleted id ' + deleteId)
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

