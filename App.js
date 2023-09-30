import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, createContext, props } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, Button } from 'react-native';
import LoginScreen from './components/Login';
import HomeScreen from './components/Home';
import SignUpScreen from './components/SignUp';
import AthleteList from './components/AthleteList';
import { AppProvider } from './components/AppContext';


const Stack = createStackNavigator();

// const applicationURL = 'http://localhost/';

export default function App() {


  return (





    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AthleteList" component={AthleteList} />

        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>




  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#aaa',
  },
  input: {

    height: 40,
    marginBottom:10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 5,
    paddingHorizontal: 10,
  },
});
