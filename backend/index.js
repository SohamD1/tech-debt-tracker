const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
// Above are the required packages

const app = express();
const PORT = process.env.PORT || 5000;
// sets the port to listen on (default 5000)


// middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api/debt', routes); //Custom routes mounting
app.get('/', (req, res) => {
    res.send("Welcome to the Tech Debt TrackerAPI");
  });


  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Somethings wrong!" });
  });
// error handling ^

app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`)
});


