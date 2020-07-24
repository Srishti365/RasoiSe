import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

// payment completion screen

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
                <View style={{ backgroundColor: 'white', flex: 1 }}>
                    <View style={{ height: 400, width: Dimensions.get('window').width, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 17, marginBottom: 15 }}>Oops!!</Text>
                        <Image source={require('../../assets/failure.jpeg')} style={{ width: 120, height: 120 }} />
                        <Text style={{ fontWeight: '900', fontSize: 20, marginTop: 20 }}>Something went wrong!!</Text>
                        <Text style={{ marginTop: 10, color: 'gray', fontSize: 15 }}>Your transaction was declined by the bank </Text>
                        <Text style={{ marginTop: 5, color: 'gray', fontSize: 15 }}>due to some technical error.</Text>
                        <Text style={{ marginTop: 10, color: 'gray', fontSize: 15 }}>Please order again!!</Text>
                    </View>
                    <TouchableOpacity style={{ width: 250, height: 50, alignSelf: 'center', marginTop: 'auto', borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(255, 94, 8)' }}
                        onPress={() => navigation.navigate('Cart')}
                        activeOpacity={0.8}
                    >
                        <Text style={{ color: 'white', fontSize: 17 }}>Order Again</Text>
                    </TouchableOpacity>
                </View>
            )
        }

        else {
            return (
                <View style={styles.container}>
                    <View style={{ height: 400, width: Dimensions.get('window').width, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../../assets/payment.png')} style={{ width: 120, height: 120 }} />
                        <Text style={{ fontWeight: '900', fontSize: 20, marginTop: 20 }}>Payment Successfull!!</Text>
                        <Text style={{ marginTop: 10, color: 'gray', fontSize: 15 }}>Your Order has placed Successfully.</Text>
                        <Text style={{ marginTop: 10, color: 'gray', fontSize: 15 }}>You can get the status from</Text>
                        <Text style={{ marginTop: 5, color: 'gray', fontSize: 15 }}>Order's Page.</Text>

                        <Text style={{ marginTop: 20, fontSize: 20, fontWeight: 'bold' }}>Thank you!!</Text>
                    </View>
                    <View style={{ height: 50, justifyContent: 'center', backgroundColor: 'rgb(240,240,240)' }}>
                        <Text style={{ marginLeft: 20, color: 'gray', fontSize: 15 }}>Payment Details</Text>
                    </View>
                    <View style={{ marginLeft: 20, marginTop: 10, flexDirection: 'row' }}>
                        <Text style={{ color: 'gray' }}>Amount Paid : </Text>
                        <Text style={{ marginLeft: 'auto', marginRight: 20, color: 'red' }}><FontAwesome name='rupee' /> {this.state.amount}</Text>
                    </View>
                    <View style={{ marginLeft: 20, marginTop: 10, flexDirection: 'row' }}>
                        <Text style={{ color: 'gray' }}>Transcation Id : </Text>
                        <Text style={{ marginLeft: 'auto', marginRight: 20, fontSize: 12 }}>{this.state.transaction_id}</Text>
                    </View>
                    <TouchableOpacity style={{ width: 250, height: 50, alignSelf: 'center', marginTop: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(255, 94, 8)' }}
                        onPress={this.onSubmit}
                        activeOpacity={0.8}
                    >
                        <Text style={{ color: 'white', fontSize: 17 }}>Continue Search</Text>
                    </TouchableOpacity>
                </View>
            )
        }

    }
}

PaymentCompleteScreen.navigationOptions = () => {
    return {
        headerShown: false
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
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