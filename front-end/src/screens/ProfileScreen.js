import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView, ImageBackground, ActivityIndicator } from 'react-native';
import { Rating, Button } from 'react-native-elements';
const { width, height } = Dimensions.get('window');
import trackerApi from '../api/tracker';
import { EvilIcons, Entypo, AntDesign } from '@expo/vector-icons';
import { Context as AuthContext } from '../context/AuthContext';

const ProfileScreen = ({ navigation }) => {

    const [result, setResult] = useState(null);
    const { signout } = useContext(AuthContext);

    const getProfile = async () => {
        try {
            const response = await trackerApi.get('/cart/profile');
            const data = response.data.profile[0]
            console.log(data)
            setResult(data)
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getProfile()
    }, [])


    if (result == null) {
        return <ActivityIndicator style={{ height: '100%', justifyContent: 'center', alignSelf: 'center' }} size='large' />
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ height: 1000 }}>
                <ImageBackground source={require('../../assets/bg2.jpeg')} style={{ height: 250, width }}>
                    <TouchableOpacity style={{marginLeft:20,marginTop:10}} activeOpacity={0.8} onPress={() => navigation.navigate('Search')}>
                        <AntDesign name='arrowleft' size={24} color='white'/>
                    </TouchableOpacity>
                </ImageBackground>
                <Image style={styles.imageStyle} source={require('../../assets/profile.png')} />
                <View style={{ marginTop: 50, alignItems: 'center' }}>
                    <Text style={{ fontSize: 20 }}>{result.name}</Text>
                    <Text style={{ color: 'gray' }}>{result.email}</Text>
                    <View style={{ width: 70, borderWidth: 1, height: 20, marginTop: 10, borderRadius: 10, backgroundColor: 'rgb(247, 198, 0)', borderColor: 'rgb(247, 198, 0)', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 13 }}>1 | Foodie</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <EvilIcons name='location' size={24} color='gray' />
                        <Text style={{ color: 'gray' }}>{result.address}</Text>
                    </View>
                    <Text style={{ color: 'gray', marginTop: 5 }}>(+91) {result.phoneNo}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-around', marginBottom: 20 }}>
                    <Button title='Order History' type='outline' titleStyle={{ color: 'gray', fontSize: 15 }} onPress={() => navigation.navigate('MyOrders')} />
                    <Button title='Contact Us' type='outline' titleStyle={{ color: 'gray', fontSize: 15 }} />
                    <Button title='Edit Profile' type='outline' titleStyle={{ color: 'gray', fontSize: 15 }} onPress={() => navigation.navigate('EditProfile', {profile:result})}/>
                </View>
                <View style={{ marginTop: 30, width: 150, alignSelf: 'center' }}>
                    <Button title='Log Out' buttonStyle={{ backgroundColor: 'rgb(255, 119, 0)' }} onPress={signout} />
                </View>

            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    imageStyle: {
        height: 80,
        width: 80,
        alignSelf: 'center',
        borderRadius: 50,
        position: 'absolute',
        marginTop: 210,
        borderWidth: 3,
        borderColor: 'white'
    }
});

export default ProfileScreen;