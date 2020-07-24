import React from 'react';
import { SearchBar } from 'react-native-elements';


// search bar component

const SearchBarScreen = ({ term, onTermChange, onTermSubmit }) => {


    return (
        <SearchBar
            platform='android'
            containerStyle={{ backgroundColor: 'white', borderColor: 'white', borderWidth: 1, borderRadius: 30, margin: 5, height: 45, alignItems: 'center', justifyContent: 'center', marginHorizontal: 10 }}
            inputStyle={{ backgroundColor: 'white' }}
            placeholder="Search for restaurants"
            value={term}
            onChangeText={newTerm => onTermChange(newTerm)}
            onEndEditing={onTermSubmit}
        />
    );
};


export default SearchBarScreen;