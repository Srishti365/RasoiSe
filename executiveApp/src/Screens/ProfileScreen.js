import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Dimensions, StatusBar, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons, SimpleLineIcons, FontAwesome5, AntDesign, Entypo } from '@expo/vector-icons';
const { width, height } = Dimensions.get('window');
import trackerApi from '../api/tracker';
import SignoutScreen from '../Screens/SignoutScreen';

// executive profile

const ProfileScreen = ({ navigation }) => {

    const [result, setResult] = useState([])
    const [visible, setVisible] = useState(false)

    const getProfile = async () => {
        const response = await trackerApi.get('/execdetails/profile');
        setResult(response.data.profile[0])
        setVisible(true)
    }

    // console.log('profile', result)

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <View>
            {visible ?
                <SafeAreaView style={{ height, backgroundColor: 'white' }}>
                    <StatusBar backgroundColor='#EA3C53' />
                    <View style={{ height: 120, borderBottomWidth: 1, flexDirection: 'row', borderBottomColor: 'rgb(230, 230, 230)', backgroundColor: 'white' }}>
                        <View style={{ marginLeft: 20, marginTop: 20 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 25 }}>{result.name}</Text>
                            <Text style={{ fontSize: 15, color: 'gray' }}>{result.email}</Text>
                        </View>
                        <View style={{ height: 80, width: 80, borderWidth: 1, borderRadius: 50, marginLeft: 'auto', marginRight: 15, alignSelf: 'center', backgroundColor: 'rgb(40, 89, 29)', borderColor: 'rgb(40, 89, 29)', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 40 }}>{result.email[0].toUpperCase()}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Signout')}>
                        <View style={{ height: 40, backgroundColor: 'white', alignItems: 'center', flexDirection: 'row' }}>
                            <Text style={{ marginLeft: 20 }}>Log Out</Text>
                            <Entypo name='chevron-small-right' size={24} color="gray" style={{ marginLeft: 'auto', marginRight: 10 }} />
                        </View>
                    </TouchableOpacity>
                </SafeAreaView>
                :
                <ActivityIndicator size='large' style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }} />
            }

        </View>
    )
}

ProfileScreen.navigationOptions = () => {
    return {
        headerShown: false
    };
};

const styles = StyleSheet.create({

})

export default ProfileScreen;
