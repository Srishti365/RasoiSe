import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

class PaymentCompleteScreen extends Component {
    state = {
        amount: 0,
        failure_message: null,
        transaction_id: ''
    }

    componentDidMount() {
        const { params } = this.props.navigation.state;
        const info = params.info;
        this.setState({
            amount: info.amount,
            failure_message: info.failure_message,
            transaction_id: info.transaction_id
        })
    }

    onSubmit = (e) => {
        this.props.navigation.navigate('Search');
    }

    render() {

        if (this.state.failure_message) {
            return (
                <View style={styles.container}>
                    <Text style={styles.header}>Your Payment has failed. Please try ordering again</Text>
                    <Button title="Go to Search Page" onPress={this.onSubmit} />
                </View>
            )
        }

        else {
            return (
                <View style={styles.container}>
                    <Text style={styles.header}>Your Order has been placed successfully!</Text>
                    <Text style={styles.details}>Your Payment Details:</Text>
                    <Text style={styles.content}>Amount paid: Rs. {this.state.amount}</Text>
                    <Text style={styles.content2}>Transaction ID: {this.state.transaction_id}</Text>
                    <Button title="Go to Search Page" onPress={this.onSubmit} />
                </View>
            )
        }

    }
}

const styles = StyleSheet.create({
    container: {
        margin: 10
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 15
    },
    details: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15
    },
    content: {
        fontSize: 20,
        marginBottom: 10
    },
    content2: {
        fontSize: 20,
        marginBottom: 40
    }
});

export default PaymentCompleteScreen;