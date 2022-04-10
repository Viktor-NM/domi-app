import react from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import {
	AntDesign,
	MaterialIcons,
	FontAwesome5,
	Entypo,
} from '@expo/vector-icons'

import PromosScreen from './PromoScreen'
import FavoritoScreen from './FavoritoScreen'
import PedidosScreen from './PedidosScreen'
import HomeScreen from './HomeScreen'

const Tab = createBottomTabNavigator()

function Tabs() {
	return (
		<Tab.Navigator
			initialRouteName="Menu"
			screenOptions={{
				tabBarActiveTintColor: '#DD1415',
				tabBarInactiveTintColor: '#b3b3b3',
				tabBarActiveBackgroundColor: '#DCDCDC',
				tabBarItemStyle: {
					borderRadius: 35,
				},
				tabBarStyle: {
					height: 100,
					alignItems: 'center',
				},
				tabBarIconStyle: {
					width: '100%',
					flex: 1,
				},
			}}
		>
			<Tab.Screen
				options={{
					tabBarIcon: ({ color, size }) => (
						<AntDesign name="search1" size={30} color={color} />
					),
					headerTitleAlign: 'center',
					tabBarLabelStyle: {
						fontSize: 16,
						flex: 1,
					},
				}}
				name="Menu"
				component={HomeScreen}
			/>
			<Tab.Screen
				options={{
					tabBarIcon: ({ color, size }) => (
						<Entypo name="medal" size={30} color={color} />
					),
					headerTitleAlign: 'center',
					tabBarLabelStyle: {
						fontSize: 16,
						flex: 1,
					},
				}}
				name="Promos"
				component={PromosScreen}
			/>
			<Tab.Screen
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name="favorite-border" size={30} color={color} />
					),
					headerTitleAlign: 'center',
					tabBarLabelStyle: {
						fontSize: 16,
						flex: 1,
					},
				}}
				name="Favoritos"
				component={FavoritoScreen}
			/>
			<Tab.Screen
				options={{
					tabBarIcon: ({ color, size }) => (
						<Entypo name="list" size={30} color={color} />
					),
					headerTitleAlign: 'center',
					tabBarLabelStyle: {
						fontSize: 16,
						flex: 1,
					},
				}}
				name="Pedidos"
				component={PedidosScreen}
			/>
		</Tab.Navigator>
	)
}

export default function MainScreen() {
	return (
		<NavigationContainer independent={true}>
			<Tabs />
		</NavigationContainer>
	)
}
