import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import trackerApi from '../api/tracker';

//  screen to view particular menu

const MenuShowScreen = ({ navigation }) => {

    const id = navigation.getParam('id')
    const [result, setResult] = useState([])

    const fetchResult = async () => {
        try {
            const response = await trackerApi.post('/cook/viewparticularmenu', { id: id });
            // console.log('response', response.data.menuitem);
            setResult(response.data.menuitem)
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchResult()
    }, [])

    return (
        <View>

        </View>
    )
}

const styles = StyleSheet.create({

});

export default MenuShowScreen;