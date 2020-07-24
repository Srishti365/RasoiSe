import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Card } from 'react-native-elements'
import { EvilIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import Communications from 'react-native-communications';

// Rendering list of orders yet to be picked up

const PendingList = ({ result, onPick, onShowDirections }) => {

    const userNumber = result.user.phoneNo
    const chefNumber = result.chef.phone.toString()

    return (
        <Card containerStyle={{ borderRadius: 10 }}>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'rgb(232, 232, 232)' }}>
                <View>
                    <Text style={{ color: 'gray' }}>Order Number</Text>
                    <Text style={{ fontWeight: 'bold' }}>{result._id}</Text>
                </View>
                <View style={{ marginLeft: 'auto', marginBottom: 10 }}>
                    <Text style={{ color: 'gray' }}>Payment</Text>
                    <Text style={{ color: 'green' }}>Online</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, marginTop: 10, borderBottomColor: 'rgb(232, 232, 232)', paddingBottom: 10 }}>
                <Text style={{ color: 'gray' }}>Order Placed Time</Text>
                <Text style={{ marginLeft: 'auto', marginRight: 10 }}>{result.timestamp}</Text>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'rgb(232, 232, 232)', marginTop: 10 }}>
                <View style={{ width: '70%', marginBottom: 10 }}>
                    <Text style={{ color: 'gray', marginBottom: 5 }}>Pickup Adrress</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{result.chef.location}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Tracker')}>
                        <View style={{ borderWidth: 1, marginLeft: 30, height: 25, width: 25, borderRadius: 25, alignItems: 'center', justifyContent: 'center', borderColor: 'green' }}>
                            <EvilIcons name='location' size={18} color='green' />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => Communications.phonecall(chefNumber, true)}>
                        <View style={{ borderWidth: 1, marginLeft: 5, height: 25, width: 25, borderRadius: 25, alignItems: 'center', justifyContent: 'center', borderColor: 'green' }}>
                            <Ionicons name='ios-call' size={15} color='green' />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <View style={{ width: '70%', marginBottom: 10 }}>
                    <Text style={{ color: 'gray', marginBottom: 5 }}>Delivery Adrress</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{result.delivery_add}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Tracker')}>
                        <View style={{ borderWidth: 1, marginLeft: 30, height: 25, width: 25, borderRadius: 25, alignItems: 'center', justifyContent: 'center', borderColor: 'green' }}>
                            <EvilIcons name='location' size={18} color='green' />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => Communications.phonecall(userNumber, true)}>
                        <View style={{ borderWidth: 1, marginLeft: 5, height: 25, width: 25, borderRadius: 25, alignItems: 'center', justifyContent: 'center', borderColor: 'green' }}>
                            <Ionicons name='ios-call' size={15} color='green' />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, marginBottom: 10 }}>

                {result.isPickedUp ?
                    <View style={{ paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, backgroundColor: 'rgb(0, 173, 252)' }}>
                        <Text style={{ color: 'white' }}>Already Picked</Text>
                    </View>
                    :
                    <TouchableOpacity style={{ paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, backgroundColor: 'rgb(0, 173, 252)' }}
                        activeOpacity={0.8}
                        onPress={() => onPick(result._id)}
                    >
                        <Text style={{ color: 'white' }}> Mark Picked</Text>
                    </TouchableOpacity>
                }

                <TouchableOpacity style={{ paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, backgroundColor: 'gray' }}
                    activeOpacity={0.8}
                    onPress={() => onShowDirections(result._id)}
                >
                    <Text style={{ fontSize: 15, color: 'white' }}>Directions  <FontAwesome5 name="directions" size={17} color="green" /></Text>
                </TouchableOpacity>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({

})

export default PendingList;