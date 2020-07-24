import React from 'react'
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, Dimensions } from 'react-native';
import { Card } from 'react-native-elements';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
const { height, width } = Dimensions.get('window');

// rendering list component of the menu

const MenuList = ({ result, edit, deleteItem }) => {

    return (
        <Card containerStyle={{ marginHorizontal: 10, paddingLeft: 10, paddingTop: 10, borderRadius: 5, width: width / 2 - 20, marginHorizontal: 10, marginTop: 40, borderRadius: 10, borderWidth: 0, elevation: 24, marginBottom: 10 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image style={styles.imageStyle} source={{ uri: result.image }} />
                <Text style={{ fontWeight: 'bold', fontSize: 15, marginTop: 10, color: 'rgb(0, 15, 102)' }}>{result.name}</Text>
                <Text style={{ color: 'gray', marginTop: 5 }}>category : {result.category}</Text>
                <Text style={{ marginTop: 5, color: 'red', marginBottom: 10 }}><FontAwesome name='rupee' /><Text> {result.price}</Text></Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity activeOpacity={0.6} onPress={() => edit(result._id)}>
                        <AntDesign name='edit' size={24} style={{ marginRight: 25 }} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.6} onPress={() => deleteItem(result._id)}>
                        <AntDesign name='delete' size={24} style={{ marginLeft: 25 }} />
                    </TouchableOpacity>
                </View>
            </View>
        </Card>
    )
}


const styles = StyleSheet.create({
    imageStyle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: -30
    }
});

export default MenuList;