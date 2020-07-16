import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';
import { string } from 'prop-types';

const ResultsDetail = ({ result, callback }) => {
    // console.log(result.image);
    // var ratings = [];

	// for(let i = 0; i < parseInt(result.rating); i++){

	// 	ratings.push(
	// 		<View key = {i}>
	// 			<Entypo name="star" style={styles.iconStyle}/>
	// 		</View>
	// 	)
    // }
    var resultsRating = result.rating.toString()
  
    

    return (
        <View style={styles.container}>
            {/* <Text style={styles.name}>{result.name}'s Kitchen</Text>
            <Text>Location: {result.location}</Text> */}
            
            <Image style={styles.imageStyle} source={{ uri: result.image}} />
            <View style={{ flexDirection:'column', marginLeft:15, flex:1}}>
                <Text style={styles.name}>{result.name}</Text>
                <Text style={styles.location}>{result.location}</Text>
                <View style={styles.button}>
                <Button title='View Details' type="outline" onPress={callback} />
            </View>
            </View>
            
            <View style={styles.myButton}>
                <Text style={styles.text}>{resultsRating}</Text>
          </View>
           
            
            
        </View>
    );
};

const styles = StyleSheet.create({
        container:{
        
            marginLeft:15,
            flexDirection:'row',
            paddingVertical:18,
            borderBottomWidth:0.2,
            borderBottomColor:'gray'
        },
        imageStyle:{
            width:120,
            height:120,
            borderRadius:4,
            marginBottom:5,
        }, 
        name:{
            paddingTop:10,
            fontWeight:'bold',
            fontSize:18,
            textTransform:"capitalize"
        },
        location:{
            paddingTop:5,
            textTransform:"capitalize"

        },
        button:{
            paddingTop:15,
            // backgroundColor:'white',
            // borderColor:'blue'
           
        },
        iconStyle: {
            fontSize: 10
        },
        text:{
            color:'white'
        },
        myButton:{
            width:40,
            height:30,
            alignItems:'center',
            backgroundColor:'green',
            borderRadius:5,
            marginRight:10,
            paddingTop:5
        }
});


export default ResultsDetail;