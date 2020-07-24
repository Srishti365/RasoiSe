import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps'
const polyline = require('@mapbox/polyline');

// Rendering Map to display routes to executive

const Map = ({ data, pickup_loc, dest_loc, exec_loc, time, dist, chef_add, dest_add, exec_add }) => {

    let points = polyline.decode(data)
    let coords = points.map((point, index) => ({ latitude: point[0], longitude: point[1] }))

    // console.log(pickup_loc, dest_loc, exec_loc)

    return (
        <View style={styles.container}>
            <MapView style={styles.mapStyle}
                initialRegion={{
                    latitude: pickup_loc[0],
                    longitude: pickup_loc[1],
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                }}
            >
                <Polyline
                    coordinates={coords}
                    strokeColor="red"
                    strokeWidth={3}
                />

                <Marker coordinate={{ latitude: exec_loc[0], longitude: exec_loc[1] }} title={exec_add} description='Executive location'/>
                <Marker coordinate={{ latitude: dest_loc[0], longitude: dest_loc[1] }} title={dest_add} description='Delivery location'/>
                <Marker coordinate={{ latitude: pickup_loc[0], longitude: pickup_loc[1] }} title={chef_add} description='Pickup location'/>

            </MapView>
            <View style={styles.distanceContainer}>
                <Text style={{ color: 'white', fontSize: 17 }}>Distance : {dist} </Text>
                <Text style={{ color: 'white', fontSize: 17 }}>Estimated time : {time}</Text>
            </View>

        </View>
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
    distanceContainer: {
        marginVertical: 20,
        backgroundColor: "transparent",
        position: 'absolute',
        bottom: 0,
        width: '80%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'rgb(255, 119, 0)',

    }
})

export default Map;