import 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MMKV } from 'react-native-mmkv';
import { ThemeProvider } from '@/theme';
import ApplicationNavigator from './navigators/Application';
import './translations';
import { useEffect } from 'react';
import { initializeDatabase } from './database/initDatabase';

export const queryClient = new QueryClient();

export const storage = new MMKV();

function App() {
	useEffect(() => {
		try {
			initializeDatabase();
		} catch (error) {
			console.error('Initialization error:', error);
		}
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider storage={storage}>
				<ApplicationNavigator />
			</ThemeProvider>
		</QueryClientProvider>
	);
}

export default App;
