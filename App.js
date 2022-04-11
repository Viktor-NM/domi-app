import react from 'react'
import { StyleSheet, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

import AuthScreen from './screens/AuthScreen'
import LoginUserScreen from './screens/LoginUserScreen'
import MainScreen from './screens/MainScreen'
import RegisterUserScreen from './screens/RegisterUserScreen'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen.js'

function MyStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="AuthScreen"
				component={AuthScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="LoginUserScreen"
				component={LoginUserScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="RegisterUserScreen"
				component={RegisterUserScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="ForgotPasswordScreen"
				component={ForgotPasswordScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="MainScreen"
				component={MainScreen}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	)
}

export default function App() {
	return (
		<NavigationContainer>
			<MyStack />
		</NavigationContainer>
	)
}
