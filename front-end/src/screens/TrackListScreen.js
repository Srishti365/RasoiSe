import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { navigate } from '../navigationRef';

const TrackListScreen = ({ navigation }) => {
    // console.log(navigation.getParam('email'));
    return (
        <View>
            <Text style={{ fontSize: 48 }}>
                TrackList Screen
            </Text>
            <Button
                title="Go to Track detail"
                onPress={() => navigation.navigate('TrackDetail')}
            />
            <Button
                title="Go to Search"
                onPress={() => navigation.navigate('Search')}
            />

        </View>
    )
}

const styles = StyleSheet.create({

});

export default TrackListScreen;