import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import SearchBarScreen from '../components/SearchBar';
import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';
import AddressBar from '../components/AddressBar';

const SearchScreen = () => {
    const [term, setTerm] = useState('noodles');
    const [searchApi, results, errorMessage, location, address] = useResults();

    // console.log(results);
    // if(results.length == 0){
    //     return <ActivityIndicator size='large' style={{alignItems:'center',justifyContent:'center',height:'100%'}}/>
    // }

    return (
        <>
            <StatusBar backgroundColor='#EA3C53'/>
            <AddressBar 
                address={address}
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
        flex: 1,
        fontSize: 15,
        color:'black'

    },
    iconStyle: {
        fontSize: 35,
        marginHorizontal: 5,
        marginTop:5
    }
});

export default SearchScreen;