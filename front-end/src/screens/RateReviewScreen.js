import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, KeyboardAvoidingView, ScrollView, TextInput, FlatList, ImageBackground, Image } from 'react-native';
import Dialog, { DialogContent, SlideAnimation, DialogTitle, DialogButton, DialogFooter } from 'react-native-popup-dialog';
import { Rating, Card } from 'react-native-elements';
const { width, height } = Dimensions.get('window');
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import StarRating from 'react-native-star-rating';
import trackerApi from '../api/tracker';


const RateReviewScreen = ({ navigation }) => {
    const [err, setErr] = useState('');
    const [rateVisible, setRateVisible] = useState(false);
    const [reviewVisible, setReviewVisible] = useState(false);
    const [chefid, setChefid] = useState('');
    const [chefname, setChefname] = useState('');
    const [allReviews, setAllReviews] = useState([]);
    const [stars, setStars] = useState(0);
    const [comments, setComments] = useState('');
    const [visible, setVisible] = useState(false)

    const profile = navigation.getParam('chef_profile');
    // console.log('profilr', profile);



    const toggle = () => {
        setRateVisible(false);
        setReviewVisible(false);
    }

    const viewAllReviews = async () => {
        try {
            // console.log('inside view all')
            const chefId = navigation.getParam('chefId');
            const chefName = navigation.getParam('chefName');
            console.log("abc", chefName);
            setChefid(chefId);
            setChefname(chefName);

            const response = await trackerApi.post('/home/viewallreviews', { id: chefId });
            // console.log('reviews', response.data);
            setAllReviews(response.data.reviews);

        }

        catch (err) {
            console.log(err);
            setErr('Something went wrong');
        }
    }

    const viewRating = async () => {
        try {
            const response = await trackerApi.post('/home/viewyourrating', { id: chefid });
            console.log(response.data);
            setStars(response.data.rating);
            setRateVisible(true);
        }
        catch (err) {
            console.log(err);
            setErr('Something went wrong');
        }
    }

    const handleRatingSubmit = async () => {
        try {
            const response = await trackerApi.post('/home/changerating', { id: chefid, rate: stars });
            console.log(response.status);
            setRateVisible(false);
        }
        catch (err) {
            console.log(err);
            setErr('Something went wrong');
        }
    }

    const viewReview = async () => {
        try {
            const response = await trackerApi.post('/home/viewyourreview', { id: chefid });
            // console.log(response.data);
            setComments(response.data.rev);
            setReviewVisible(true);
        }
        catch (err) {
            console.log(err);
            setErr('Something went wrong');
        }
    }

    const handleReviewSubmit = async () => {
        try {
            const response = await trackerApi.post('/home/reviewchef', { id: chefid, review: comments });
            console.log(response.status);
            viewAllReviews();
            setReviewVisible(false);
        }
        catch (err) {
            console.log(err);
            setErr('Something went wrong');
        }
    }

    useEffect(() => {
        viewAllReviews();
    }, [])


    return (
        <View style={{ backgroundColor: 'white', height: '100%' }}>
            <ImageBackground source={require('../../assets/bg2.jpeg')} style={{ height: 250 }}>
                <TouchableOpacity style={{ marginLeft: 20, marginTop: 15 }}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('ResultsShow')}
                >
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
            </ImageBackground>

            <Image source={{ uri: profile.image }} style={{ width: 80, height: 80, borderWidth: 3, marginTop: -40, alignSelf: 'center', borderRadius: 50, borderColor: 'white', backgroundColor: 'white' }} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ alignSelf: 'center', marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 23, fontWeight: 'bold' }}>{profile.name}  </Text>
                    <FontAwesome name="check-circle" size={20} color="rgb(62, 207, 207)" style={{ marginTop: 1 }} />
                </View>
                <Rating imageSize={20} readonly startingValue={profile.rating} style={{ marginTop: 5 }} />
                <Text style={{ alignSelf: 'center', color: 'gray', marginTop: 3 }}>{profile.rating} stars</Text>
                <Text style={{ marginHorizontal: 30, fontSize: 15, marginTop: 10, color: 'gray', alignSelf: 'center' }}>Chefs are leaders in their own little world.</Text>

                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity style={{ width: 80, height: 40, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', borderRadius: 5, backgroundColor: 'rgb(255, 115, 28)' }}
                        onPress={() => viewRating()}
                        activeOpacity={0.8}
                    >
                        <Text style={{ color: 'white', fontSize: 15 }}>Rate </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: 120, height: 40, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginLeft: 50, borderRadius: 5, backgroundColor: 'rgb(255, 115, 28)' }}
                        onPress={() => viewReview()}
                        activeOpacity={0.8}
                    >
                        <Text style={{ color: 'white', fontSize: 15 }}>Write Review</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 50 }}>{profile.rating}</Text>
                    <View style={{ marginLeft: 20 }}>
                        <Rating imageSize={20} readonly startingValue={profile.rating} style={{ marginTop: 5 }} />
                        <Text style={{ color: 'gray' }}>from {allReviews.length} people</Text>
                    </View>
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
                                        value={comments}
                                        multiline={true}
                                        onChangeText={text => setComments(text)}
                                        underlineColorAndroid='transparent'
                                        maxLength={100}
                                    />
                                    {/* <Text style={{ marginLeft: 'auto', color: 'grey' }}>({description.length}/100)</Text> */}
                                </View>
                                <TouchableOpacity
                                    style={{ width: 150, height: 50, borderRadius: 5, marginTop: 20, justifyContent: 'center', alignSelf: 'center', alignItems: 'center', backgroundColor: 'gray' }}
                                    activeOpacity={0.8}
                                    onPress={() => handleReviewSubmit()}
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
                                    rating={stars}
                                    fullStarColor={'#ffcc00'}
                                    emptyStarColor={'#ffcc00'}
                                    selectedStar={(rating) => setStars(rating)}
                                    starSize={40}
                                    containerStyle={{ width: 80, marginVertical: 20, marginHorizontal: 40 }}
                                />

                                <TouchableOpacity
                                    style={{ width: 150, height: 50, borderRadius: 5, marginTop: 20, justifyContent: 'center', alignSelf: 'center', alignItems: 'center', backgroundColor: 'gray' }}
                                    activeOpacity={0.8}
                                    onPress={() => handleRatingSubmit()}
                                >
                                    <Text style={{ color: 'white', fontWeight: '900', fontSize: 17 }}>Submit</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </KeyboardAvoidingView>
                    </DialogContent>
                </Dialog>
                <View style={{ margin: 15, }}>

                    <TouchableOpacity style={{ fontSize: 15, marginLeft: 20 }} onPress={() => setVisible(!visible)}>
                        <Text style={{ borderBottomWidth: 1, width: 90, borderColor: 'green' }}>ALL REVIEWS</Text>
                    </TouchableOpacity>
                    {visible ?
                        <FlatList

                            showsVerticalScrollIndicator
                            data={allReviews}
                            keyExtractor={(allReviews) => allReviews._id}
                            renderItem={({ item }) => {
                                return (
                                    <Card containerStyle={{ borderWidth: 0, borderColor: 'rgb(240,240,240)', elevation: 10, marginTop: 5 }}>
                                        <Text>By  {item.user.email}</Text>
                                        <Text style={{ alignSelf: 'center', color: 'red' }}>-- {item.review}</Text>
                                    </Card>
                                )
                            }}
                        />
                        : null
                    }

                </View>
            </ScrollView>
        </View >
    )
}


RateReviewScreen.navigationOptions = () => {
    return {
        headerShown: false
    };
};


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