import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ActivityIndicator, TextInput, FlatList, Dimensions, AsyncStorage } from 'react-native';
import SearchBarScreen from '../components/SearchBar';
import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';
import AddressBar from '../components/AddressBar';
import RBSheet from "react-native-raw-bottom-sheet";
import axios from 'axios';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
const { width, height } = Dimensions.get('window');
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';


const Api_key = 'kwfqzzg4RYxI2TYTdDXARWD-Cmvxk2kcP4KaHj84RQw';


const SearchScreen = () => {
    const [term, setTerm] = useState('');
    const [searchApi, results, errorMessage, location, address] = useResults();

    const [value, setValue] = useState(address)
    const [add, setAdd] = useState([])

    const refRBSheet = useRef();

    const getAddress = async () => {
        if (value.length > 2) {
            const response = await axios.get(`https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apiKey=${Api_key}&query=${value}`)
            const data = response.data.suggestions
            console.log(data)
            setAdd(data);
        }
        if (value.length <= 2) {
            setAdd([])
        }
    }

    useEffect(() => {

    }, [value])

    const storeAddress = async (val) => {
        await AsyncStorage.setItem('address', val)
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={{ marginHorizontal: 10, marginVertical: 5, paddingVertical: 10, flexDirection: 'row', paddingRight: 50, paddingLeft: 10, borderWidth: 0.2, borderColor: 'rgb(242,242,242)' }}
            activeOpacity={0.5}
            onPress={() => {
                setAdd([])
                setValue(item.label)
                storeAddress(item.label)
                searchApi(term, item.label, "typed")
            }}
        >
            <Entypo name="location-pin" size={24} color="black" />
            <Text style={{ marginTop: 3 }}>  {item.label}</Text>
        </TouchableOpacity>
    )

    const keyExtractor = (item, index) => index.toString()


    return (
        <>
            <StatusBar backgroundColor='#EA3C53' />
            <HeaderImageScrollView
                showsVerticalScrollIndicator={false}
                maxHeight={400}
                minHeight={200}
                headerImage={require('../../assets/bg2.jpeg')}
                renderFixedForeground={() => (
                    <View style={{ marginTop: 10, flexDirection: 'row' }}>
                        <View style={{ width: width - 40, marginRight: -5 }}>
                            <SearchBarScreen
                                term={term}
                                onTermChange={newTerm => setTerm(newTerm)}
                                onTermSubmit={() => searchApi(term, address, "typed")}
                            />
                        </View>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => {
                            refRBSheet.current.open()
                        }}>
                            <Entypo name="location-pin" size={40} color="white" style={{ marginTop: 8 }} />
                        </TouchableOpacity>
                    </View>
                )}
            >
                <View style={{ backgroundColor: results.length == 0 ? 'white' : 'rgb(240,240,240)' }}>
                    <TriggeringView style={{}}>
                        {errorMessage ? <Text>{errorMessage}</Text> : null}

                        {results.length == 0 ?
                            <ActivityIndicator size='large' style={{ alignItems: 'center', justifyContent: 'center' }} />
                            :
                            <View >
                                <ResultsList
                                    title='Search Results'
                                    results={results}
                                    location={location}
                                    searchTerm={term}
                                />
                            </View>
                        }
                        <RBSheet
                            ref={refRBSheet}
                            height={550}
                            closeOnPressMask={true}
                            keyboardAvoidingViewEnabled={false}
                        >
                            <View style={{ backgroundColor: 'rgb(250,250,250)', height: '100%' }}>
                                <Text style={{ fontSize: 17, marginTop: 10, borderBottomWidth: 1, paddingBottom: 10, borderColor: 'rgb(242,242,242)' }}>    Your Location</Text>
                                <AddressBar address={address} />
                                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, borderBottomWidth: 1, paddingBottom: 10, borderColor: 'rgb(242,242,242)' }} activeOpacity={0.8}
                                    onPress={() => {
                                        setValue(address)
                                        storeAddress(address)
                                        searchApi(term, address, 'typed')
                                    }}
                                >
                                    <MaterialIcons name="location-searching" size={24} color="red" style={{ marginLeft: 15 }} />
                                    <Text style={{ marginLeft: 10 }}>Add Current location</Text>
                                </TouchableOpacity>
                                <Text style={{ marginHorizontal: 15, marginTop: 10, fontSize: 17, fontWeight: '900' }}>Search location</Text>
                                <TextInput
                                    style={styles.inputStyle}
                                    value={value}
                                    onChangeText={(val) => {
                                        setValue(val)
                                        getAddress(val)
                                    }}
                                />
                                {value.length > 2 ?
                                    <FlatList
                                        keyExtractor={keyExtractor}
                                        data={add}
                                        renderItem={renderItem}
                                    />
                                    : null}
                            </View>
                        </RBSheet>
                    </TriggeringView>
                </View>
            </HeaderImageScrollView>
        </>
    );
};


SearchScreen.navigationOptions = () => {
    return {
        headerShown: false
    };
};


const styles = StyleSheet.create({
    backgroundStyle: {
        flexDirection: 'row',
        marginTop: 50,
        marginBottom: 5
    },
    section: {

    },
    inputStyle: {
        borderWidth: 1,
        marginTop: 10,
        height: 40,
        marginHorizontal: 10,
        borderColor: 'rgb(245, 245, 245)',
        elevation: 1,
        paddingLeft: 10,
        marginBottom: 10
    },
    iconStyle: {
        fontSize: 35,
        marginHorizontal: 5,
        marginTop: 5
    },
    bgImage: {
        width,
        height: 300,
    }
});

export default SearchScreen;

