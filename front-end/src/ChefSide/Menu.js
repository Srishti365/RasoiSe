import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, StatusBar, Dimensions, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, FlatList, KeyboardAvoidingView, Animated } from 'react-native';
import MenuList from './MenuList';
import Dialog, { DialogContent, SlideAnimation, DialogTitle, DialogButton, DialogFooter } from 'react-native-popup-dialog';
const { width, height } = Dimensions.get('window');
import { Entypo, Feather, AntDesign } from '@expo/vector-icons';
import { AppStyles } from '../AppStyles';
import trackerApi from '../api/tracker';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import * as Animatable from 'react-native-animatable';

const Menu = ({ navigation }) => {

    const [visible, setVisible] = useState(false)
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState(Number)
    const [description, setDescription] = useState('')
    const [result, setResult] = useState([])
    const [profile, setProfile] = useState(null)
    const [editVisible,setEditVisible] = useState(false)
    const [deleteVisible,setDeleteVisible] = useState(false)
    const [changeRef, setChangeRef] = useState(0);
    const [id,setId] = useState(null);
    const [editResult, setEditResult] = useState(null);

    const toggle = () => {
        console.log(visible)
        setVisible(!visible)
    }

    const fetchResult = async () => {
        try {
            const response = await trackerApi.get('/cook/viewmenu');
            console.log('response', response.data);
            setResult(response.data.dishes)
        }
        catch (err) {
            console.log(err);
        }
    }


    const fetchMenu = async (id) => {
        try {
            console.log(id)
            const response = await trackerApi.post('/cook/viewparticularmenu', {id:id});
            const data = response.data.menuitem
            console.log(data)
            setName(data.name)
            setCategory(data.category)
            setDescription(data.description)
            setPrice(data.price)
            setEditResult(data)
        }
        catch (err) {
            console.log(err);
        }
    }


    const editMenu = async () => {
        try {
            const response = await trackerApi.get('/cook/editmenuitem');
            setChangeRef(id)
        }
        catch (err) {
            console.log(err);
        }
    }


    const fetchProfile = async () => {
        try {
            const response = await trackerApi.get('/cook/profile');
            console.log('response', response.data);
            setProfile(response.data.profile[0])
        }
        catch (err) {
            console.log(err);
        }
    }


    const RemoveItem = async(id) => {
        try {
            setChangeRef(id);
            console.log(changeRef);
            const response = await trackerApi.post('/cook/removemenuitem',{id:id});
            console.log(response);
            setDeleteVisible(false)
        }
        catch (err) {
            console.log(err);
        }
    }


    const handleOnSubmit = async () => {
        try {
            console.log('hii')
            const response = await trackerApi.post('/cook/addmenuitem', { name, category, description, price });
            fetchResult();
            console.log('response', response.data);
            toggle();
            setName('');
            setPrice(0);
            setCategory('');
            setDescription('');
        }
        catch (err) {
            console.log(err);
            setErrorMessage('Something went wrong');
        }
    };

    useEffect(() => {
        fetchProfile();
        fetchResult();
    }, [changeRef]);



    console.log('profile', profile)

    if (profile == null) {
        return (
            <ActivityIndicator size='large' style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }} />
        )
    }

    return (
        <>
            <StatusBar backgroundColor='#EA3C53' />
            <HeaderImageScrollView
                showsVerticalScrollIndicator={false}
                maxHeight={300}
                minHeight={290}
                minOverlayOpacity={0.5}
                maxOverlayOpacity={0.5}
                useNativeDriver={true}
                headerImage={require('../../assets/bg2.jpeg')}
                renderFixedForeground={() => (
                    <Animatable.View>
                        <View style={{ marginTop: 170, marginLeft: 20 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25 }}>{profile.name}</Text>
                                <TouchableOpacity style={{ marginLeft: 'auto', marginRight: 10, marginTop: 5, flexDirection: 'row', backgroundColor: '#FBAF02', paddingHorizontal: 5, borderRadius: 20 }}
                                    activeOpacity={0.8}
                                    onPress={() => setVisible(true)}
                                >
                                    <Feather name="plus" size={22} color="white" style={{ paddingTop: 1 }} />
                                    <Text style={{ color: 'white', marginTop: 1, fontSize: 15, paddingTop: 1 }}>Add menu item</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Entypo name='location-pin' size={24} color='white' />
                                <Text style={{ color: 'white', fontSize: 17 }}>{profile.location}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
                                <View>
                                    <Text style={{ color: 'white', fontSize: 13, alignSelf: 'center' }}>{profile.rating}</Text>
                                    <Text style={{ color: '#cccccc', fontSize: 13 }}>351 Ratings</Text>
                                </View>
                                <View>
                                    <Text style={{ color: 'white', fontSize: 13, alignSelf: 'center' }}>137k</Text>
                                    <Text style={{ color: '#cccccc', fontSize: 13 }}>Bookmarks</Text>
                                </View>
                                <View>
                                    <Text style={{ color: 'white', fontSize: 13, alignSelf: 'center' }}>347</Text>
                                    <Text style={{ color: '#cccccc', fontSize: 13 }}>Photos</Text>

                                </View>
                            </View>

                        </View>
                    </Animatable.View>
                )}
            >
                <View style={{ backgroundColor: 'rgb(242,242,242)' }}>
                    <TriggeringView style={{ backgroundColor: 'white' }}>
                        <View style={{ height: 50, backgroundColor: 'rgb(242,242,242)', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 17, color: 'rgb(0, 15, 102)' }}>Features Items</Text>
                        </View>
                        <ScrollView>
                            <FlatList
                                data={result}
                                keyExtractor={(result) => result._id}
                                renderItem={({ item }) => {
                                    return (
                                        <MenuList result={item} edit={(id) => {
                                            fetchMenu(id)
                                            setEditVisible(true)
                                        }} deleteItem={(id) => {
                                            setDeleteVisible(true)
                                            setId(id)
                                        }}/>
                                    )
                                }}
                                horizontal={false}
                                numColumns={2}
                            />
                        </ScrollView>
                    </TriggeringView>
                </View>
            </HeaderImageScrollView>
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
                    <KeyboardAvoidingView behavior='height' style={{ flex: 1 }}>
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
                                        placeholder="Veg or Non-veg"
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
                    </KeyboardAvoidingView>
                </DialogContent>
            </Dialog>
            <Dialog
                visible={deleteVisible}
                dialogTitle={<DialogTitle title="Delete Item" />}
                onTouchOutside={() => {
                    setDeleteVisible(false)
                }}
                width={200}
                footer={
                    <DialogFooter>
                      <DialogButton
                        text="CANCEL"
                        onPress={() => setDeleteVisible(false)}
                      />
                      <DialogButton
                        text="OK"
                        onPress={() => RemoveItem(id)}
                      />
                    </DialogFooter>
                  }
            >
                <DialogContent >
                    <Text style={{marginTop:10,color:'red',alignSelf:'center',fontSize:20}}>Are you sure ?</Text>
                </DialogContent>
            </Dialog>
            {editResult == null ? null :
            <Dialog
                visible={editVisible}
                dialogAnimation={new SlideAnimation({
                    slideFrom: 'bottom'
                })}

                onTouchOutside={() => setEditVisible(false)}
                height={500}
                width={width - 50}
            >

                    <DialogContent style={{ flex: 1 }}>
                        <KeyboardAvoidingView behavior='height' style={{ flex: 1 }}>
                            <View style={{ height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(251,251,251)', marginLeft: -20, marginRight: -20, flexDirection: 'row' }}>
                                <Text style={{ fontWeight: '900', fontSize: 20, position: 'absolute' }}>Edit Menu</Text>
                                <TouchableOpacity style={{ marginLeft: 'auto', marginRight: 20 }} onPress={() => setEditVisible(false)}>
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
                                            placeholder="Veg or Non-veg"
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
                        </KeyboardAvoidingView>
                    </DialogContent>
                </Dialog>
            }
        </>

    )
}


Menu.navigationOptions = () => {
    return {
        headerShown: false
    };
};


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

