const express = require("express");
const axios = require ('axios');
const PORT = process.env.PORT || 3001;
const handlers = require('../common/handler');
const { WIKI_URL } = require('../assets/consts');

const app = express();

app.use((req, res, next) => {  // Enable CORS
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get("/wikiProxy", (req, res) => {
  axios.get(`${WIKI_URL}${req.query.titles}`)
       .then((response) => {
         return res.send(handlers.formatResponse(response.data));
       }).catch(error => {
         return res.json({ message: "err" });
       });
});

app.get("/", (req, res) => {
  res.json({ message: "Address not found" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});