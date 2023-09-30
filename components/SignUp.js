import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity  } from 'react-native';
import React, { useState, useEffect, useContext, props } from 'react';
import { AppContext } from './AppContext';
import axios from 'axios';
import Card from './Card';

import Icon from 'react-native-vector-icons/Ionicons';


function SignUpScreen({ navigation }) {
    const { appUrl, setAppUrl, userId, setUserId } = useContext(AppContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');

    const [errorResponse, setErrorResponse] = useState('');
    const [confirmResponse, setConfirmResponse] = useState('');

    const onChangeEmail = (text) => {
        setEmail(text);
    };

    const onChangePassword = (text) => {
        setPassword(text);
    };
    const onChangeConfirmPassword = (text) => {
        setConfirmPassword(text);
    };

    const onChangeFname = (text) => {
        setFname(text);
    };

    const onChangeLname = (text) => {
        setLname(text);
    };

    const handleSignUp = () => {
        let url = `${appUrl}signup?fname=${fname}&lname=${lname}&email=${email}&password=${password}`;
        if(password != confirmPassword){
            setErrorResponse('Passwords do not match.');
        }
        else{
            console.log('hello');
            axios.post(url, {
            }).then((response) => {
            setErrorResponse('');
            setFname('');
            setLname('');
            setPassword('');
            setConfirmPassword('');
            setEmail('');
            setConfirmResponse('Please check your email to finish registration.');
            
          })
          .catch((error) => {
            console.log(error);
            setPassword('');
            setConfirmPassword('');
            setErrorResponse(error.response.data);
          });
        }
    }

    return (
        <>
        <View style={styles.row}>
        <TouchableOpacity
        
        style={{width:'20%'}}
        
        
        onPress= {()=>{navigation.navigate('Login');}}
        >
             <Icon 
             name="arrow-back" 
             size={40}
             shadow={true}
             color='#ccc'
             />
        </TouchableOpacity>        
        </View>
        <View
            style={{
                padding: 20,
            }}
        >
            
            <Card style={styles.container}>
                <View style={styles.row}>
                    <TextInput
                    value={fname}
                    onChangeText={onChangeFname}
                    style={styles.inputName}
                    placeholder="First"
                    />
                    <TextInput
                    value={lname}
                    onChangeText={onChangeLname}
                    style={styles.inputName}
                    placeholder="Last"
                    />
                </View>
                <TextInput
                    value={email}
                    onChangeText={onChangeEmail}
                    style={styles.input}
                    placeholder="Email"
                    />
                    <TextInput
                    value={password}
                    secureTextEntry={true}
                    onChangeText={onChangePassword}
                    style={styles.input}
                    placeholder="Password"
                    />
                    <TextInput
                    value={confirmPassword}
                    secureTextEntry={true}
                    onChangeText={onChangeConfirmPassword}
                    style={styles.input}
                    placeholder="Confirm Password"
                    />
                {errorResponse != "" ? (

                    <Text
                    style={styles.error}
                    onPress={()=>{setErrorResponse('')}}
                    >
                    {errorResponse}
                    </Text>
                    ) : (<></>)}
                {confirmResponse != "" ? (

                    <Text
                    style={styles.confirm}
                    
                    >
                    {confirmResponse}
                    </Text>
                    ) : (<></>)}
                <Button
                    onPress= {handleSignUp}
                    title='Create'
                    width='50%'
                    height='3'
                    color='#ccc'
                    margin='3'
                />
            </Card>
        </View>
        </>
    );

}

const styles = StyleSheet.create({
    nameline: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    header: {
        fontSize: 30,
        textAlign: 'center'
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        marginHorizontal: 5,
        paddingHorizontal: 10,
        marginBottom:10,
    },
    inputName: {
        width: '50%',
        height: 40,
        borderWidth: 1,
        marginBottom:10,
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
    confirm: {
        padding: 10,

        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#4ede61'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
});

export default SignUpScreen;