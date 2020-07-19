import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, ActivityIndicator, TextInput, FlatList } from 'react-native';
import SearchBarScreen from '../components/SearchBar';
import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';
import AddressBar from '../components/AddressBar';
import RBSheet from "react-native-raw-bottom-sheet";
import axios from 'axios';
import { Entypo } from '@expo/vector-icons';

const Api_key = 'kwfqzzg4RYxI2TYTdDXARWD-Cmvxk2kcP4KaHj84RQw'

const SearchScreen = () => {
    const [term, setTerm] = useState('noodles');
    const [searchApi, results, errorMessage, location, address] = useResults();

    const [value,setValue] = useState('')
    const [add,setAdd] = useState([])

    const refRBSheet = useRef();

    const getAddress = async () => {
        if(value.length>2){
          const response = await axios.get(`https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apiKey=${Api_key}&query=${value}`)
          const data = response.data.suggestions
          console.log(data)
          setAdd(data);
        }
        if(value.length<=2){
            setAdd([])
        }
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity 
          style={{marginHorizontal:10,marginVertical:5,paddingVertical:10,flexDirection:'row',paddingRight:50,paddingLeft:10,borderWidth:0.2,borderColor:'rgb(242,242,242)'}}
          activeOpacity={0.5}
          onPress={() => {
            setAdd([])
            address=item
          }}
        >
          <Entypo name="location-pin" size={24} color="black" />
          <Text style={{marginTop:3}}>  {item.label}</Text>
        </TouchableOpacity>
      )

    const keyExtractor = (item, index) => index.toString()


    return (
        <>
            <StatusBar backgroundColor='#EA3C53'/>
            <AddressBar 
                address={address}
                onClick={() => refRBSheet.current.open()}
            />
            <SearchBarScreen
                term = {term}
                onTermChange={newTerm => setTerm(newTerm)}
                onTermSubmit={() => searchApi(term)}
            />
            {errorMessage ? <Text>{errorMessage}</Text> : null}

            {results.length == 0 ?
                <ActivityIndicator size='large' style={{alignItems:'center',justifyContent:'center'}}/>
            :
                <ResultsList
                    title='Search Results'
                    results={results}
                    location={location}
                    searchTerm={term}
                />
            }
            <RBSheet
                ref={refRBSheet}
                height={550}
                closeOnPressMask={true}
                keyboardAvoidingViewEnabled={false}
            >
                <Text style={{marginHorizontal:15,marginTop:20,fontSize:17,fontWeight:'900'}}>Search location</Text>
                <TextInput 
                    style={styles.inputStyle}
                    value={value}
                    onChangeText = {(val) => {
                        setValue(val)
                        getAddress(val)
                    }}
                />
                {value.length>2 ?
                    <FlatList
                        keyExtractor={keyExtractor}
                        data={add}
                        renderItem={renderItem}
                    />
                : null }
            </RBSheet>

        </>
    );
};


SearchScreen.navigationOptions = () => {
    return {
        headerShown: false
    };
};


const styles = StyleSheet.create({
    backgroundStyle: {
        // backgroundColor: 'rgb(230,230,230)',
        // height: 50,
        // borderRadius: 5,
        // marginHorizontal: 15,
        flexDirection: 'row',
        marginTop: 50,
        marginBottom:5,
        // marginBottom: 10
    
    },
    inputStyle: {
        borderWidth:1,
        marginTop:10,
        height:40,
        marginHorizontal:10,
        borderColor:'rgb(245, 245, 245)',
        elevation: 1,
        paddingLeft:10 ,
        marginBottom:10     
    },
    iconStyle: {
        fontSize: 35,
        marginHorizontal: 5,
        marginTop:5
    }
});

export default SearchScreen;