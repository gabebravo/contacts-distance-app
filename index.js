const express = require('express');
const path = require('path');
const axios = require('axios');
dotenv.config();

// const pino = require('express-pino-logger')();
// app.use(pino);
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: false }));

const app = express();
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

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

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`app listening on ${port}`);