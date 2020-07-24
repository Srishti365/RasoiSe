import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import ResultsDetail from './ResultsDetail';
import { withNavigation } from 'react-navigation';

// search result helper component

const ResultsList = ({ title, results, navigation, location, searchTerm }) => {
    if (!results.length) {
        return null;
    }


    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

            <FlatList
                data={results}
                keyExtractor={(result) => result._id}
                renderItem={({ item, index }) => {
                    return (
                        <ResultsDetail result={item} index={index} callback={() => { navigation.navigate('ResultsShow', { id: item._id, location: location, searchTerm: searchTerm }) }} />
                    )
                }}
            />
        </ScrollView>
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