var fs = require('fs');
var db = require('../src/db.json');
db.comments = [];
fs.writeFileSync('./src/db.json', JSON.stringify(db));
