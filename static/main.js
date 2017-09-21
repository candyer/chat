
// JSON.parse(x)



function send_message_to_server() {
	let text = document.querySelector('textarea');
	if (text.value.length > 0) { // Prevent submitting blank input
		post_message(text.value);
	}
	text.value='';
}

function display_messages(texts) {
	let messages = document.querySelector('.messages');
	messages.innerHTML = '';
	texts.forEach(text => {
		let msg = document.createElement('p');
		msg.className = 'message';
		messages.appendChild(msg);
		msg.textContent = text;		
	})
}

function enterControl(e) {
	if (e.keyCode == 13) {
		send_message_to_server();
		e.preventDefault();
	}
}

//get messages from server
function get_message() {
	fetch('http://127.0.0.1:5000/room', {method: 'get'})
	.then(response => response.json())
	// .then(e => console.log(e)) // display messages 
	.then(e => display_messages(e)) // display messages 
	.catch(e => console.log("you suck", e));
}


//post messages to server
function post_message(msg) {
	fetch('http://127.0.0.1:5000/receive', {
		method: 'post',
		headers: {
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			msg_key: msg
		})});
}




	
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(':memory:');

let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

db.close();

db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});








document.onkeydown = enterControl;
setInterval(get_message, 1000);

