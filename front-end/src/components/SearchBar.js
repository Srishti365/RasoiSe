import React from 'react';
import { SearchBar } from 'react-native-elements';



const SearchBarScreen = ({ term, onTermChange, onTermSubmit }) => {


    return (
        <SearchBar 
            platform='android'
            containerStyle={{backgroundColor: 'white',borderColor:'white', borderWidth: 1, borderRadius: 10, margin:5, height:55,alignItems:'center',justifyContent:'center'}}
            inputStyle={{backgroundColor: 'white'}}
            placeholder="Search for restaurants" 
            value={term}
            onChangeText={newTerm => onTermChange(newTerm)}
            onEndEditing={onTermSubmit}
        />
    );
};


export default SearchBarScreen;