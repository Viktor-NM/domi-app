import { View, Text, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

export default function RedSocial({ id, backColor, title }) {
	const methodChoose = () => {
		switch (id) {
			case 'facebook':
				console.log(id)
				break
			case 'gmail':
				console.log(id)
				break

			default:
				break
		}
	}

	return (
		<View style={{ backgroundColor: backColor, ...styles.cartNetwork }}>
			{id == 'facebook' ? (
				<FontAwesome name="facebook-square" size={24} color="white" />
			) : (
				<FontAwesome name="google" size={24} color={'white'} />
			)}
			<Text style={styles.network} onPress={methodChoose}>
				{title}
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	network: {
		fontSize: 18,
		color: '#fff',
		marginLeft: 8,
	},

	cartNetwork: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 18,
		marginVertical: 8,
		borderRadius: 25,
		width: '50%',
	},
})
