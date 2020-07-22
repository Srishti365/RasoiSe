import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps'
const polyline = require('@mapbox/polyline');


const MapRoute = ({ data, startlat, startlon, endlat, endlon }) => {

    let points = polyline.decode(data)
    let coords = points.map((point, index) => ({ latitude: point[0], longitude: point[1] }))
    // console.log(coords)


    return (
        // <Text>{startlat}</Text>
        <MapView style={styles.map}
            initialRegion={{
                latitude: startlat,
                longitude: startlon,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            }}
        >
            <Polyline
                coordinates={coords}
                strokeColor="red"
                strokeWidth={3} />

            <Marker coordinate={{ latitude: startlat, longitude: startlon }} />
            <Marker coordinate={{ latitude: endlat, longitude: endlon }} />

        </MapView>

    )
}

const styles = StyleSheet.create({

    map: {
        height: 450
    }

});

export default MapRoute;