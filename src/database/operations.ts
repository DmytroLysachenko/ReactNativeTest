import db from './db';

// CREATE TABLE

export const createTables = () => {
	db.transaction(tx => {
		tx.executeSql(
			'CREATE TABLE IF NOT EXISTS Pages (ID INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, link TEXT NOT NULL UNIQUE);',
			[],
			() => {
				console.log('Table created successfully');
			},
			error => {
				console.log('Error creating table: ', error);
			},
		);
	});
};

// CREATE ONE PAGE

export const insertPage = (name: string, link: string) => {
	db.transaction(tx => {
		tx.executeSql(
			'INSERT INTO Pages (name, link) VALUES (?, ?);',
			[name, link],
			(_, result) => {
				console.log('Coloring page inserted:', result);
			},
			error => {
				console.log('Error inserting page:', error);
			},
		);
	});
};

// GET ALL PAGES

export const getAllPages = (
	callback: (pages: { id: number; name: string; link: string }[]) => void,
) => {
	db.transaction(tx => {
		tx.executeSql(
			'SELECT * FROM Pages',
			[],
			(_, { rows }) => {
				const pages = [];
				for (let i = 0; i < rows.length; i++) {
					pages.push(rows.item(i));
				}
				callback(pages);
			},
			error => {
				console.log('Error fetching all pages:', error);
				callback([]);
			},
		);
	});
};

// GET ONE PAGE

export const getPageById = (
	id: number,
	callback: (page: { name: string; link: string } | null) => void,
) => {
	db.transaction(tx => {
		tx.executeSql(
			'SELECT name, link FROM Pages WHERE ID = ?',
			[id],
			(_, { rows }) => {
				if (rows.length > 0) {
					const page = {
						name: rows.item(0).Name,
						link: rows.item(0).Link,
					};
					callback(page);
				} else {
					callback(null);
				}
			},
			error => {
				console.log('Error fetching page:', error);
				callback(null);
			},
		);
	});
};

// DELETE ONE PAGE

export const deletePageById = (id: number) => {
	db.transaction(tx => {
		tx.executeSql(
			'DELETE FROM Pages WHERE ID = ?',
			[id],
			(_, result) => {
				console.log('Page deleted:', result);
			},
			error => {
				console.log('Error deleting page:', error);
			},
		);
	});
};
