import react from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'

import RedesSociales from '../components/redesSociales/RedesSociales'
import fonts from '../assets/theme/index'
import splashLogo from '../assets/splash-logo'
import { FontAwesome } from '@expo/vector-icons'

export default function AuthScreen(props) {
	return (
		<View style={styles.container}>
			<View style={{ ...styles.flex, justifyContent: 'center' }}>
				<Image
					source={{
						uri: splashLogo.src,
					}}
					style={styles.image}
				/>
				<Text style={{ ...fonts.BLACK, ...fonts.H1, ...styles.heading }}>
					Bienvenido
				</Text>
			</View>

			{/*Cambiar a LoginUserScreen*/}

			<View style={styles.flex}>
				<View style={styles.networks}>
					<Text style={{ ...fonts.BLACK, ...fonts.P1 }}>
						Ingresa con tus redes sociales
					</Text>
					<RedesSociales />
				</View>
				<View style={styles.networks}>
					<Text style={{ ...fonts.P2, ...fonts.BLACK }}>
						¿Ya tienes una cuenta?
					</Text>
					<TouchableOpacity
						style={styles.networkButton}
						onPress={() => {
							props.navigation.navigate('LoginUserScreen')
						}}
					>
						<Text style={{ ...styles.networkButtonText, fontSize: 16 }}>
							Iniciar Sesión
						</Text>
						<FontAwesome
							style={styles.networkButtonText}
							name="sign-in"
							size={24}
							color="black"
						/>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	heading: {
		textTransform: 'uppercase',
		letterSpacing: 2,
	},

	flex: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},

	image: {
		width: 250 * 1.5,
		height: 125 * 1.5,
		resizeMode: 'cover',
	},

	networkButtonText: {
		marginRight: 8,
		paddingVertical: 18,
	},
	networkButton: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignContent: 'center',
		marginVertical: 8,
		borderRadius: 25,
		backgroundColor: '#ddd',
		width: '50%',
	},
	networks: {
		width: '100%',
		alignItems: 'center',
	},
})
