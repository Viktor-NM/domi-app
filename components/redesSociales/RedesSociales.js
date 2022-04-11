import react from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

import RedSocial from '../redSocial/RedSocial'
import { FacebookAuthProvider, signInWithPopup } from 'firebase/auth'
import firebase from '../../database/firebase'

const networks = {
	facebook: '#2F4FA2',
	google: '#E5362D',
}

export default function RedesSociales() {
	const handleSignInWithFacebook = () => {
		const facebookAuthProvider =
			new firebase.firebase.auth.FacebookAuthProvider()
		firebase.firebase
			.auth()
			.signInWithRedirect(facebookAuthProvider)
			.then((result) => {
				const user = result.user
				console.log(user, 'is logged')
				const credential = FacebookAuthProvider.credentialFromResult(result)
				const accessToken = credential.accessToken
			})
			.catch((error) => {
				const errorCode = error.code
				const errorMessage = error.message
				const email = error.email
				const credential = FacebookAuthProvider.credentialFromError(error)
				console.log('errorCode: ', errorCode)
				console.log('errorMessage: ', errorMessage)
				console.log('email: ', email)
				console.log('credential: ', credential)
			})
	}

	const handleSignInWithGoogle = () => {
		const googleAuthProvider = new firebase.firebase.auth.GoogleAuthProvider()
		firebase.firebase
			.auth()
			.signInWithCredential(googleAuthProvider)
			.then((result) => {
				let credential = result.credential
				let token = credential.accessToken
				let user = result.user
			})
			.catch((error) => {
				const errorCode = error.code
				const errorMessage = error.message
				const email = error.email
				const credential = error.credential
				console.log('errorCode: ', errorCode)
				console.log('errorMessage: ', errorMessage)
				console.log('email: ', email)
				console.log('credential: ', credential)
			})
	}

	return (
		<View style={styles.networks}>
			<TouchableOpacity
				style={styles.socialBanner}
				onPress={() => handleSignInWithFacebook()}
			>
				<RedSocial
					title={'Facebook'}
					backColor={networks.facebook}
					id={'facebook'}
				/>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.socialBanner}
				onPress={() => handleSignInWithGoogle()}
			>
				<RedSocial title={'Google'} backColor={networks.google} id={'gmail'} />
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	networks: {
		width: '100%',
		alignItems: 'center',
	},
	socialBanner: {
		width: '50%',
	},
})
