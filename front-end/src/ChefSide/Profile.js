import React, { useState, useEffect} from 'react'
import { View, Text, StyleSheet, StatusBar, SafeAreaView, Dimensions, TouchableOpacity, Image} from 'react-native';
const { width, height } = Dimensions.get('window');
import trackerApi from '../api/tracker';
import { MaterialCommunityIcons, Entypo, MaterialIcons } from '@expo/vector-icons';

const Profile = ({navigation}) => {

    const [result,setResult] = useState(null);
    const [character,setCharacter] = useState('')

    const getProfile = async () => {
        try {
            const response = await trackerApi.get('/cook/profile');
            const data = response.data.profile[0]
            setResult(data)
            setCharacter(data.email.toUpperCase().charAt(0))

        }
        catch (err) {
            console.log(err);
        }
    }
    
    useEffect(() => {
        getProfile()
    },[])


    if(result==null){
        return null
    }

    return (
        <SafeAreaView style={{height,backgroundColor:'white'}}>
            <StatusBar backgroundColor='#EA3C53'/>
            <View style={{height:120,borderBottomWidth:1,flexDirection:'row',borderBottomColor:'rgb(230, 230, 230)',backgroundColor:'white'}}>
                <View style={{marginLeft:20,marginTop:20}}>
                    <Text style={{fontWeight:'bold',fontSize:25}}>{result.name}</Text>
                    <Text style={{fontSize:15,color:'gray'}}>{result.email}</Text>
                </View>
                {/* <View style={{height:80,width:80,borderWidth:1,borderRadius:50,marginLeft:'auto',marginRight:15,alignSelf:'center',backgroundColor:'rgb(40, 89, 29)',borderColor:'rgb(40, 89, 29)',alignItems:'center',justifyContent:'center'}}> */}
                    {/* <Text style={{color:'white',fontSize:40}}>{character}</Text> */}
                    <Image style={styles.imageStyle} source={{ uri: result.image}}/>
                {/* </View> */}
            </View>
            <View style={{backgroundColor:'white'}}>
                <TouchableOpacity onPress={() => navigation.navigate('Signout')}>
                    <View style={{height:50,alignItems:'center',flexDirection:'row'}}>
                        <View style={{height:25,width:25,borderWidth:1,borderRadius:15,justifyContent:'center',alignItems:'center',borderColor:'rgb(227, 227, 227)',backgroundColor:'rgb(227, 227, 227)',marginLeft:20}}>
                            <MaterialCommunityIcons name="logout" size={15} color="black" />
                        </View>
                        <Text style={{paddingLeft:15}}>Sign Out</Text>
                        <Entypo name='chevron-small-right' size={24} color="gray" style={{marginLeft:'auto',marginRight:10}}/>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    imageStyle:{
        height:80,
        width:80,
        marginLeft:'auto',
        marginRight:25,
        alignSelf:'center',
        borderRadius:50
    }
});

export default Profile;