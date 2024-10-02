import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Example, Startup } from '@/screens';
import { useTheme } from '@/theme';

import type { RootStackParamList } from '@/types/navigation';
import ColoringPage from '@/screens/ColoringPage/ColoringPage';
import ColoringPageV2 from '@/screens/ColoringPageV2/ColoringPageV2';

const Stack = createStackNavigator<RootStackParamList>();

function ApplicationNavigator() {
	const { variant, navigationTheme } = useTheme();

	return (
		<SafeAreaProvider>
			<NavigationContainer theme={navigationTheme}>
				<Stack.Navigator key={variant} screenOptions={{ headerShown: true }}>
					<Stack.Screen name="Startup" component={Startup} />
					<Stack.Screen name="Example" component={Example} />
					<Stack.Screen name="ColoringPage" component={ColoringPage} />
					<Stack.Screen name="ColoringPageV2" component={ColoringPageV2} />
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
}

export default ApplicationNavigator;
