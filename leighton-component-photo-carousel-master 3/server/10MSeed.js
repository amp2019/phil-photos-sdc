// var faker = require('faker');



// //625000 at a time
// // node --max-old-space-size=4096 10MSeed.js
// property0 = [],
// property1 = [],
// property2 = [],
// property3 = [],
// property4 = [],
// property5 = [],
// property6 = [],
// property7 = []
// property8 = [],
// property9 = [],
// property10 = [],
// property11 = [],
// property12 = [],
// property13 = [],
// property14 = [],
// property15 = []

// var start = 0;
// var finish = 625000
// var targetProp = [property0, property1, property2, property3, property4, property5, property6, property7, property8, property9, property10, property11, property12, property13, property14, property15]
// for(var y = 0; y < 8; y++) {
//   for(var z = start; z < finish; z++) {
//     targetProp[y].push([faker.address.streetAddress(), faker.random.number({min:500000, max:30000000}), faker.random.number({min:2, max:30}), faker.random.number({min:1, max:7}), faker.random.number({min:1000, max:30000}) ]);
//   }
//   start += 625000;
//   finish += 625000;
// }

// var all = [].concat.apply([], targetProp)

// module.exports.all = all;


/*==================================================*/


function writeSampleFile() {
  var stringify = require('csv-stringify');
  var fs = require('fs');
  var faker = require('faker');

  let data = [];
  let columns = {
    id: 'id',
    address: 'address',
    price: 'price',
    bed_count: 'bed_count',
    bath_count: 'bath_count',
    sq_ft: 'sq_ft'
  };

  for (var i = 0; i < 10000000; i++) {
    data.push([i, faker.address.streetAddress(), faker.random.number({min:500000, max:30000000}), faker.random.number({min:2, max:30}), faker.random.number({min:1, max:7}), faker.random.number({min:1000, max:30000}) ]);
  }

  stringify(data, { header: true, columns: columns }, (err, output) => {
    if (err) throw err;
    fs.writeFile('seed.csv', output, (err) => {
      if (err) throw err;
      console.log('seed.csv saved.');
    });
  });
}


function writePhotos() {
  var fs = require('fs');
  var stringify = require('csv-stringify');

  var columns = {
    id: 'id',
    url: 'url',
    property_id: 'property_id'
  };

  var photoData = [];
  var start = 0;
  var finish = 1000;
  var index = 0;

  function createOneThousand() {
    for(var z = start; z < /*10000000*/finish; z++) {
      for (var j = 0; j < 20; j++) {
        const imgId = Math.floor(Math.random() * 100) + 1;
        photoData.push([
          index,
          `https://s3-us-west-1.amazonaws.com/xillow-talk-photos/property_photos/${j ? 'sample' : 'large'}${imgId}.jpg`,
          z
        ]);
        index++;
      }
    }
  }
  createOneThousand();
  stringify(photoData, { header: true, columns: columns }, (err, output) => {
    if (err) throw err;
    fs.writeFile('photoSeed.csv', output, (err) => {
      if (err) throw err;
      console.log('photoSeed.csv created');
    });
  });

  for(var l = 0; l < 1000; l++) {
    stringify(photoData, { header: false, columns: columns }, (err, output) => {
      if (err) throw err;
      fs.appendFile('photoSeed.csv', output, (err) => {
        if (err) throw err;
        photoData = [];
        start += 1000;
        finish += 1000;
        createOneThousand();
        console.log('1000 rows saved to photoSeed.csv');
      });
    });
  }
}

  // var photoStream = fs.createWriteStream('photoSeed.csv');
  // photoStream.write(JSON.stringify(photoData));
  // photoStream.end(function () { console.log('done'); });
  //writer.end()



// var fs = require('fs');
// var writeStream = fs.createWriteStream('someFile.txt', { flags : 'w' });
// var readStream = new MyReadStream();

// readStream.pipe(writeStream);
// writeStream.on('close', function () {
//     console.log('All done!');
// });




module.exports.writeSampleFile = writeSampleFile;
module.exports.writePhotos = writePhotos;