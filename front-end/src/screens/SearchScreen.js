import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';
import { EvilIcons } from '@expo/vector-icons';

const SearchScreen = () => {
    const [term, setTerm] = useState('');
    const [searchApi, results, errorMessage, location, address] = useResults();

    console.log(address);
    // console.log('results',results);
    // const filterResultsByPrice = (price) => {
    //     return results.filter(result => {
    //         return result.price === price;
    //     });
    // };
    // console.log('location is', location);
    const onTermSubmit = async (searchTerm) => {
        try {
            console.log(searchTerm);
            // console.log(location);

            const response = await trackerApi.post(`/home/search/${searchTerm}`,{ lat:'', long:'' , location:term });
            // console.log(response.data.chefs);
            setResults(response.data.chefs);
        }
        catch (err) {
            console.log(err);
            setErrorMessage('Something went wrong');
        }
    };


    return (
        <>
            <TouchableOpacity >
             <View style={styles.backgroundStyle}>
                 
                    <EvilIcons name="location" style={styles.iconStyle} />
                    <Text style={styles.inputStyle}>{address}</Text>
                 

    
                
                    {/* // autoCapitalize='none'
                    // autoCorrect={false}
                    // placeholder={address}
                    // style={styles.inputStyle}
                    // value={term}
                    // onChangeText={setTerm}
                    // onEndEditing={() => {onTermSubmit(term)}} */}

             
            </View>
            </TouchableOpacity>
            <SearchBar
                term={term}
                onTermChange={newTerm => setTerm(newTerm)}
                onTermSubmit={() => searchApi(term)}
            />
            {errorMessage ? <Text>{errorMessage}</Text> : null}

            {/* <ScrollView> */}
            <ResultsList
                title='Search Results'
                results={results}
                location={location}
                searchTerm={term}
            />

            {/* </ScrollView> */}
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