import react from 'react'
import { useState } from 'react'
import { View, Text, Image, TextInput, StyleSheet, Button } from 'react-native'
import fonts from '../assets/theme/index'
import splashLogo from '../assets/splash-logo'

import firebase from '../database/firebase'

export default function RegisterUserScreen() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
  })

  const handleChangeText = (name, value) => {
    setUserInfo({ ...userInfo, [name]: value })
  }

  const createNewUser = async () => {
    console.log(userInfo)
    if (
      userInfo.name === '' ||
      userInfo.lastName === '' ||
      userInfo.email === '' ||
      userInfo.password === ''
    ) {
      alert('Ingrese todos los campos')
    } else {
      await firebase.db.collection('users').add({
        name: userInfo.name,
        lastName: userInfo.lastName,
        email: userInfo.email,
        password: userInfo.password,
      })
      alert('Usuario registrado')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={{ ...fonts.BLACK, ...fonts.H1 }}>Registro de usuario</Text>
        <View style={formStyles.formStyle}>
          <View style={formStyles.inputGroup}>
            <TextInput
              style={styles.input}
              onChangeText={(value) => handleChangeText('name', value)}
              placeholder="Ingrese su nombre"
            />
          </View>
          <View style={formStyles.inputGroup}>
            <TextInput
              style={styles.input}
              onChangeText={(value) => handleChangeText('lastName', value)}
              placeholder="Ingrese sus apellidos"
            />
          </View>
          <View style={formStyles.inputGroup}>
            <TextInput
              style={styles.input}
              onChangeText={(value) => handleChangeText('email', value)}
              placeholder="Ingrese su correo electronico"
              keyboardType="email-address"
            />
          </View>
          <View style={formStyles.inputGroup}>
            <TextInput
              style={styles.input}
              onChangeText={(value) => handleChangeText('password', value)}
              placeholder="Ingrese su contraseña"
              secureTextEntry={true}
            />
          </View>
          <View>
            <Button title="Siguiente" onPress={() => createNewUser()} />
          </View>
        </View>
      </View>
    </View>
  )
}

const formStyles = StyleSheet.create({
  inputGroup: {
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  formStyle: {
    flex: 1,
    padding: 35,
    borderWidth: 1,
  },
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 250 * 0.5,
    height: 125 * 0.5,
    resizeMode: 'cover',
  },

  bannerLogo: {
    borderWidth: 1,
  },

  body: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
  },
})
