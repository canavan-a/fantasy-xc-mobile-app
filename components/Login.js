import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import React, { useState, useEffect, useContext, props } from 'react';
import { AppContext } from './AppContext';
import axios from 'axios';
import Card from './Card';


function LoginScreen({ navigation }) {
  const { appUrl, setAppUrl, userId, setUserId, sessionId, setSessionId } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorResponse, setErrorResponse] = useState('');
  

  const onChangeEmail = (text) => {
    setEmail(text);
  };

  const onChangePassword = (text) => {
    setPassword(text);
  };

  const handleLogin = () => {
    
    console.log(appUrl);
    console.log(email);
    console.log(password);

    axios.get(appUrl + `login?email=${email}&password=${password}`).
      then((response) => {
        console.log(response.data);
        setUserId(email);
        console.log(response.data);
        setSessionId(response.data);
        navigation.navigate('Home');
      }).catch((error) => {
        console.log(error.response.data);
        setEmail('');
        setPassword('');
        setErrorResponse(error.response.data);
      });
  }

  const goToSignUp = () => {
    navigation.navigate('SignUp');
  }
  // useEffect(() => {
  //   console.log(email);
  // }, [email]);

  //add loginbypass here!!!
  //maybe pagebypass
  //maybe new app routes


  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <View style={styles.container}>
        <Card>
          <Text style={styles.header}>
            Fantasy XC Mobile
          </Text>
        </Card>
      </View>
      <Text>

      </Text>
      <Card>
        <TextInput
          email
          style={styles.input}
          placeholder='email'
          value={email}
          onChangeText={onChangeEmail}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder='Password'
          value={password}
          onChangeText={onChangePassword}
        />
        {errorResponse != "" ? (

          <Text
            style={styles.error}
            onPress={()=>{setErrorResponse('')}}
          >
            {errorResponse}
          </Text>
        ) : (<></>)}


        <Button
          style={styles.button }
          title='Log In'
          onPress={handleLogin}
          color='#757575'
        />
        <View
        style={styles.container}
        >
        <Button
          title='Create an Account'
          height='3'
          color='#ccc'
          margin='3'
          onPress={goToSignUp}
        >
        </Button>
        </View>

      </Card>

    </View>
  );
}

const styles = StyleSheet.create({
  header:{
    fontSize:30,
    textAlign:'center'
  },
  input: {

    height: 40,
    marginBottom:10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 5,
    paddingHorizontal: 10,
  },

  error: {
    padding: 10,

    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#ff5147'
  },
  container:{
    marginTop:10,
    marginBottom:5
  }
});


export default LoginScreen;

