import react from 'react'
import { View, Image, StyleSheet } from 'react-native'
import splashLogo from '../assets/splash-logo'

export default function LoadScreen() {
  return (
    <View>
      <Image
        source={{
          uri: splashLogo.src,
        }}
        style={styles.image}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 250 * 1.5,
    height: 125 * 1.5,
    resizeMode: 'cover',
  },
})
