import react from 'react'
import { View, StyleSheet, Text } from 'react-native'
import RedSocial from '../redSocial/RedSocial'

const networks = {
	facebook: '#2F4FA2',
	google: '#E5362D',
}

export default function RedesSociales() {
	return (
		<View style={styles.networks}>
			<RedSocial
				title={'Facebook'}
				backColor={networks.facebook}
				id={'facebook'}
			/>
			<RedSocial title={'Gmail'} backColor={networks.google} id={'gmail'} />
		</View>
	)
}

const styles = StyleSheet.create({
	networks: {
		width: '100%',
		alignItems: 'center',
	},
})
