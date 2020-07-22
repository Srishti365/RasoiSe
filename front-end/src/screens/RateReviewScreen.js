import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, KeyboardAvoidingView, ScrollView, TextInput } from 'react-native';
import Dialog, { DialogContent, SlideAnimation, DialogTitle, DialogButton, DialogFooter } from 'react-native-popup-dialog';
const { width, height } = Dimensions.get('window');
import { AntDesign } from '@expo/vector-icons';
import StarRating from 'react-native-star-rating';


const RateReviewScreen = ({ navigation }) => {
    const [err, setErr] = useState('');
    const [rateVisible, setRateVisible] = useState(false);
    const [reviewVisible, setReviewVisible] = useState(false);
    const [chefid, setChefid] = useState('');
    const [chefname, setChefname] = useState('');
    // const [result, setResult] = useState

    const toggle = () => {
        setRateVisible(false);
        setReviewVisible(false);
    }

    const rate = async () => {
        try {
            const chefId = navigation.getParam('chefId');
            const chefName = navigation.getParam('chefName');
            // console.log('inside rate review', chefId);
            setChefid(chefId);
            setChefname(chefName);

        }

        catch (err) {
            console.log(err);
            setErr('Something went wrong');
        }
    }

    useEffect(() => {
        rate();
    }, [])


    return (
        <View>
            <View style={{ margin: 20 }}>
                <TouchableOpacity style={{ marginBottom: 30 }} onPress={() => setRateVisible(true)}>
                    <Text style={{ fontSize: 20 }}>Rate</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setReviewVisible(true)}>
                    <Text style={{ fontSize: 20 }}>Review</Text>
                </TouchableOpacity>
            </View>
            <Dialog
                visible={reviewVisible}
                dialogAnimation={new SlideAnimation({
                    slideFrom: 'bottom'
                })}
                onHardwareBackPress={() => toggle()}
                onTouchOutside={toggle}
                height={250}
                width={width - 50}
            >

                <DialogContent style={{ flex: 1 }}>
                    <KeyboardAvoidingView behavior='height' style={{ flex: 1 }}>
                        <View style={{ height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(251,251,251)', marginLeft: -20, marginRight: -20, flexDirection: 'row' }}>
                            <Text style={{ fontWeight: '900', fontSize: 20, position: 'absolute' }}>Review {chefname}'s Kitchen</Text>
                            <TouchableOpacity style={{ marginLeft: 'auto', marginRight: 20 }} onPress={toggle}>
                                <AntDesign name="close" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>

                            {/* onChangeText={text => setDescription(text)}
                        value={description}
                             */}
                            <View style={{ marginTop: 30 }}>

                                <TextInput
                                    style={styles.input}
                                    placeholder={'Write your review here'}

                                    multiline={true}

                                    underlineColorAndroid='transparent'
                                    maxLength={100}
                                />
                                {/* <Text style={{ marginLeft: 'auto', color: 'grey' }}>({description.length}/100)</Text> */}
                            </View>
                            <TouchableOpacity
                                style={{ width: 150, height: 50, borderRadius: 5, marginTop: 20, justifyContent: 'center', alignSelf: 'center', alignItems: 'center', backgroundColor: 'gray' }}
                                activeOpacity={0.8}

                            >
                                <Text style={{ color: 'white', fontWeight: '900', fontSize: 17 }}>Submit</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </DialogContent>
            </Dialog>

            <Dialog
                visible={rateVisible}
                dialogAnimation={new SlideAnimation({
                    slideFrom: 'bottom'
                })}
                onHardwareBackPress={() => toggle()}
                onTouchOutside={toggle}
                height={250}
                width={width - 50}
            >

                <DialogContent style={{ flex: 1 }}>
                    <KeyboardAvoidingView behavior='height' style={{ flex: 1 }}>
                        <View style={{ height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(251,251,251)', marginLeft: -20, marginRight: -20, flexDirection: 'row' }}>
                            <Text style={{ fontWeight: '900', fontSize: 20, position: 'absolute' }}>Rate {chefname}'s Kitchen</Text>
                            <TouchableOpacity style={{ marginLeft: 'auto', marginRight: 20 }} onPress={toggle}>
                                <AntDesign name="close" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {/* selectedStar={(rating) => this.onStarRatingPress(rating)} */}
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                rating={3.5}
                                fullStarColor={'#ffcc00'}
                                emptyStarColor={'#ffcc00'}

                                starSize={40}
                                containerStyle={{ width: 80, marginVertical: 20, marginHorizontal: 40 }}
                            />

                            <TouchableOpacity
                                style={{ width: 150, height: 50, borderRadius: 5, marginTop: 20, justifyContent: 'center', alignSelf: 'center', alignItems: 'center', backgroundColor: 'gray' }}
                                activeOpacity={0.8}

                            >
                                <Text style={{ color: 'white', fontWeight: '900', fontSize: 17 }}>Submit</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </DialogContent>
            </Dialog>

        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        width: width - 80,
        marginTop: 10,
        borderBottomColor: 'red',
        borderBottomWidth: 1,
        fontSize: 15,
        marginRight: 100

    },
});

export default RateReviewScreen;