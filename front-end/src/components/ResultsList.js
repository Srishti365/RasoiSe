import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import ResultsDetail from './ResultsDetail';
import { withNavigation } from 'react-navigation';

const ResultsList = ({ title, results, navigation, location, searchTerm }) => {
    if (!results.length) {
        return null;
    }

    // console.log('FResult list',location)
    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>
                {title}
            </Text> */}
            <FlatList
                data={results}
                keyExtractor={(result) => result._id}
                renderItem={({ item }) => {
                    return (
                        // <TouchableOpacity
                        //     onPress={() => navigation.navigate('ResultsShow', { id: item._id })}
                        // >
                        //     <ResultsDetail result={item} />
                        // </TouchableOpacity>
                        <ResultsDetail result={item} callback={()=> {navigation.navigate('ResultsShow', { id: item._id, location:location , searchTerm:searchTerm})}}/>
                    )
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginLeft: 15,
        marginBottom: 5
    },
    container: {
        marginBottom: 10
    }
});

export default withNavigation(ResultsList);