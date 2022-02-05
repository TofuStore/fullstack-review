const express = require('express');
const helpers = require('../helpers/github.js');
const db = require('../database');
let app = express();


app.use(express.static(__dirname + '/../client/dist'));
app.use(express.urlencoded());
app.use(express.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  helpers.getReposByUsername(req.body.term, (response) => {
    for (let i in response.data) {
      db.save(response.data[i]);
    }
    res.end(JSON.stringify(response.data.length));
  })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.retrieve((err, repos) => {
    res.send(repos);
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

