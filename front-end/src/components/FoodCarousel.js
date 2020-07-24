import React, { Component, Fragment } from 'react';
import Carousel from 'react-native-snap-carousel';
import { ImageBackground, Text, Dimensions } from 'react-native';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const SLIDE_WIDTH = Math.round(viewportWidth / 3.05);
const ITEM_HORIZONTAL_MARGIN = 15;
const ITEM_WIDTH = SLIDE_WIDTH + ITEM_HORIZONTAL_MARGIN * 2;
const SLIDER_WIDTH = viewportWidth;

// front page carousel component

export class FoodCarousel extends Component {
    _renderItem = ({ item, index }) => {
        return (
            <Fragment>
                <ImageBackground
                    index={index}
                    source={item.imgg}
                    style={{ width: 140, height: 140 }}
                    imageStyle={{ borderRadius: 10 }}
                >
                </ImageBackground>
                <Text style={{ fontSize: 13, marginLeft: 5, marginTop: 4, color: '#4d4d4d' }} >{item.text}</Text>
            </Fragment>
        );
    }

    render() {
        return (
            <Carousel
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                activeSlideAlignment={'start'}
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
                firstItem={1}
                ref={(c) => { this._carousel = c; }}
                data={[
                    {
                        id: 1,
                        text: 'Chicken Curry',
                        imgg: require('../../assets/sl1.jpg')
                    },
                    {
                        id: 2,
                        text: 'Chhole Bhature',
                        imgg: require('../../assets/sl2.jpg')
                    },
                    {
                        id: 3,
                        text: 'Aloo Paratha',
                        imgg: require('../../assets/sl3.jpg')
                    },
                    {
                        id: 4,
                        text: 'Masala Dosa',
                        imgg: require('../../assets/sl4.jpg')
                    },
                    {
                        id: 5,
                        text: 'Fish Fried',
                        imgg: require('../../assets/sl5.png')
                    },
                    {
                        id: 6,
                        text: 'Samosa',
                        imgg: require('../../assets/sl6.jpg')
                    },
                    {
                        id: 7,
                        text: 'Biryani',
                        imgg: require('../../assets/sl7.jpeg')
                    }
                ]}
                renderItem={this._renderItem}

            />
        );
    }
}