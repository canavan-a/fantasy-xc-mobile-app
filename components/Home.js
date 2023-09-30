import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, Text, Picker, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext, props } from 'react';
import { AppContext } from './AppContext';
import axios from 'axios';
import Card from './Card';
import FontAwesome from '@expo/vector-icons/FontAwesome';

function HomeScreen({ navigation }) {
    const { appUrl, setAppUrl, userId, setUserId, sessionId, setSessionId } = useContext(AppContext);
    const [pickedGame, setPickedGame] = useState('');
    const [gameList, setGameList] = useState([]);
    const [createGameGender, setCreateGameGender] = useState('m');
    const [newGameCode, setNewGameCode] = useState('');
    const [errorResponse, setErrorResponse] = useState('');
    const [joinGameCode, setJoinGameCode] = useState('');
    const [selectionColor, setSelectionColor] = useState('white');

    function reloadGames() {
        axios.post(appUrl + `mygamelist?appcookie=${sessionId}`).
            then((response) => {

                console.log(response.data);
                setGameList(response.data);
                console.log(response.status);
            }).catch((error) => {
                console.log(error.response.status);
                if (error.response.status === 403) {
                    navigation.navigate('Login');
                }
            });
    }

    useEffect(() => {
        reloadGames();
    }, []);

    useEffect(() => {
        if (pickedGame != '') {
            console.log('we can redirect');
            console.log(pickedGame);
        }
    }, [pickedGame]);

    const changeNewGameText = (text) => {
        setNewGameCode(text);
        console.log(newGameCode);
    };

    const joinGameChange = (text) => {
        setJoinGameCode(text.toLowerCase());
        console.log(joinGameCode);
    }


    const createNewGame = () => {
        axios.post(appUrl + `creategame?game=${newGameCode}&gender=${createGameGender}&appcookie=${sessionId}`).
            then((response) => {
                //setGameList(gameList.push(newGameCode).sort());
                reloadGames();
                setPickedGame(newGameCode);
                setNewGameCode('');
                setErrorResponse('');


            }).catch((error) => {
                if (error.response.status === 403) {
                    navigation.navigate('Login');
                }
                else {

                    setErrorResponse(error.response.data);
                }
            });
    }

    const joinGame = () => {
        axios.post(appUrl + `joingame?game=${joinGameCode}&appcookie=${sessionId}`)
            .then((reponse) => {
                async function exec() {
                    reloadGames();
                    setPickedGame(joinGameCode);
                    setSelectionColor('#96ff70');
                    setJoinGameCode('');
                }
                exec();

            }).catch((error) => {
                if (error.response.status === 403) {
                    navigation.navigate('Login');
                }
                else {
                    setErrorResponse(error.response.data);
                }
            });
    }

    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'column',
                paddingTop: 12,
            }}
        >

            {/* <Text style={styles.largeText}>
                Welcome to NCAA Fantasy
            </Text> */}
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
            >

                <FontAwesome.Button

                    name='chevron-left'
                    size={22}
                    backgroundColor='#ccc'
                    style={{ marginLeft: 5 }}
                    onPress={() => navigation.goBack()}
                >

                </FontAwesome.Button>
                <FontAwesome.Button

                    name='gear'
                    size={22}
                    backgroundColor='#ccc'
                    style={{ marginLeft: 10 }}
                    onPress={() => navigation.goBack()}
                >

                </FontAwesome.Button>
            </View>
            <View style={{
                padding: 5,
            }} />

            <Card>
                <Text >Go to Game</Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Picker
                        style={
                            {

                                height: 30,
                                marginTop: 10,
                                marginBottom: 10,
                                borderWidth: 1,
                                borderColor: '#ccc',
                                borderRadius: 4,
                                backgroundColor: selectionColor,
                                marginHorizontal: 5,
                                paddingHorizontal: 10,
                            }
                        }

                        selectedValue={pickedGame}
                        onValueChange={(itemValue) => { setPickedGame(itemValue), setSelectionColor('white') }}>
                        <Picker.Item label="Select Game" value='' />
                        {gameList.map((item, index) => (
                            <Picker.Item label={item} value={item} key={index} />
                        ))}

                    </Picker>
                    <View style={{ marginTop: 5 }}>
                        <FontAwesome.Button

                            name='chevron-right'
                            size={22}
                            backgroundColor='#ccc'
                            style={{ marginLeft: 12 }}

                            onPress={() => { console.log('go') }}
                        >

                        </FontAwesome.Button>
                    </View>
                </View>
            </Card>
            <View style={{
                padding: 1,
            }} />
            <Card >
                <Text>Create Game</Text>
                <View style={styles.row}>


                    <TextInput
                        newgame
                        value={newGameCode}
                        placeholder='new game code'
                        style={styles.input}
                        onChangeText={changeNewGameText}
                    />
                    <Picker
                        style={styles.input}
                        onValueChange={(itemValue) => { setCreateGameGender(itemValue) }}
                    >
                        <Picker.Item label="Men" value="m"></Picker.Item>
                        <Picker.Item label="Women" value="f"></Picker.Item>
                    </Picker>
                </View>

                <View>
                    <Button
                        style={styles.createGameButton}
                        height='3'
                        onPress={createNewGame}
                        color='#ccc'
                        title='Create Game'
                    >

                    </Button>
                </View>

            </Card>

            <View style={{
                padding: 1,
            }} />

            <Card>
                <Text>Join Game</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    <View>
                        <TextInput
                            joingame
                            value={joinGameCode}
                            placeholder='enter game code'
                            style={styles.input}
                            onChangeText={joinGameChange}
                        />
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <Button




                            onPress={joinGame}
                            color='#ccc'
                            title='Join'
                        />
                    </View>

                </View>
            </Card>
            <View style={{
                padding: 10,
            }} />
            {errorResponse != "" ? (
                <Text
                    style={styles.error}
                    onPress={() => { setErrorResponse('') }}
                >
                    {errorResponse}
                </Text>
            ) : (<></>)}


            <View style={styles.footer}>
                <View>
                    <TouchableOpacity
                    style
                    >
                        <FontAwesome
                            name='list-ol'
                            size={22}
                            color='gray'
                            width='20'
                            alignItems='end'
                            backgroundColor='white'
                            // style={{ marginLeft: 12 }}

                            onPress={() => { navigation.navigate('AthleteList'); }}
                        >

                        </FontAwesome>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    smallText: {
        fontSize: 12,
    },
    error: {
        padding: 10,

        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#ff5147'
    },
    mediumText: {
        fontSize: 16,
    },
    largeText: {
        fontSize: 20,
    },
    input: {

        height: 30,
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        marginHorizontal: 5,
        paddingHorizontal: 10,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    createGameButton: {

        backgroundColor: '#ff5147'
    },
    footer: {
        position: 'absolute',
        borderRadius:4,
        bottom: 0,
        width:62,
        right: 0,
        padding: 20,
        backgroundColor: 'white',
        flexDirection: 'row',
    justifyContent: 'flex-end', // Push the button to the right
    alignItems: 'center', // Center the button vertically

    },
});

HomeScreen.navigationOptions = {
    headerShown: false,
};

export default HomeScreen;