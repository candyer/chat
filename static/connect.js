// const sqlite3 = require('sqlite3').verbose();
 
// // open database in memory
// let db = new sqlite3.Database(':memory:', (err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Connected to the in-memory SQlite database.');
// });
 
// // close the database connection
// db.close((err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });



const sqlite3 = require('sqlite3').verbose();
 
// open database in memory
let db = new sqlite3.Database(':memory:', (err) => {
	if (err) {
		return console.error(err.message);
	}
	console.log('Connected to the in-memory SQlite database.');
});

db.serialize(function() {
	db.run('CREATE TABLE lorem (info TEXT)');

	var stmt = db.prepare('INSERT INTO lorem VALUES (?)');
	for (let i = 0; i < 10; i++) {
		stmt.run('Ipsum ' + i);
	}

	stmt.finalize();

	db.each('SELECT rowid AS id, info FROM lorem', function(err, row){
		console.log(row.id + ': ' + row.info);
	});
});

 
// close the database connection
db.close((err) => {
	if (err) {
		return console.error(err.message);
	}
	console.log('Close the database connection.');
});






// const sqlite3 = require('sqlite3').verbose();
 
// // open the database
// let db = new sqlite3.Database('./db/chinook.db', sqlite3.OPEN_READWRITE, (err) => {
// 	if (err) {
// 		console.error(err.message);
// 	}
// 	console.log('Connected to the chinook database.');
// });
 
// db.serialize(() => {
// 	db.each(`SELECT PlaylistId as id,Name as name FROM playlists`, (err, row) => {
// 		if (err) {
// 			console.error(err.message);
// 		}
// 		console.log(row.id + "\t" + row.name);
// 	});
// });
 
// db.close((err) => {
// 	if (err) {
// 		console.error(err.message);
// 	}
// 	console.log('Close the database connection.');
// });