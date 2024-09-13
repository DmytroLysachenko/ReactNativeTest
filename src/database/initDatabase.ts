import { createTables, getAllPages, insertPage } from './operations';

export const initializeDatabase = () => {
	createTables();

	getAllPages(pages => {
		if (pages.length === 0) {
			const initialPages = [
				{
					name: 'Rabbit & box turtle',
					link: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/183091/harper-coloring-book001.svg',
				},
				{
					name: 'Mandrills',
					link: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/183091/harper-coloring-book002.svg',
				},
				{
					name: 'Painted bunting',
					link: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/183091/harper-coloring-book003.svg',
				},

				{
					name: 'Emerald toucanet',
					link: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/183091/harper-coloring-book004.svg',
				},

				{
					name: 'Cardinal',
					link: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/183091/harper-coloring-book005.svg',
				},
			];

			initialPages.forEach(page => insertPage(page.name, page.link));
			console.log('Initial pages inserted');
		} else {
			console.log('Pages already exist, no need to insert initial pages');
		}
	});
};
