import React, { Component } from 'react';
import StarRating from 'react-native-star-rating';

// star rating render component


class Ratings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            starCount: 3.5
        };
    }

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }

    render() {
        return (
            <StarRating
                disabled={false}
                maxStars={5}
                rating={this.state.starCount}
                fullStarColor={'#ffcc00'}
                emptyStarColor={'#ffcc00'}
                selectedStar={(rating) => this.onStarRatingPress(rating)}
                starSize={22}
                containerStyle={{ width: 30, marginBottom: 10 }}
            />
        );
    }
}

export default Ratings;