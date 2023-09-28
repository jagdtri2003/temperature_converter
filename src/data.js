const express = require("express");
const connec = require('./conn.js');
const path = require("path");
const coll = connec.coll;
const app = express();
const publicPath = path.join(__dirname, '../public'); 
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicPath))
app.get('/', function(req, res) {
    res.sendFile(`${publicPath}/index.html`);
  });


app.listen(3000, () => {
    console.log("Listening on port: http://localhost:3000");
});