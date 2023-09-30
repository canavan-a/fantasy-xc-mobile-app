import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet, View, Button, FlatList, Dimensions,
    Text, Image, Picker, TextInput, SafeAreaView, TouchableOpacity
} from 'react-native';
import React, { useState, useEffect, useContext, props } from 'react';
import { AppContext } from './AppContext';
import axios from 'axios';
import Card from './Card';
import FontAwesome from '@expo/vector-icons/FontAwesome';


function AthleteList({ navigation }) {
    const [listData, setListData] = useState([]);
    const { appUrl } = useContext(AppContext);
    const {imgUrl} = useContext(AppContext);
    const [gender, setGender] = useState('m');
    const [scrollOffset, setScrollOffset] = useState(0);
    const screenHeight = Dimensions.get('window').height;

    const swapGenders = () => {
        if (gender === 'm'){
            setGender('f');
        }
        else{
            setGender('m');
        }
    }

    const handleScroll = (event) =>{
        const offset = event.nativeEvent.contentOffset.y;
        setScrollOffset(offset);
    }
    useEffect(()=>{console.log(scrollOffset)},[scrollOffset]);

    useEffect(() => {
        axios.get(appUrl + `homepageloader?gender=${gender}`)
            .then((response) => {
                setListData(response.data);
            }).catch((error) => {
                console.log(error.response.status);
                if (error.response.status === 403) {
                    navigation.navigate('Login');
                }
            });
    }, [gender]);

    const renderItem = ({ item }) => (
        <View style={{flexDirection:'row'}}> 
        
        <View style={styles.box}>
            <Image source={{uri: `${imgUrl}${item.school}.png`}}
            style={{width: 40, height: 40, marginRight: 30}} />
            
            
            <Text style={styles.boxText}>{item.name}</Text>
            
            
        </View>
        <View style={styles.boxRank}>
            <Text>{item.rank}</Text>
        </View>
        </View>

    );

    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'column',
                paddingTop: 12,
            }}
        >
            <View style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    data={listData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    style={{ height: screenHeight - 50 }}
                    contentContainerStyle={styles.scrollContent}
                    onScroll={handleScroll}
                />
            </SafeAreaView>
                





            </View>
            <View style={styles.footer}>
                    <View>
                        <TouchableOpacity
                            style
                        >
                            <FontAwesome
                                name='home'
                                size={22}
                                color='gray'
                                width='20'
                                alignItems='end'
                                backgroundColor='white'
                                // style={{ marginLeft: 12 }}

                                onPress={() => { navigation.navigate('Home'); }}
                            >

                            </FontAwesome>
                        </TouchableOpacity>
                    </View>
            </View>

            <View style={styles.genderfooter}>
                    <View>
                        <TouchableOpacity
                            style
                        >
                            <FontAwesome
                                name='exchange'
                                size={22}
                                color='gray'
                                width='20'
                                alignItems='end'
                                backgroundColor='white'
                                // style={{ marginLeft: 12 }}

                                onPress={swapGenders}
                            >

                            </FontAwesome>
                        </TouchableOpacity>
                    </View>
            </View>
            {scrollOffset <= 200 ? (
            <View style={styles.titlebar}>
                    <View>
                        <TouchableOpacity
                            style
                        >
                            
                                <>
                                {gender === 'm' ?(
                                    <Text style={{fontSize:18}}>Men&apos;s Top 250</Text>
                                ):(
                                    <Text style={{fontSize:18}}>Women&apos;s Top 250</Text>
                                )}
                                </>

                            
                            
                        </TouchableOpacity>
                    </View>
            </View>
            ):(
                <></>
                )}



        </View>
    )
}

const styles = StyleSheet.create({

    footer: {
        position: 'absolute',
        borderRadius: 4,
        bottom: 0,
        width:62,
        right: 0,
        padding: 20,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'flex-end', // Push the button to the right
        alignItems: 'center', // Center the button vertically

    },
    genderfooter: {
        position: 'absolute',
        borderRadius: 4,
        bottom: 0,
        width:62,
        left: 0,
        padding: 20,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'flex-end', // Push the button to the right
        alignItems: 'center', // Center the button vertically

    },
    titlebar: {
        position: 'absolute',
        borderRadius: 4,
        top: 0,
        width:170,
        height:20,
        
        padding: 20,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'flex-end', // Push the button to the right
        alignItems: 'center', // Center the button vertically

    },
    scrollContent: {
        flexGrow: 1, // Ensures the FlatList takes available space
        paddingVertical: 10,
        paddingHorizontal: 20,
    },

    container: {
        flex: 1,
    },
    

    box: {
        backgroundColor: 'lightblue',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginBottom: 5,
        borderRadius: 4,
        flex: 1,
        justifyContent: 'space-between',
        fontSize: 16
    },
    boxRank: {
        backgroundColor: 'lightyellow',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        marginLeft:10,
        borderRadius: 4,
        // flexBasis: 'auto',
        width:40,
        justifyContent: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    boxText: {
        
        fontSize: 16,
    },
});



export default AthleteList;