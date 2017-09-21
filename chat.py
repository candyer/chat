from flask import Flask, jsonify, request
import sqlite3

app = Flask(__name__, static_url_path='')

def get_messages():
	return jsonify(query_entry())

def push_messages(message):
	insert_entry(message)

@app.route("/")
def hello():
	return "Hello World!"

@app.route("/room")
def room():
	return get_messages()

@app.route("/receive", methods=['GET','POST'])
def receive():
	data = request.get_json()
	if data:
		push_messages(data['msg_key'])
	return "This page is working."

@app.route("/index", methods=['GET','POST'])
def index():
	return app.send_static_file('index.html')

#create database called 'dialogs'
def create_table():
	conn = sqlite3.connect('dialogs.db')
	c = conn.cursor()
	c.execute('CREATE TABLE IF NOT EXISTS dialogs(id INTEGER PRIMARY KEY, msg TEXT)')

#insert data inside database
def insert_entry(message):
	conn = sqlite3.connect('dialogs.db')
	c = conn.cursor()
	c.execute('INSERT INTO dialogs (msg) VALUES (?)', (message,))
	conn.commit()
	c.close()
	conn.close()

#get data from database
def query_entry():
	conn = sqlite3.connect('dialogs.db')
	c = conn.cursor()
	c.execute('SELECT msg FROM dialogs order by id')
	x = c.fetchall()
	# conn.commit()
	c.close()
	conn.close()
	return x	

# create_table() #only need to run this function once

if __name__ == '__main__':
	app.run(debug=True)
