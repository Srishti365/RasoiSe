import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import trackerApi from '../api/tracker';

// user profile edit screen

const EditUserProfile = ({ navigation }) => {

    const profile = navigation.getParam('profile')
    // console.log('user profile',profile);
    const [name, setName] = useState(profile.name);
    const [email, setEmail] = useState(profile.email);
    const [password, setPassword] = useState();
    const [phone, setPhone] = useState(profile.phoneNo);
    const [err, setErr] = useState(null)

    const editProfile = async () => {
        try {
            const response = await trackerApi.post('/cart/editProfile', { name, email, password, phone })
            // console.log(response)
            navigation.navigate('ProfileScreen');
        } catch (err) {
            setErr(err.response.data.error)
            // console.log(err.response.data.error);
        }
    }


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ height: 280, backgroundColor: 'rgb(20, 25, 43)', opacity: 2 }}>
                <View style={{ marginLeft: 20, marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={{ flex: 1 }} activeOpacity={0.8} onPress={() => navigation.navigate('ProfileScreen')}>
                        <AntDesign name='arrowleft' color='white' size={24} />
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15, flex: 1, alignSelf: 'center', marginRight: 20 }}>Edit Profile</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={editProfile}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15, marginRight: 20 }}>SAVE</Text>
                    </TouchableOpacity>
                </View>
                <Image source={require('../../assets/profile.png')} style={{ width: 100, height: 100, borderRadius: 60, marginTop: 40, alignSelf: 'center' }} />
            </View>
            <View style={{ borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: -30, backgroundColor: 'white' }}>
                <Text style={{ marginLeft: 30, color: 'gray', marginBottom: -5, marginTop: 20 }}>Name</Text>
                <TextInput
                    value={name}
                    onChangeText={(name) => setName(name)}
                    style={styles.input}
                />
                <Text style={{ marginLeft: 30, color: 'gray', marginBottom: -5, marginTop: 20 }}>Email</Text>
                <TextInput
                    value={email}
                    onChangeText={(email) => setEmail(email)}
                    style={styles.input}
                />
                <Text style={{ marginLeft: 30, color: 'gray', marginBottom: -5, marginTop: 20 }}>Phone Number</Text>
                <TextInput
                    value={phone}
                    onChangeText={(phone) => setPhone(phone)}
                    style={styles.input}
                    keyboardType='numeric'
                    value={`${phone}`}
                />
                <Text style={{ marginLeft: 30, color: 'gray', marginBottom: -5, marginTop: 20 }}>Password</Text>
                <TextInput
                    value={password}
                    placeholder='Should be of minimum 8 characters'
                    onChangeText={(password) => setPassword(password)}
                    style={styles.input}
                    secureTextEntry={true}
                />

            </View>
            {err ? <Text style={{ color: 'red', alignSelf: 'center', marginTop: 20 }}>{err}</Text> : null}
        </View>
    )
}


EditUserProfile.navigationOptions = () => {
    return {
        headerShown: false
    };
};


const styles = StyleSheet.create({
    input: {
        height: 40,
        marginHorizontal: 30,
        borderBottomWidth: 1,
        borderColor: 'rgb(220,220,220)'
    }
});

export default EditUserProfile;