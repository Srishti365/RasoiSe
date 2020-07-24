import React, { useState } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { useEffect } from 'react';
const { height, width } = Dimensions.get('window');
import { Entypo, Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';

// orders made by the user component

const UserOrderList = ({ result }) => {

    const [status, setStatus] = useState('')
    const [icon, setIcon] = useState();
    const [color, setColor] = useState()

    // console.log('result',result);

    var day = new Date().toDateString().slice(4, 10)
    var year = new Date().toDateString().slice(11, 15)

    const calLength = () => {
        const length = result.orderItems.length
        // console.log(length)
        return length
    }

    const sliceId = (id) => {
        const result = id.slice(0, 8)
        return result
    }

    const checkStatus = () => {
        if (result.isDelivered == true) {
            setStatus('Completed')
            const icon = <Entypo name="home" size={24} color="white" />
            setIcon(icon)
            setColor('rgb(102, 163, 21)')
        } else if (result.isDelivered == false && result.confirmedByChef == false) {
            setStatus('Pending')
            setColor('rgb(255, 46, 46)')
            const icon = <AntDesign name="question" size={24} color="white" />
            setIcon(icon)
        } else if (result.isDelivered == false && result.confirmedByChef == true) {
            setStatus('Preparing')
            setColor('rgb(35, 209, 232)')
            const icon = <MaterialIcons name="local-dining" size={24} color="white" />
            setIcon(icon)
        } else if (result.isDelivered == false && result.isPickedUp == true) {
            setStatus('Dispatched')
            setColor('rgb(255, 244, 94)')
            const icon = <Ionicons name="ios-bicycle" size={24} color="white" />
            setIcon(icon)
        }
    }

    useEffect(() => {
        checkStatus()
    }, [])

    return (
        <View style={{ height: 100, width, borderBottomWidth: 1, flexDirection: 'row', borderColor: 'rgb(230,230,230)', alignItems: 'center', backgroundColor: 'white' }}>
            <View style={{ height: 100, width, borderBottomWidth: 1, flexDirection: 'row', borderColor: 'rgb(230,230,230)', alignItems: 'center' }}>
                <View style={{ width: 40, height: 40, borderRadius: 50, backgroundColor: color, alignItems: 'center', justifyContent: 'center', marginLeft: 20 }}>
                    {icon}
                </View>
                <View style={{ marginLeft: 20 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Order #{sliceId(result._id)}</Text>
                    <Text style={{ color: color, fontSize: 17 }}>{status}</Text>
                </View>

                <View style={{ marginLeft: 'auto', marginRight: 15, width: 140 }}>
                    <Text style={{ color: 'rgb(67, 153, 69)', marginLeft: 'auto' }}>Ordered {calLength()} {calLength() == 1 ? <Text>item</Text> : <Text>items</Text>}</Text>
                    <Text style={{ fontSize: 12, marginTop: 10, color: 'gray', marginLeft: 15 }}>{day}, {year} | {result.timestamp}</Text>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({

});

export default UserOrderList;