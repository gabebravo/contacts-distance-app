const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
// const pino = require('express-pino-logger')();
// const bodyParser = require('body-parser');

const app = express();
// app.use(pino);
// app.use(bodyParser.urlencoded({ extended: false }));

function getMiles(i) {
  return parseFloat((i*0.000621371192).toFixed(2))
}

app.get('/api/map-data/:origin/:destination', (req, res) => {
  const { origin, destination } = req.params;
  const URL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin}&destinations=${destination}&key=${process.env.GOOGLE_KEY}`
    axios.get(URL)
      .then(response => {
        const miles = getMiles(response.data.rows[0].elements[0].distance.value);
        res.status(200).json({ miles });
      })
      .catch(err => {
        console.log(err)                     //Axios entire error message
        // console.log(err.response.data.error) //Google API error message 
      })
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);