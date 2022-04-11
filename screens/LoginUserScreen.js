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
		if (userInfo.email !== '' && userInfo.password !== '') {
			firebase.firebase
				.auth()
				.signInWithEmailAndPassword(userInfo.email, userInfo.password)
				.then((userCredential) => {
					props.navigation.navigate('MainScreen')
					const user = userCredential.user
					console.log(user)
				})
				.catch((error) => {
					console.log(error.message)
					error.message.includes('auth/invalid-email')
						? setModal({
								name: 'Correo electrónico invalido',
								message:
									'Por favor ingrese una direccion de correo electrónico valida. 👀',
						  })
						: {}
					error.message.includes('auth/weak-password')
						? setModal({
								name: 'Contraseña invalida',
								message:
									'Por favor ingrese una contraseña con un mínimo de 6 caracteres. 👀',
						  })
						: {}
					error.message.includes('auth/wrong-password')
						? setModal({
								name: 'Contraseña incorrecta',
								message:
									'Su contraseña es incorrecta, por favor ingresela correctamente. 👀',
						  })
						: {}
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
						props.navigation.navigate('AuthScreen')
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
				<View style={{ ...styles.flexItems, ...styles.formLogin }}>
					<Text
						style={{
							...fonts.BLACK,
							...fonts.H1,
							textTransform: 'uppercase',
							letterSpacing: 2,
						}}
					>
						Iniciar sesión
					</Text>
					<View style={styles.inputForm}>
						<TextInput
							style={styles.input}
							placeholder="Ingrese su correo electronico"
							onChangeText={(value) => handleChangeText('email', value)}
							selectionColor="#DD1415"
							caretHidden={true}
						/>
						<TextInput
							style={styles.input}
							placeholder="Ingrese su contraseña"
							onChangeText={(value) => handleChangeText('password', value)}
							secureTextEntry={true}
							selectionColor="#DD1415"
							caretHidden={true}
						/>
						<TouchableOpacity
							onPress={() => logInUser()}
							style={styles.buttonSignin}
						>
							<SimpleLineIcons name="arrow-right" size={24} color="white" />
							<Text style={styles.textButtonSignin}>Ingresar</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View style={{ ...styles.flexItems, ...styles.questionAccount }}>
					<TouchableOpacity
						onPress={() => {
							props.navigation.navigate('ForgotPasswordScreen')
						}}
					>
						<Text style={{ ...fonts.BLACK, ...fonts.P2, color: '#DD1415' }}>
							¿Ha olvidado su contraseña?
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							props.navigation.navigate('RegisterUserScreen')
						}}
					>
						<Text style={{ ...fonts.BLACK, ...fonts.P2 }}>
							Cree una cuenta con nosotros
						</Text>
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
	},

	flexItems: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},

	formLogin: {
		justifyContent: 'space-evenly',
		flex: 5,
	},

	questionAccount: {
		justifyContent: 'space-evenly',
		paddingBottom: 36,
		flex: 1,
	},

	input: {
		borderBottomWidth: 1,
		paddingVertical: 18,
		paddingHorizontal: 10,
		fontSize: 18,
		marginVertical: 8,
		borderRadius: 5,
		width: '100%',
	},
	inputForm: {
		width: '75%',
	},
	buttonSignin: {
		backgroundColor: '#DD1415',
		color: '#fff',
		padding: 18,
		borderRadius: 50,
		marginVertical: 12,
		flexDirection: 'row-reverse',
		justifyContent: 'center',
	},
	textButtonSignin: {
		fontSize: 16,
		color: '#fff',
		paddingHorizontal: 12,
	},
})
