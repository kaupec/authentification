const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(function() {
  db.run("CREATE TABLE user (info TEXT)");

  let stmt = db.prepare("INSERT INTO user VALUES (?)");
  for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
  }
  stmt.finalize();

  db.each("SELECT rowid AS id, info FROM user", function(err, row) {
      console.log(row.id + ": " + row.info);
  });
});

db.close();