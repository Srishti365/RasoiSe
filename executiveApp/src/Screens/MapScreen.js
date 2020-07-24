import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Map from '../Components/Map';
import trackerApi from '../api/tracker';

// Navigation to Map

const MapScreen = ({ navigation }) => {
    const [err, setErr] = useState('')
    const [result, setResult] = useState({});
    const [visible, setVisible] = useState(false)


    const viewRoute = async () => {
        try {
            const id = navigation.getParam('orderId');
            const response = await trackerApi.post('/execdetails/viewroute', { id });
            setResult(response.data);
            setVisible(true)
        }
        catch (err) {
            console.log(err);
            setErr('Something went wrong');
        }
    }



    useEffect(() => {
        viewRoute();
    }, []);

    console.log(result);



    return (
        <>
            {visible ?
                <Map data={result.route} dest_loc={result.dest_loc} exec_loc={result.exec_loc} pickup_loc={result.pickup_loc} time={result.time_taken} dist={result.distance} />
                :
                null
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
})

export default MapScreen;