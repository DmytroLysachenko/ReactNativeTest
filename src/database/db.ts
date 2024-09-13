import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
	{
		name: 'mydb.db',
		location: 'default',
	},
	() => {
		console.log('Database opened');
	},
	error => {
		console.log('Error: ', error);
	},
);

export default db;
