import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native';
import { Card } from 'react-native-elements'
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import Communications from 'react-native-communications';


const PendingList = ({ result, onPick }) => {

    console.log('ye h',result);

    return(
        <Card containerStyle={{borderRadius:10}}>
            <View style={{flexDirection:'row',borderBottomWidth:1,borderBottomColor:'rgb(232, 232, 232)'}}>
                <View>
                    <Text style={{color:'gray'}}>Order Number</Text>
                    <Text style={{fontWeight:'bold'}}>{result._id}</Text>
                </View>
                <View style={{marginLeft:'auto',marginBottom:10}}>
                    <Text style={{color:'gray'}}>Payment</Text>
                    <Text style={{color:'green'}}>Online</Text>
                </View>
            </View>
            <View style={{flexDirection:'row',borderBottomWidth:1,marginTop:10,borderBottomColor:'rgb(232, 232, 232)',paddingBottom:10}}>
                <Text style={{color:'gray'}}>Order Placed Time</Text>
                <Text style={{marginLeft:'auto',marginRight:10}}>{result.timestamp}</Text>
            </View>
            <View style={{flexDirection:'row',borderBottomWidth:1,borderBottomColor:'rgb(232, 232, 232)',marginTop:10}}>
                <View style={{width:'70%',marginBottom:10}}>
                    <Text style={{color:'gray',marginBottom:5}}>Pickup Adrress</Text>
                    <Text style={{fontWeight:'bold',fontSize:15}}>{result.chef.location}</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Tracker')}>
                        <View style={{borderWidth:1,marginLeft:30,height:25,width:25,borderRadius:25,alignItems:'center',justifyContent:'center',borderColor:'green'}}>
                            <EvilIcons name='location' size={18} color='green'/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => Communications.phonecall('0123456789', true)}>
                        <View style={{borderWidth:1,marginLeft:5,height:25,width:25,borderRadius:25,alignItems:'center',justifyContent:'center',borderColor:'green'}}>
                            <Ionicons name='ios-call' size={15} color='green'/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flexDirection:'row',marginTop:10}}>
                <View style={{width:'70%',marginBottom:10}}>
                    <Text style={{color:'gray',marginBottom:5}}>Delivery Adrress</Text>
                    <Text style={{fontWeight:'bold',fontSize:15}}>{result.delivery_add}</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Tracker')}>
                        <View style={{borderWidth:1,marginLeft:30,height:25,width:25,borderRadius:25,alignItems:'center',justifyContent:'center',borderColor:'green'}}>
                            <EvilIcons name='location' size={18} color='green'/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => Communications.phonecall('0123456789', true)}>
                        <View style={{borderWidth:1,marginLeft:5,height:25,width:25,borderRadius:25,alignItems:'center',justifyContent:'center',borderColor:'green'}}>
                            <Ionicons name='ios-call' size={15} color='green'/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:20,marginBottom:10}}>
                <View>
                    <Button title=' Mark Picked ' onPress={() => onPick(result._id)}/>
                </View>

                <View>
                    <Button title=' View Receipt ' color='gray' />
                </View>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({

})

export default PendingList;