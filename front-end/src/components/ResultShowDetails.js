import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { string } from 'prop-types';
import trackerApi from '../api/tracker';


const ResultShowDetail = ({ result }) => {
    const[quantity, setQuantity] = useState(0);
    const [errMessage,setErrorMessage] = useState('');
    const increament = 1;

    const addToCart = async( id,quantity) => {
        try {
            console.log(id,quantity);
            const response = await trackerApi.post('/cart/add',{ menuitemid:id,quantity:quantity});
            // console.log(response.data.chefs);
            console.log(response.data);
        }
        catch (err) {
            console.log(err);
            setErrorMessage('Something went wrong');
        }
    }

    return (
        <>
        {/* <Header
  leftComponent={{ icon: 'menu', color: '#fff' }}
  centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
  rightComponent={{ icon: 'home', color: '#fff' }}
/> */}
        <View style={styles.container}>
           
            {/* <Text>Today's Exclusive dishes</Text> */}
            <Image style={styles.imageStyle} source={{ uri: result.image}} />
            <View style={{ width:170}}>
                <Text style={styles.name}>{result.name}</Text>
                <Text style={styles.category}>{result.category}</Text>
                <Text style={styles.price}>Price: <FontAwesome name="rupee"/>{result.price}</Text>
                <Text style={styles.description}>{result.description}</Text>
           
            </View>
            {/* <TouchableOpacity onPress={() => console.log('working!!')}> */}
            <View style={{flexDirection:'column'}}>

            
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={() => setQuantity(quantity-increament)}>
                    <View style={styles.myButton}>
                        <AntDesign name="minus" style={styles.minusStyle} />
                    </View>
                    </TouchableOpacity>

                        <Text style={styles.text}>{quantity} </Text> 
                    <TouchableOpacity onPress={() => setQuantity(quantity+increament)}>
                        <View style={styles.myButton}>
                            <Ionicons name="ios-add" style={styles.iconStyle}/>
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={() => {addToCart(result._id,quantity)}}>
                        <View style={styles.myButton1}>
                        <Text>ADD</Text>
                    </View>
                        </TouchableOpacity>
                </View>
                <Text style={styles.text1}>customizable</Text>
                
                </View>    
                
            
          {/* </TouchableOpacity> */}
        </View>
        </>
    );
};



const styles = StyleSheet.create({
        imageStyle:{
            width:80,
            height:80,
            borderRadius:4,
            marginTop:15,
        }, 
        container:{
            flexDirection:'row',
            padding:10,
            borderBottomWidth:0.2,
            borderBottomColor:'gray'
        },
        name:{
            paddingTop:10,
            fontWeight:'bold',
            fontSize:18,
            textTransform:"capitalize",
            paddingLeft:10
        },
        category:{
            paddingTop:5,
            textTransform:"capitalize",
            paddingLeft:10

        },
        price:{
            paddingTop:4,
            paddingLeft:10
           
        },
        description:{
            paddingTop:2,
            paddingLeft:10
        },
        text:{
            color:'black',
            paddingTop:35,
            marginLeft:3,
            paddingHorizontal:5,
            fontSize:13
        },
        text1:{
            color:'orange',
            fontSize:12,
            marginTop:4
        },
        myButton:{
            width:25,
            height:28,
            alignItems:'center',
            backgroundColor:'white',
            borderRadius:5,
            marginTop: 30,
            textAlign:'center',
            borderColor:'black',
            borderWidth:0.3,
           
        },
        iconStyle: {
            // fontSize: 15,
            // alignSelf: 'center',
            // marginHorizontal: 15
            color:'red',
            paddingTop:6,
            marginLeft:2,
            fontSize:13
        },
        minusStyle:{
            color:'red',
            paddingTop:5,
            marginLeft:2,
            fontSize:15
        },
        myButton1:{
            width:70,
            height:28,
            alignItems:'center',
            backgroundColor:'white',
            borderRadius:5,
            marginTop:8,
            paddingTop:4,
            textAlign:'center',
            borderColor:'black',
            borderWidth:0.3,
           
        },
});


export default ResultShowDetail;