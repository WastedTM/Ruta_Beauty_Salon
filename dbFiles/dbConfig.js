const path = require("node:path"),
      sqlite3 = require('sqlite3').verbose();

const dbPath = path.resolve(__dirname, '../dbFiles/Ruta.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to the SQLite database');
    }
});

module.exports = db
