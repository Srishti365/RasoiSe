import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView, ImageBackground, ActivityIndicator } from 'react-native';
import { Rating, Button } from 'react-native-elements';
const { width, height } = Dimensions.get('window');
import trackerApi from '../api/tracker';
import { EvilIcons, Entypo } from '@expo/vector-icons';
import { Context as AuthContext } from '../context/AuthContext';

const Profile = ({ navigation }) => {

    const [result, setResult] = useState(null);
    const { signout } = useContext(AuthContext);

    const getProfile = async () => {
        try {
            const response = await trackerApi.get('/cook/profile');
            const data = response.data.profile[0]
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
                <ImageBackground source={require('../../assets/bg3.jpeg')} style={{ height: 250, width }}>

                </ImageBackground>
                {/* <View style={{borderWidth:3,height:70,borderRadius:50,width:70,position:'absolute',marginTop:215,alignSelf:'center',borderColor:'white',backgroundColor:'green',elevation:10}}> */}
                <Image style={styles.imageStyle} source={{ uri: result.image }} />
                {/* </View> */}
                <View style={{ marginTop: 50, alignItems: 'center' }}>
                    <Text style={{ fontSize: 20 }}>{result.name}</Text>
                    <Text style={{ color: 'gray' }}>{result.email}</Text>
                    <View style={{ width: 70, borderWidth: 1, height: 20, marginTop: 10, borderRadius: 10, backgroundColor: 'rgb(247, 198, 0)', borderColor: 'rgb(247, 198, 0)', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 13 }}>1 | Foodie</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <EvilIcons name='location' size={24} color='gray' />
                        <Text style={{ color: 'gray' }}>{result.location}</Text>
                    </View>
                    <Text style={{ color: 'gray', marginTop: 5 }}>(+91) {result.phone}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-around', marginBottom: 20 }}>
                    <Button title='Payment' type='outline' titleStyle={{ color: 'gray', fontSize: 15 }} />
                    <Button title='Contact Us' type='outline' titleStyle={{ color: 'gray', fontSize: 15 }} />
                    <Button title='Edit Profile' type='outline' titleStyle={{ color: 'gray', fontSize: 15 }} />
                </View>
                <Rating imageSize={24} readonly startingValue={result.rating} />
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

export default Profile;



  // <SafeAreaView style={{height,backgroundColor:'white'}}>
        //     <StatusBar backgroundColor='#EA3C53'/>
        //     <View style={{height:120,borderBottomWidth:1,flexDirection:'row',borderBottomColor:'rgb(230, 230, 230)',backgroundColor:'white'}}>
        //         <View style={{marginLeft:20,marginTop:20}}>
        //             <Text style={{fontWeight:'bold',fontSize:25}}>{result.name}</Text>
        //             <Text style={{fontSize:15,color:'gray'}}>{result.email}</Text>
        //         </View>
        //         {/* <View style={{height:80,width:80,borderWidth:1,borderRadius:50,marginLeft:'auto',marginRight:15,alignSelf:'center',backgroundColor:'rgb(40, 89, 29)',borderColor:'rgb(40, 89, 29)',alignItems:'center',justifyContent:'center'}}> */}
        //             {/* <Text style={{color:'white',fontSize:40}}>{character}</Text> */}
        //             <Image style={styles.imageStyle} source={{ uri: result.image}}/>
        //         {/* </View> */}
        //     </View>
        //     <View style={{backgroundColor:'white'}}>
        //         <TouchableOpacity onPress={() => navigation.navigate('Signout')}>
        //             <View style={{height:50,alignItems:'center',flexDirection:'row'}}>
        //                 <View style={{height:25,width:25,borderWidth:1,borderRadius:15,justifyContent:'center',alignItems:'center',borderColor:'rgb(227, 227, 227)',backgroundColor:'rgb(227, 227, 227)',marginLeft:20}}>
        //                     <MaterialCommunityIcons name="logout" size={15} color="black" />
        //                 </View>
        //                 <Text style={{paddingLeft:15}}>Sign Out</Text>
        //                 <Entypo name='chevron-small-right' size={24} color="gray" style={{marginLeft:'auto',marginRight:10}}/>
        //             </View>
        //         </TouchableOpacity>
        //     </View>
        // </SafeAreaView>