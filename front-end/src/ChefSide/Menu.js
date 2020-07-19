import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, StatusBar, Dimensions, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import MenuList from './MenuList';
import Dialog, { DialogContent, SlideAnimation, DialogTitle, DialogFooter, DialogButton } from 'react-native-popup-dialog';
const { width, heigh } = Dimensions.get('window');
import { AntDesign } from '@expo/vector-icons';
import { AppStyles } from '../AppStyles';
import trackerApi from '../api/tracker';

const Menu = () => {

    const [visible, setVisible] = useState(false)
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [result,setResult] = useState([]);

    const toggle = () => {
        console.log(visible)
        setVisible(!visible)
    }

    const fetchResult = async () => {
        try {
            const response = await trackerApi.get('/cook/viewmenu');
            console.log('response',response.data);
            setResult(response.data.dishes)
        }
        catch (err) {
            console.log(err);
            setErrorMessage('Something went wrong');
        }
    }


    const handleOnSubmit = async () => {
        try {
            console.log('hii')
            const response = await trackerApi.post('/cook/addmenuitem', { name, category, description, price });

            console.log('response', response.data);
            toggle();
        }
        catch (err) {
            console.log(err);
            setErrorMessage('Something went wrong');
        }
    };

    useEffect(() => {
        fetchResult();
    },[])


    if(result.length==0){
        return (
            <ActivityIndicator size='large' style={{height:'100%',justifyContent:'center',alignItems:'center'}}/>
        )
    }

    return (
        <View>
            <StatusBar backgroundColor='#EA3C53'/>
            
            <FlatList
                data={result}
                keyExtractor={(result) => result._id}
                renderItem={({ item }) => {
                    return (
                        <MenuList result={item} />
                    )
                }}
            />
            
            <TouchableOpacity
                style={{ borderWidth: 1, height: 50, width: 150, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}
                activeOpacity={0.5}
                onPress={() => toggle()}
            >
                <Text>Add Menu Item</Text>
            </TouchableOpacity>
            <Dialog
                visible={visible}
                dialogAnimation={new SlideAnimation({
                    slideFrom: 'bottom'
                })}

                onTouchOutside={toggle}
                height={500}
                width={width - 50}
            >
                <DialogContent style={{ flex: 1 }}>
                    <View style={{ height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(251,251,251)', marginLeft: -20, marginRight: -20, flexDirection: 'row' }}>
                        <Text style={{ fontWeight: '900', fontSize: 20, position: 'absolute' }}>Add Menu</Text>
                        <TouchableOpacity style={{ marginLeft: 'auto', marginRight: 20 }} onPress={toggle}>
                            <AntDesign name="close" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                            <Text style={{ width: 80 }}>Name : </Text>
                            <View style={styles.InputContainer}>
                                <TextInput
                                    style={styles.body}
                                    placeholder="Name"
                                    onChangeText={name => setName(name)}
                                    value={name}
                                    placeholderTextColor={AppStyles.color.grey}
                                    underlineColorAndroid="transparent"
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                            <Text style={{ width: 80 }}>Category : </Text>
                            <View style={styles.InputContainer}>
                                <TextInput
                                    style={styles.body}
                                    placeholder="noodles"
                                    onChangeText={category => setCategory(category)}
                                    value={category}
                                    placeholderTextColor={AppStyles.color.grey}
                                    underlineColorAndroid="transparent"
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                            <Text style={{ width: 80 }}>Price : </Text>
                            <View style={styles.InputContainer}>
                                <TextInput
                                    style={styles.body}
                                    placeholder="0"
                                    onChangeText={price => setPrice(price)}
                                    value={price}
                                    placeholderTextColor={AppStyles.color.grey}
                                    underlineColorAndroid="transparent"
                                />
                            </View>
                        </View>
                        <View style={{ marginTop: 30 }}>
                            <Text>Description : </Text>
                            <TextInput
                                style={styles.input}
                                placeholder={'Add description (not more than 100 letters)'}
                                onChangeText={text => setDescription(text)}
                                multiline={true}
                                value={description}
                                underlineColorAndroid='transparent'
                                maxLength={100}
                            />
                            <Text style={{ marginLeft: 'auto', color: 'grey' }}>({description.length}/100)</Text>
                        </View>
                        <TouchableOpacity
                            style={{ width: 150, height: 50, borderRadius: 5, marginTop: 20, justifyContent: 'center', alignSelf: 'center', alignItems: 'center', backgroundColor: 'gray' }}
                            activeOpacity={0.8}
                            onPress={handleOnSubmit}
                        >
                            <Text style={{ color: 'white', fontWeight: '900', fontSize: 17 }}>Submit</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </DialogContent>
            </Dialog>

        </View>
    )
}


const styles = StyleSheet.create({
    body: {
        height: 42,
        paddingLeft: 20,
        paddingRight: 20,
    },
    InputContainer: {
        width: 180,
        marginLeft: 5,
        marginTop: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: AppStyles.color.grey,
    },
    input: {
        width: width - 80,
        marginTop: 10,
        borderBottomColor: 'red',
        borderBottomWidth: 1,
        fontSize: 15,
        marginRight: 100
    },
});

export default Menu;