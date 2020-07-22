import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, ScrollView } from 'react-native';
import trackerApi from '../api/tracker';

const InProcessScreen = () => {
    const [err, setErr] = useState('');
    const [result, setResult] = useState([]);

    const viewInprocess = async () => {
        try {
            const response = await trackerApi.get('/execdetails/viewinprocess');
            // console.log(response.data);
            setResult(response.data.orders);
        }
        catch (err) {
            console.log(err);
            setErr('Something went wrong');
        }
    }

    useEffect(() => {
        viewInprocess();
    }, []);

    console.log(result);


    return (
        <View>
            <Text>In process screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({});

export default InProcessScreen;