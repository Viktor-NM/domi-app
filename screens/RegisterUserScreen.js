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
} from 'react-native'
import fonts from '../assets/theme/index'
import splashLogo from '../assets/splash-logo'

import { SimpleLineIcons, AntDesign } from '@expo/vector-icons'
import firebase from '../database/firebase'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

export default function RegisterUserScreen(props) {
	const [userInfo, setUserInfo] = useState({
		name: '',
		lastName: '',
		email: '',
		password: '',
	})
	const [modal, setModal] = useState({ name: '', message: '' })

	const handleChangeText = (name, value) => {
		setUserInfo({ ...userInfo, [name]: value })
	}

	const createNewUser = () => {
		if (userInfo.email !== '' && userInfo.password !== '') {
			firebase.firebase
				.auth()
				.createUserWithEmailAndPassword(userInfo.email, userInfo.password)
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
					error.message.includes('auth/email-already-in-use')
						? setModal({
								name: 'Correo ya registrado',
								message:
									'La dirección de correo electrónico ya está en uso por otra cuenta. 👀',
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
			<View>
				<Text style={{ ...fonts.BLACK, ...fonts.H1, ...styles.heading }}>
					Registro de usuario
				</Text>
			</View>
			<View style={styles.body}>
				<View style={formStyles.formStyle}>
					{/* <View style={formStyles.inputGroup}>
						<TextInput
							style={formStyles.input}
							placeholder="Ingrese su nombre"
							onChangeText={(value) => handleChangeText('name', value)}
							selectionColor="#DD1415"
							caretHidden={true}
						/>
					</View>
					<View style={formStyles.inputGroup}>
						<TextInput
							style={formStyles.input}
							placeholder="Ingrese sus apellidos"
							onChangeText={(value) => handleChangeText('lastName', value)}
							selectionColor="#DD1415"
							caretHidden={true}
						/>
					</View> */}
					<View style={formStyles.inputGroup}>
						<TextInput
							style={formStyles.input}
							placeholder="Ingrese su correo electronico"
							onChangeText={(value) => handleChangeText('email', value)}
							selectionColor="#DD1415"
							caretHidden={true}
						/>
					</View>
					<View style={formStyles.inputGroup}>
						<TextInput
							style={formStyles.input}
							placeholder="Ingrese su contraseña"
							onChangeText={(value) => handleChangeText('password', value)}
							secureTextEntry={true}
							selectionColor="#DD1415"
							caretHidden={true}
						/>
					</View>
					<TouchableOpacity
						onPress={() => createNewUser()}
						style={styles.buttonSignin}
					>
						<AntDesign name="adduser" size={24} color="white" />
						<Text style={styles.textButtonSignin}>Crear cuenta</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}

const formStyles = StyleSheet.create({
	inputGroup: {
		padding: 0,
		width: '75%',
	},
	formStyle: {
		marginVertical: 34,
		justifyContent: 'flex-start',
		flex: 5,
	},
	input: {
		borderBottomWidth: 1,
		paddingVertical: 18,
		paddingHorizontal: 10,
		fontSize: 18,
		marginVertical: 8,
		borderRadius: 5,
		minWidth: '100%',
		textAlign: 'center',
	},
})

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	logo: {
		width: 250 * 0.8,
		height: 125 * 0.8,
		resizeMode: 'cover',
	},

	header: {
		flex: 1,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},

	heading: {
		textTransform: 'uppercase',
		letterSpacing: 2,
		fontSize: 28,
		textAlign: 'center',
	},

	body: {
		flex: 5,
		width: '100%',
		alignItems: 'center',
	},
	icon: {
		position: 'absolute',
		left: 0,
		paddingHorizontal: 16,
		paddingVertical: 16,
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
