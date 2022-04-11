import react from 'react'
import { useState } from 'react'
import {
	View,
	Text,
	Image,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Alert,
	Pressable,
	Modal,
} from 'react-native'
import fonts from '../assets/theme/index'
import splashLogo from '../assets/splash-logo'
import { SimpleLineIcons } from '@expo/vector-icons'

import { sighInWithEmailAndPassword, getAuth } from 'firebase/auth'
import firebase from '../database/firebase'

export default function LoginUserScreen(props) {
	const [userInfo, setUserInfo] = useState({ email: '', password: '' })
	const [modal, setModal] = useState({ name: '', message: '' })

	const handleChangeText = (name, value) => {
		setUserInfo({ ...userInfo, [name]: value })
	}

	const logInUser = () => {
		if (userInfo.email !== '') {
			firebase.firebase
				.auth()
				.sendPasswordResetEmail(userInfo.email)
				.then((userCredential) => {
					props.navigation.navigate('LoginUserScreen')

					Alert.alert(
						'Recuperación de cuenta',
						'Se ha enviado un correo de confirmación para restablecer su contraseña a su correo electrónico, por favor revise su bandeja de entrada. 😋'
					)
				})
				.catch((error) => {
					setModal({
						name: 'Correo electrónico invalido.',
						message:
							'Por favor ingrese una direccion de correo electrónico valida. 👀',
					})

					Alert.alert(modal.name, modal.message)
				})
		} else {
			Alert.alert(
				'Campos vacíos',
				'Por favor ingrese todos los datos en los campos correspondientes. 👀'
			)
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text
					style={styles.icon}
					onPress={() => {
						props.navigation.navigate('LoginUserScreen')
					}}
				>
					<SimpleLineIcons name="arrow-left" size={24} color="black" />
				</Text>
				<Image
					source={{
						uri: splashLogo.src,
					}}
					style={styles.logo}
				/>
			</View>
			<View style={styles.body}>
				<Text
					style={{
						...fonts.BLACK,
						...fonts.H1,
						textTransform: 'uppercase',
						letterSpacing: 2,
					}}
				>
					Recuperar cuenta
				</Text>
				<View style={{ ...styles.body, ...styles.inputForm }}>
					<TextInput
						style={styles.input}
						placeholder="Ingrese su correo electronico"
						onChangeText={(value) => handleChangeText('email', value)}
						selectionColor="#DD1415"
						caretHidden={true}
					/>
					<TouchableOpacity onPress={() => logInUser()} style={styles.button}>
						<SimpleLineIcons name="arrow-right" size={24} color="white" />
						<Text style={styles.textButton}>Confirmar correo</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	logo: {
		width: 250 * 0.8,
		height: 125 * 0.8,
		resizeMode: 'cover',
	},
	icon: {
		position: 'absolute',
		left: 0,
		paddingHorizontal: 16,
		paddingVertical: 16,
	},

	header: {
		flex: 1,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},

	body: {
		flex: 5,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	input: {
		borderBottomWidth: 1,
		paddingVertical: 18,
		paddingHorizontal: 10,
		fontSize: 18,
		marginVertical: 32,
		borderRadius: 5,
		width: '100%',
	},
	inputForm: {
		width: '75%',
		justifyContent: 'center',
	},
	button: {
		backgroundColor: '#DD1415',
		color: '#fff',
		padding: 18,
		borderRadius: 50,
		marginVertical: 12,
		flexDirection: 'row-reverse',
		justifyContent: 'center',
	},
	textButton: {
		fontSize: 16,
		color: '#fff',
		paddingHorizontal: 12,
	},
})
